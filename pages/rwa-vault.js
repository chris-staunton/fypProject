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
    const ilk = "0x5257413130330000000000000000000000000000000000000000000000000000" //RWA103

    useEffect(() => {

        
        if (urn) getVatAddressHandler()
        if (urn && user) getVaultBalanceHandler()
        if (urn && oracle) getIlkValues()
        if (urn && nft) getNftData()

    }, [urn, user, nft, oracle, debt])

    const getIlkValues = async () => {


        const ilkVals = await vat.methods.ilks(ilk).call()
        const orcIlk = await oracle.methods.ilks(ilk).call()

        console.log(ilkVals)

        const spot = ilkVals[2] / ray

        console.log(ilkVals[3])

        
        setSpot(spot)
        let mat = orcIlk[6]
        setMat(mat)
        console.log(mat)
        let x = spot * mat / 100

        console.log(x)

        setVaultVal(x)

        setCr((Math.round((x/debt)*100)) + '%')

        getHealth()



    }

    const getHealth = async () => {
        const health = await oracle.methods.good(ilk).call()
        setHealth(health)
        console.log(health)


    }

    const lockCollateral = async () => {
        console.log(tokenId)
        console.log(urnAddr)
        try {
            await nft.methods.approve(urnAddr, tokenId).send({
                from: user
            })
            await urn.methods.lock().send({
                from: user
            })

            getVaultBalanceHandler()
            getIlkValues()

        } catch (err) {
            setError(err.message)
        }
    }

    const freeCollateral = async () => {
        try {
            await urn.methods.free("1000000000000000000").send({
                from: user
            })

            getVaultBalanceHandler()
            getIlkValues()

        } catch (err) {
            setError(err.message)
        }
    }

    const drawDai = async () => {
        try {
            console.log("withdrawing: ", withdrawl)
            let test = '19000000000000000000000000'



            let tmp = web3.utils.toWei(withdrawl, 'ether')
            console.log(tmp)

            await urn.methods.draw(tmp).send({
                from: user
            })

            getVaultBalanceHandler()
            getIlkValues()

        } catch (err) {
            setError(err.message)
        }
    }

    const repayDai = async () => {
        try {
            console.log("repaying: ", repayment)

            await urn.methods.wipe(repayment.toString()).send({
                from: user
            })

            getVaultBalanceHandler()
            getIlkValues()

        } catch (err) {
            setError(err.message)
        }
    }

    const wipeAll = async () => {
        try {
            console.log("wiping all debt: ",debt)

            let tmp = web3.utils.toWei((debt).toString(), 'ether')

            console.log(tmp)

            await daiContract1.methods.transfer(urnAddr, tmp).send({
                from: user

            })

            await urn.methods.wipeAll().send({
                from: user
            })

            getVaultBalanceHandler()
            getIlkValues()

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
        setNftUri("https://ipfs.io/ipfs/QmZjEtJfjwpouRN8gbCTJv7xiuVegCJr8gFK9oCVZNhN3B")
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

                const daiContract1 = daiContract(web3)
                setDaiContract1(daiContract1)
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
                                <p>Stability fee: {urn?'2.00':'0.00'}%</p>

                            </div>
                            <div className='box column'>
                                <p>Liqudation Fee: {urn?'10.00':'0.00'}%</p>

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
                                <p>{bal==1&&healthy?Math.floor(spot-debt):'0'} DAI</p>
                            </div>

                        </div>

                    </div>
            </section>
            <section className='container mt-4'>
                
            </section>
            <section className='columns mt-4'>
                <div className='column is-2'></div>
                <section className='mt-6 mb-6 column is-one-third'>
                 

                    <div className={healthy ? 'container box has-background-success' : 'container box has-background-danger'}>
                        <div className='columns'>
                            <div className='column'>
                                <p>Total debt: {debt} DAI</p>
                            </div>
                            <div className='column'>
                                <p>Token Locked: {bal}</p>
                            </div>
                        </div>
                        <div className='columns'>
                            <div className='column'>
                                <p>Collateral Ratio: {debt?cr:vaultVal + '%'}</p>
                            </div>
                            <div className='column'>
                                <p>collateral val: {vaultVal?'$':null}{vaultVal}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className='column'>
                    <div className='box'>
                        <h1>Configure your Vault:</h1>
                        <div className='mt-4'>
                            <button disabled={urn ? null : 'disabled'} className='button is-secondary pt-6 pb-6 px-6' onClick={lockCollateral}>Lock Collateral</button>
                            <button disabled={urn ? null : 'disabled'} className='button is-secondary px-6 pb-6 pt-6' onClick={freeCollateral}>Free Collateral</button>
                            
                        </div>
                    </div>

                </div>
                <div className='column'>
                   
                </div>

            </section>
            <section className='columns'>
                <div className='column is-2'></div>
                <div className='container column'>
                    <h1 className='mb-2'>Modify your DAI Balance:</h1>
                    <div className='box columns'>

                        <div className='column'>
                            <div className='label'>Withdraw DAI</div>
                            <input type='text' onChange={(e) => setWithdrawl(e.target.value)}></input>
                            <button className='button is-warning is-small' onClick={drawDai}>Draw DAI</button>
                        </div>
                        <div className='column'>
                            <div className='label'>Repay DAI</div>
                            <input type='text' onChange={(e) => setRepayment(e.target.value)}></input>
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
            <section>{bal==1?
                <div className='container mt-6 mb-6'>
                    <h1><b>Locked NFT data:</b></h1>
                    <h2><b>MakerDAO internal name:</b> {ilkStr}</h2>
                    <h2><b>Name:</b> John's Wind Farm</h2>
                    <h3><b>Location:</b> Wexford, Ireland</h3>
                    <h3><b>Legal Contract:</b><a href={nftUri}> {nftUri}</a>
                     </h3>
                    
                </div>
            :null}</section>
            <section>
                <div className='container has-text-danger'>
                    <p>{error}</p>
                </div>
            </section>
        </div>
    )
}


export default RwaVault;