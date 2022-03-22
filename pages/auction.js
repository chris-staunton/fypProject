import Head from 'next/head'
import { useState, useEffect } from 'react'
import styles from "../styles/RwaOracle.module.css"
import 'bulma/css/bulma.css'
import Web3 from 'web3'
import urnContract from '../blockchain/urn'
import vat from '../blockchain/vat'
import jugContract from '../blockchain/jug'
import nftContract from '../blockchain/nft'
import daiContract from '../blockchain/dai'
import oracleContract from '../blockchain/oracle'
import auctionContract from '../blockchain/auction'

// import { NextFetchEvent } from 'next/server'



const RwaAuction = () => {
    const [error, setError] = useState('')
    const [vatAdress, setVatAddress] = useState('')
    const [user, setUser] = useState(null)
    const [can, setCan] = useState(0)
    const [debt, setDebt] = useState('')
    const [bal, setBal] = useState('')
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
    const [oracle, setOracle] = useState(null)
    const [newValue, setNewValue] = useState(null)
    const [value, setValue] = useState(null)
    const [adjustedValue, setAdjustedVal] = useState(null)
    const [health, setHealth] = useState(null)
    const [auction, setAuction] = useState(null)
    const [nftUri, setNftUri] = useState(null)
    const [bid, setBid] = useState(null)
    const [auctionInfo, setAuctionInfo] = useState([
        {
            id: 1,
            bid: 0,
            tab: 17,
            guy: "me"
        },
        {
            id: 2,
            bid: 5,
            tab: 68,
            guy: "yer da"
        }
    ])
    // let web3

    const wad = Math.pow(10, 18) //18 decimals
    const ray = (Math.pow(10, 27)) //27 decimals
    const rad = Math.pow(10, 45) //45 decimals
    const ilk = "0x5257413130320000000000000000000000000000000000000000000000000000" //RWA102

    useEffect(() => {

        if (oracle) getIlkValues()
        if (oracle) getHealth()

        if (nft) getNftData()


        if (urn) getVatAddressHandler()
        if (urn && user) getCanHandler()
        if (urn && user) getVaultBalanceHandler()
        // if (oracle) getIlkValues()
        if (auction) getAuctions()

    }, [urn, user, oracle, auction, nft])

    const sendBid = async () =>{

    }

    const dealAuction = async () =>{

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

    const getIlkValues = async () => {

        // console.log(oracle)




        const ilkVals = await vat.methods.ilks(ilk).call()
        const orcIlk = await oracle.methods.ilks(ilk).call()

        const spot = ilkVals[3] / rad

        // console.log(mat)

        setValue(spot * orcIlk[6] / 100)
        setAdjustedVal(spot)



    }

    const getAuctions = async () => {

        let tmp = []



        const len = await auction.methods.kicks().call()
        console.log(len)

        for (let i = 1; i <= len; i++) {
            let kick = await auction.methods.bids(i).call()
            if (kick.tic > 0) {
                tmp.push(kick)
            }

            console.log(kick)
        }

        setAuctionInfo(tmp)



        // getNftData()

    }



    const getHealth = async () => {
        const health = await oracle.methods.good(ilk).call()
        setHealth(health)
        console.log(health)


    }

    const changeValue = async () => {
        console.log("changing to this: ", newValue)
        const tmp = oracle.methods.ilks(ilk).call()[5]
        setAdjustedVal(tmp)

        try {

            oracle.methods.dip(ilk, newValue.toString()).send({
                from: user
            })

            getHealth()



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

    const getDate = (unix) => {

        return new Date(unix * 1000).toUTCString()

    }

    const getNftData = async () => {
        // const 
        let tokenId = 9;
        const nftUri = await nft.methods.tokenURI(tokenId).call()
        setNftUri(nftUri)
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

                const oracle = oracleContract(web3)
                setOracle(oracle)

                console.log(oracle)

                const auction = auctionContract(web3, "0xdf02C7ED36A79487875217Eb43Aa0fC8AbD0F263")
                setAuction(auction)

                const nft = nftContract(web3)
                setNft(nft)

                // getIlkValues()


                // getCanHandler()
                // await getVaultBalanceHandler()
                // getVatAddressHandler()

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
                <title>Real World Asset Auction</title>
                <meta name="description" content="Access to Real World Asset Auctions" />
            </Head>

            <nav className='navbar mt-4 mb-4'>
                <div className='container'>
                    <div className='navbar-brand'>
                        <h1>Real World Asset Auctions</h1>

                    </div>
                    <div className='navbar-item'>
                        <p>current user: {user}</p>

                    </div>
                    <div className='navbar-end'>
                        <button className='button is-primary' onClick={connectWalletHandler}>Connect Wallet</button>
                    </div>
                </div>
            </nav>
            {/* <section>
                <div className='container'>
                    <p>Oracle Address: 0x166D6C931dbF8783D25D7a609916965F283c03d6</p>
                </div>
            </section> */}


            <section>
                <div className='container has-text-danger'>
                    <p>{error}</p>
                </div>
            </section>
            {/* <section>
                <div className='container'>
                    <p>Current Value: {value}</p>
                    <p>Adjusted Value: {adjustedValue}</p>
                </div>
            </section>
            <section>
                <div className='container'>
                    <input type='text' onChange={(e) => setNewValue(e.target.value * wad)}></input>
                    <button className='button is-secondary' onClick={changeValue}>Change Value</button>
                </div>
            </section>
            <section>
                <div className='container'>
                    <button className='button is-secondary' onClick={getIlkValues}>get vals</button>
                </div>
            </section> */}
            {/* <section>
                <div className='container'>
                    <div className={health ? styles.healthy : styles.unhealthy}> */}
            {/* <p>afsnjkdnfksnj</p> */}
            {/* <p>is urn safe: {health ? "yes" : "no"}</p>

                    </div> */}
            {/* <p>is urn safe: {health}</p> */}
            {/* </div>
            </section>
            <section>
                <div className='container'>
                    <button className='button is-secondary' onClick={getIlkValues}>get vals</button>
                </div>
            </section> */}
            <section>
                <div className='container mb-6'>
                    <h2 className='bold'>Welcome to the Real World Asset Auction House!</h2>
                    <p>Here you will find various Real World Asset NFTs which have been liquidated from a MakerDAO Vault.</p>
                    <p>Bid on any of the active auctions below with your DAI!</p>

                </div>
            </section>
            <section>
                <div className='container'>
                    <h1>Auctions:</h1>
                    <ul>
                        {auctionInfo.map((e, i) => (
                            <div key={e.tic} className='columns'>
                                <div className='column box'>
                                    <ul >
                                        <li><b>ID:</b> {i + 1}</li>
                                        <li><b>Current bid expiry time:</b> {getDate(e.tic)}</li>
                                        <li><b>Last bid amount:</b> {e.bid/wad} DAI</li>
                                        <li><b>Goal debt coverage:</b> {e.tab} DAI</li>
                                        <li><b>Highest bidder:</b> {e.guy}</li>
                                        <li><b>Auction Expiry:</b> {getDate(e.end)}</li>
                                        <br></br>
                                    </ul>
                                </div>
                                <div className='column mt-6'>
                                    <input type='text' onChange={(e) => setBid(e.target.value * wad)}></input>
                                    <button className='button is-primary mb-4' onClick={sendBid}>Bid</button>
                                    <button className='button is-warning' onClick={dealAuction}>Deal Auction</button>
                                    <br></br>
                                    <a href='https://ipfs.io/ipfs/QmddMpiPGUkDjFnqbY8ZVVrVG1DePq8H6LDbgQiWgcUmsb'>
                                    <button className='button is-secondary'>View Asset</button>
                                    </a>
                                </div>
                                <div className='column'></div>
                                <div className='column'></div>
                                
                            </div>
                        ))}
                        <a>{nftUri}</a>

                    </ul>
                </div>
            </section>



        </div>
    )
}


export default RwaAuction;