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



const NftPage = () => {
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
    const [nftOwner, setNftOwner] = useState(null)
    // let web3

    const wad = Math.pow(10, 18) //18 decimals
    const ray = (Math.pow(10, 27)) //27 decimals
    const rad = Math.pow(10, 45) //45 decimals
    const ilk = "0x5257413130330000000000000000000000000000000000000000000000000000" //RWA103

    useEffect(() => {
        if (nft) getNftData()

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
        // setAdjustedVal(spot)

        setCr((Math.round((x / debt) * 100)) + '%')

        getHealth()



    }

    const getHealth = async () => {
        const health = await oracle.methods.good(ilk).call()
        setHealth(health)
        console.log(health)

        // getIlkValues()


    }



    const connectVault = async () => {
        const urn = urnContract(web3, "0x43423C96b98E2a9D10F75c58Ad4D6C54bFb61D4e")
        setUrn(urn)
        const tokenId = await urn.methods.tokenId().call()
        setTokenID(tokenId)
        const nft = nftContract(web3)
        setNft(nft)

    }



    const getNftData = async () => {
        // const 
        const nftUri = await nft.methods.tokenURI(tokenId).call()
        setNftUri(nftUri)
        const nftOwner = await nft.methods.ownerOf(tokenId).call()
        setNftOwner(nftOwner)
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
                <title>Real World Asset NFT</title>
                <meta name="description" content="Access to your Maker RWA NFT" />
            </Head>

            <nav className='navbar mt-4 mb-4'>
                <div className='container'>
                    <div className='navbar-brand'>
                        <h1>Real World Asset NFT</h1>

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
                    <div className='label'>Enter NFT Address here:</div>
                    <input type='text'></input>
                    <button onClick={connectVault}>Enter</button>

                </div>
            </section>
            <section className='mt-6 mb-6'>
                <div className='container'>
                    <div className='label'>Enter TokenId here:</div>
                    <input type='text'></input>
                    <button >Enter</button>

                </div>
            </section>
            <section>
                <div className='container'>
                    <div className='title mb-4'>RWA NFT Data:</div>

                </div>
            </section>
            {
                nft?
                <section className='container'>
                    <div className="card">
                        <div className="card-image">
            
                            <img src={nftUri} alt="Placeholder image"></img>
                         
                        </div>
                        <div className="card-content">


                            <div className="content">
                                <h3><b>Current Owner:</b> {nftOwner} </h3>
                                <h3><b>Name:</b> John's Wind Farm</h3>
                                <h3><b>Location:</b> Wexford, Ireland</h3>
                                <h3><b>Legal Contract:</b><a href={nftUri}> {nftUri}</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                </section>
            :null}
        </div>
    )
}


export default NftPage;