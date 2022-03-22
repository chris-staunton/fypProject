import Head from 'next/head'
import { useState, useEffect } from 'react'
import styles from "../styles/RwaVault.module.css"
import 'bulma/css/bulma.css'
import Web3 from 'web3'
import urnContract from '../blockchain/urn'
import vat from '../blockchain/vat'
import jugContract from '../blockchain/jug'
import nftContract from '../blockchain/nft'
import daiContract from '../blockchain/dai'
import oracleContract from '../blockchain/oracle'
// import { NextFetchEvent } from 'next/server'



const RwaVault = () => {
    const [error, setError] = useState('')
    const [vatAdress, setVatAddress] = useState('')
    const [user, setUser] = useState(null)
    const [can, setCan] = useState(null)
    const [debt, setDebt] = useState(null)
    const [bal, setBal] = useState(null)
    const [dai, setDai] = useState('')
    const [jug, setJug] = useState(null)
    const [web3, setWeb3] = useState(null)
    const [urn, setUrn] = useState(null)
    const [urnAddr, setUrnAddr] = useState(null)
    const [nft, setNft] = useState(null)
    const [tokenId, setTokenID] = useState(null)
    const [withdrawl, setWithdrawl] = useState(null)
    const [repayment, setRepayment] = useState(null)
    const [daiContract1, setDaiContract1] = useState(null)
    const [ilkStr, setIlkStr] = useState(null)
    const [nftUri, setNftUri] = useState(null)
    const [healthy, setHealth] = useState(false)
    const [oracle, setOracle] = useState(null)
    const [cr, setCr] = useState(null)
    const [vaultVal, setVaultVal] = useState(null)
    const [mat, setMat] = useState(null)
    const [spot, setSpot] = useState(null)
    // let web3

    const wad = Math.pow(10, 18) //18 decimals
    const ray = (Math.pow(10, 27)) //27 decimals
    const rad = Math.pow(10, 45) //45 decimals
    const ilk = "0x5257413130320000000000000000000000000000000000000000000000000000" //RWA102

    useEffect(() => {

        
        if (urn) getVatAddressHandler()
        // if (urn && user) getCanHandler()
        if (urn && user) getVaultBalanceHandler()
        if (urn && oracle && debt) getIlkValues()
        if (urn && nft) getNftData()

    }, [urn, user, nft, oracle, debt])

    const getIlkValues = async () => {

        // console.log(oracle)




        const ilkVals = await vat.methods.ilks(ilk).call()
        const orcIlk = await oracle.methods.ilks(ilk).call()

        const spot = ilkVals[3] / rad

        // console.log(mat)
        setSpot(spot)
        let mat = orcIlk[6]
        setMat(mat)
        let x = spot * mat / 100

        setVaultVal(x)
        // setAdjustedVal(spot)

        setCr(Math.round(x/debt) + '%')

        getHealth()



    }

    const getHealth = async () => {
        const health = await oracle.methods.good(ilk).call()
        setHealth(health)
        console.log(health)

        // getIlkValues()


    }

    // if (urn) {
    //     urn.events.Lock({
    //         filter: {}, // Using an array means OR: e.g. 20 or 23
    //         fromBlock: 0
    //     }, function (error, event) { console.log(event); })
    //         .on('data', function (event) {
    //             console.log(event); // same results as the optional callback above
    //         })
    //         .on('changed', function (event) {
    //             // remove event from local database
    //             setBal(event.returnValues[1])
    //         })
    //         .on('error', console.error);
    //     urn.events.Free({
    //         filter: {}, // Using an array means OR: e.g. 20 or 23
    //         fromBlock: 0
    //     }, function (error, event) { console.log(event); })
    //         .on('data', function (event) {
    //             console.log(event); // same results as the optional callback above
    //         })
    //         .on('changed', function (event) {
    //             // remove event from local database
    //             console.log(event.returnValues[1])
    //             setBal(event.returnValues[1])
    //         })
    //         .on('error', console.error);
    // }

    const lockCollateral = async () => {
        console.log(tokenId)
        console.log(urnAddr)
        try {
            nft.methods.approve(urnAddr, tokenId).send({
                from: user
            })
            await urn.methods.lock().send({
                from: user
            })
        } catch (err) {
            setError(err.message)
        }
    }

    const freeCollateral = async () => {
        try {
            urn.methods.free("1000000000000000000").send({
                from: user
            })
        } catch (err) {
            setError(err.message)
        }
    }

    const drawDai = async () => {
        //note -> remove output conduit to reduce gas. Change output conduit address to operator address :)
        try {
            console.log("withdrawing: ", withdrawl)

            urn.methods.draw(withdrawl.toString()).send({
                from: user
            })

        } catch (err) {
            setError(err.message)
        }
    }

    // let healthy = false

    const repayDai = async () => {
        try {
            console.log("repaying: ", repayment)

            urn.methods.wipe(repayment.toString()).send({
                from: user
            })
        } catch (err) {
            setError(err.message)
        }
    }

    const wipeAll = async () => {
        try {
            console.log("wiping all debt")

            daiContract1.methods.transfer(urnAddr, (debt * wad).toString()).send({
                from: user

            })

            urn.methods.wipeAll().send({
                from: user
            })
        } catch (err) {
            setError(err.message)
        }
    }

    const connectVault = async () => {
        const urn = urnContract(web3, urnAddr)
        setUrn(urn)
        const tokenId = await urn.methods.tokenId().call()
        setTokenID(tokenId)
        const nft = nftContract(web3)
        setNft(nft)

    }


    const updateDebt = async () => {
        // const accounts = await web3.eth.getAccounts();


        // getVaultBalanceHandler()


        try {
            const test = await jug.methods.drip(ilk).send({
                from: user
            })

        } catch (err) {
            setError(err.message)
        }

    }

    const getVatAddressHandler = async () => {
        try {
            const vatAdress = await urn.methods.vat().call()
            setVatAddress(vatAdress)
            const ilkStr = await urn.methods.ilk().call()
            setIlkStr(web3.utils.hexToString(ilkStr))
        } catch (err) {
            setError(err.message)
        }
    }

    const getCanHandler = async () => {
        // const accounts = await web3.eth.getAccounts();
        try {
            const can = await urn.methods.can(user).call()
            can == 1 ? setCan(true) : setCan(false)
        } catch (err) {
            setError(err.message)
        }
    }

    const getVaultBalanceHandler = async () => {
        // const accounts = await web3.eth.getAccounts();
        const result = await vat.methods.urns(ilk, urnAddr).call()
        const dai = await vat.methods.dai(urnAddr).call()
        const rate = await vat.methods.ilks(ilk).call()
        setDai(dai / ray)
        setDebt((rate[1] * result[1]) / rad)
        setBal(result[0] / wad)
    }

    const getNftData = async () => {
        // const 
        const nftUri = await nft.methods.tokenURI(tokenId).call()
        setNftUri(nftUri)
    }

    // "0x0000000000000000000000000000000000000000000000000000000000000001"
    // "0x5257413939392d41000000000000000000000000000000000000000000000000"

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

                const daiContract1 = daiContract(web3)
                setDaiContract1(daiContract1)


                // getCanHandler()
                // await getVaultBalanceHandler()
                // getVatAddressHandler()
                const oracle = oracleContract(web3)
                setOracle(oracle)

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
                <title>Real World Asset Vault</title>
                <meta name="description" content="Access to your Maker Vault" />
            </Head>

            <nav className='navbar mt-4 mb-4'>
                <div className='container'>
                    <div className='navbar-brand'>
                        <h1>Real World Asset Vault</h1>

                    </div>
                    <div className='navbar-item'>
                        <p>current user: {user}</p>

                    </div>
                    <div className='navbar-end'>
                        <button className='button is-primary' onClick={connectWalletHandler}>Connect Wallet</button>
                    </div>
                </div>
            </nav>
            <section className='mt-6'>
                <div className='container'>
                    <div className='label'>Enter Vault Address here:</div>
                    <input type='text' onChange={(e) => setUrnAddr(e.target.value)}></input>
                    <button onClick={connectVault}>Connect Vault</button>
                    
                </div>
            </section>
            <section>
            <div className='container'>
                        <div className='box columns mt-6 pb-1'>
                            <div className='box column'>
                                <p>Stability fee: 2.00%</p>

                            </div>
                            <div className='box column'>
                                <p>Liqudation Fee: 10.00%</p>

                            </div>
                            <div className='box column'>
                                <p>Min Collateral ratio: {mat}%</p>

                            </div>
                            <div className='box column'>
                                <p>Available to withdraw:</p>
                                <p>{(debt<=0&&bal==1)?'1 Token':'0 Tokens'}</p>

                            </div>
                            <div className='box column mb-5'>
                                <p>Available to Generate: </p>
                                <p>{Math.floor(spot-debt)} DAI</p>
                            </div>

                        </div>

                    </div>
            </section>
            <section className='container mt-4'>
                {/* <div className='title'>
                Vault Address: {urnAddr}
                </div> */}
            </section>
            <section className='columns mt-4'>
                <div className='column is-2'></div>
                <section className='mt-6 mb-6 column is-one-third'>
                    {/* <div className={can ? 'box has-background-success' : 'box has-background-danger'}>
                        <div className='mx-6 px-6 container'>
                            <h1>Vault Operator</h1>
                        </div>

                    </div> */}

                    <div className={healthy ? 'container box has-background-success' : 'container box has-background-danger'}>
                        <div className='columns'>
                            <div className='column'>
                                <p>total debt: {debt?'$':null}{debt}</p>
                            </div>
                            <div className='column'>
                                <p>Token Locked: {bal}</p>
                            </div>
                        </div>
                        <div className='columns'>
                            <div className='column'>
                                <p>Collateral Ratio: {cr}</p>
                            </div>
                            <div className='column'>
                                <p>collateral val: {vaultVal?'$':null}{vaultVal}</p>
                            </div>
                        </div>



                        {/* <p>total dai drawn: {dai}</p> */}
                    </div>
                </section>
                <div className='column'>
                    <div className='box'>
                        <h1>Configure your Vault:</h1>
                        <div className='mt-4'>
                            <button disabled={urn ? null : 'disabled'} className='button is-secondary pt-6 pb-6 px-6' onClick={lockCollateral}>Lock Collateral</button>
                            <button disabled={urn ? null : 'disabled'} className='button is-secondary px-6 pb-6 pt-6' onClick={freeCollateral}>Free Collateral</button>
                            {/* <button disabled={urn?null:'disabled'} className='button is-primary is-large'>Testing</button> */}

                        </div>
                    </div>

                </div>
                <div className='column'>
                    {/* <div className='mt-6'>

                        <button className='button is-secondary px-6 pt-6 pb-6' onClick={updateDebt}>Refresh Debt</button>
                    </div> */}
                </div>

            </section>
            <section className='columns'>
                <div className='column is-2'></div>
                <div className='container column'>
                    <h1 className='mb-2'>Primary Functions</h1>
                    <div className='box columns'>

                        <div className='column'>
                            <div className='label'>Withdraw DAI</div>
                            <input type='text' onChange={(e) => setWithdrawl(e.target.value * wad)}></input>
                            <button className='button is-warning is-small' onClick={drawDai}>Draw DAI</button>
                        </div>
                        <div className='column'>
                            <div className='label'>Repay DAI</div>
                            <input type='text' onChange={(e) => setRepayment(e.target.value * wad)}></input>
                            <button className='button is-warning is-small' onClick={repayDai}>Repay DAI</button>

                        </div>
                        <div className='column'>
                            <button className='button is-danger is-light is-large mt-4' onClick={wipeAll}>Repay all debt</button>
                        </div>

                    </div>
                </div>
                <div className='column'>
                    
                </div>
            </section>
            <section>
                <div className='container mt-6'>
                    <h1>{ilkStr} NFT data:</h1>
                    <h2>Name: John's Wind Farm</h2>
                    <h3>Location: Wexford, Ireland</h3>
                    <h3>Legal Contact:<a href={nftUri}> {nftUri}</a>
                     </h3>
                    <p>{nftUri}</p>
                </div>
            </section>
            <section>
                <div className='container has-text-danger'>
                    <p>{error}</p>
                </div>
            </section>
        </div>
    )
}


export default RwaVault;