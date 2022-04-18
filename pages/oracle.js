import Head from 'next/head'
import { useState, useEffect } from 'react'
import styles from "../styles/RwaOracle.module.css"
import 'bulma/css/bulma.css'
import Web3 from 'web3'
import vat from '../blockchain/vat'
import jugContract from '../blockchain/jug'
import oracleContract from '../blockchain/oracle'



const RwaOracle = () => {
    const [error, setError] = useState('')
    const [user, setUser] = useState(null)
    const [jug, setJug] = useState(null)
    const [web3, setWeb3] = useState(null)
    const [urn, setUrn] = useState(false)
    const [urnAddr, setUrnAddr] = useState(null)
    const [oracle, setOracle] = useState(null)
    const [newValue, setNewValue] = useState(null)
    const [value, setValue] = useState(null)
    const [adjustedValue, setAdjustedVal] = useState(null)
    const [health, setHealth] = useState(null)
    // let web3

    const wad = Math.pow(10, 18) //18 decimals
    const ray = (Math.pow(10, 27)) //27 decimals
    const rad = Math.pow(10, 45) //45 decimals
    const ilk = "0x5257413130330000000000000000000000000000000000000000000000000000" //RWA102

    useEffect(() => {

        if (oracle) getIlkValues()
        if (oracle) getHealth()


        if (urn) getVatAddressHandler()
        if (urn && user) getCanHandler()
        if (urn && user) getVaultBalanceHandler()
        // if (oracle) getIlkValues()

    }, [urn, user, oracle])


    const updateDebt = async () => {
        try {
            const test = await jug.methods.drip(ilk).send({
                from: user
            })

        } catch (err) {
            setError(err.message)
        }

    }

    const getIlkValues = async () => {


        const ilkVals = await vat.methods.ilks(ilk).call()
        const orcIlk = await oracle.methods.ilks(ilk).call()

        const spot = ilkVals[2] / ray

        setValue(spot * orcIlk[6] / 100)
        setAdjustedVal(spot)



    }

    const getHealth = async () => {
        const health = await oracle.methods.good(ilk).call()
        setHealth(health)
        console.log(health)


    }

    const changeValue = async () => {
        console.log("changing to this: ", newValue)

        let val = web3.utils.toWei(newValue.toString(), 'ether')

        try {

            await oracle.methods.bump(ilk, val).send({
                from: user
            })

            getHealth()
            getIlkValues()



        } catch (err) {
            setError(err.message)
        }
    }


    const getVatAddressHandler = async () => {
        try {
            const vatAdress = await urn.methods.vat().call()
            setVatAddress(vatAdress)
        } catch (err) {
            setError(err.message)
        }
    }

    const startAuction = async () => {

        if (health) {
            alert("Vault is healthy!")
        }
        else if (health == null) {
            alert("Not connected to Vault yet!")

        }
        else {
            try {
                await oracle.methods.liquidate(ilk, urnAddr).send({
                    from: user
                })

            } catch (err) {
                setError(err.message)
            }
        }
    }



    const getVaultBalanceHandler = async () => {
        const result = await vat.methods.urns(ilk, urnAddr).call()
        const dai = await vat.methods.dai(urnAddr).call()
        const rate = await vat.methods.ilks(ilk).call()
        setDai(dai / ray)
        setDebt((rate[1] * result[1]) / rad)
        setBal(result[0] / wad)
    }


    //window.ethereum
    const connectWalletHandler = async () => {
        // alert("Connecting...")
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" })
                const web3 = new Web3(window.ethereum)
                setWeb3(web3)

                const accounts = await web3.eth.getAccounts();
                setUser(accounts[0])

                const oracle = oracleContract(web3)
                setOracle(oracle)

                console.log(oracle)


                const jug = jugContract(web3)

                setJug(jug)
            } catch (err) {
                setError(err.message)
            }

        }
        else {
            console.log("Please install MetaMask")
        }
    }


    return (
        <div className={styles.main}>
            <Head>
                <title>Real World Asset Oracle</title>
                <meta name="description" content="Oracle for your Real World Asset" />
            </Head>

            <nav className='navbar mt-4 mb-4'>
                <div className='container'>
                    <div className='navbar-brand'>
                        <h1>Real World Asset Oracle</h1>

                    </div>
                    <div className='navbar-item'>
                        <p>current user: {user}</p>

                    </div>
                    <div className='navbar-end'>
                        <button className='button is-primary' onClick={connectWalletHandler}>Connect Wallet</button>
                    </div>
                </div>
            </nav>

            <section>
                <div className='container'>
                    <div className='label'>Enter Vault Address:</div>
                    <input type='text' onChange={(e) => setUrnAddr(e.target.value)}></input>
                    <button className='button is-secondary is-small'>Connect Vault</button>
                </div>
            </section>
            <section>
                <div className='container mt-6 mb-6'>
                    <div className='label'>RWA103 Valuation:</div>
                    <div className='columns'>
                        <div className='box column'>
                            <div className='columns mb-4'>
                                <div className='column'>
                                    <p>Current Value: ${value}</p>
                                </div>
                                <div className='column'>
                                    <p>Adjusted Value: ${adjustedValue}</p>
                                </div>
                            </div>
                            <div >
                                <section>
                                    <div className='label'>Adjust Valuation:</div>
                                    <div className='container'>
                                        <input type='text' onChange={(e) => setNewValue(e.target.value)}></input>
                                        <button className='button is-secondary is-small' onClick={changeValue}>Change Value</button>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <div className='column'></div>
                    </div>
                </div>
            </section>


            <section>
                <div className='container has-text-danger'>
                    <p>{error}</p>
                </div>
            </section>
            
            <hr></hr>
            <section>

                <div className='container mt-4'>
                    <h1 className='mb-4'>Keeper dashboard</h1>
                    <div className='columns'>
                        <div className='column'>
                            <button className={'button is-secondary px-6 pt-6 pb-6 mr-6'} onClick={getHealth}>Check Vault Health</button>
                        </div>
                        <div className='column'>
                        <div className='box'>
                            <div className={health?'box has-background-success-light':'box has-background-danger-light'} >
                                
                                    <p>RWA102 {health ? 'Vault is healthy :)' : 'Vault is unhealthy!'}</p>
                                    </div>


                            </div>

                        </div>
                        <div className='column'></div>
                        <div className='column'></div>
        
                    </div>
                    <button className='button is-secondary px-6 pt-6 pb-6 mr-6' onClick={updateDebt}>Refresh Debt</button>
                    <button className='button is-secondary px-6 pt-6 pb-6' onClick={startAuction}>Start Auction</button>
                </div>
            </section>
        </div>
    )
}


export default RwaOracle;