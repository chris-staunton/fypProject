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




const RwaAuction = () => {
    const [error, setError] = useState('')
    const [user, setUser] = useState(null)
   
    const [web3, setWeb3] = useState(null)
    const [urn, setUrn] = useState(null)
    const [urnAddr, setUrnAddr] = useState(null)
    const [nft, setNft] = useState(null)

    const [daiContract1, setDaiContract1] = useState(null)
    const [oracle, setOracle] = useState(null)
    const [newValue, setNewValue] = useState(null)

    const [auction, setAuction] = useState(null)
    const [nftUri, setNftUri] = useState(null)
    const [bid, setBid] = useState(null)
    const [auctionInfo, setAuctionInfo] = useState([
        {
            id: 1,
            bid: 0,
            tab: 17,
            guy: "me",
            tic: 1650000000
        },
        {
            id: 2,
            bid: 5,
            tab: 68,
            guy: "yer da",
            tic: 235266342
        }
    ])
    // let web3

    const wad = Math.pow(10, 18) //18 decimals
    const ray = (Math.pow(10, 27)) //27 decimals
    const rad = Math.pow(10, 45) //45 decimals
    const ilk = "0x5257413130330000000000000000000000000000000000000000000000000000" //RWA102

    useEffect(() => {

        if (auction) getAuctions()

    }, [auction])

    const sendBid = async (id) => {

        if (bid*wad <= auctionInfo[id-1].bid * 1.05) {
            alert("Bids must increase by at least 5%")

        }
        else {
            try {
                let tmp = web3.utils.toWei(bid.toString(), 'ether')
                await auction.methods.tend(id, wad.toString(), tmp).send({
                    from: user
                })

                getAuctions()

            } catch (err) {
                setError(err.message)
            }
        }

    }

    const dealAuction = async (id) => {
        try {
            await auction.methods.deal(id).send({
                from: user
            })

        } catch (err) {
            setError(err.message)
        }

    }


    const getIlkValues = async () => {

     


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
            // if (kick.tic > 0) {
            tmp.push(kick)
            // }

            console.log(kick)
        }

        setAuctionInfo(tmp)

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
        setNftUri("https://ipfs.io/ipfs/QmZjEtJfjwpouRN8gbCTJv7xiuVegCJr8gFK9oCVZNhN3B")
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

                const auction = auctionContract(web3, "0x990cDC5463E117C606c9351FD1d84F93d5fE458E")
                setAuction(auction)

                const nft = nftContract(web3)
                setNft(nft)
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

            <section>
                <div className='container has-text-danger'>
                    <p>{error}</p>
                </div>
            </section>
            <section>
                <div className='container mb-6'>
                    <h2 className='bold'>Welcome to the Real World Asset Auction House!</h2>
                    <p>Here you will find various Real World Asset NFTs which have been liquidated from a MakerDAO Vault.</p>
                    <p>Bid on any of the active auctions below with your DAI!</p>

                </div>
            </section>
            <section>
                <div className='container'>
                    <h1>Live Auctions:</h1>
                    <ul>
                        {auctionInfo.map((e, i) => (
                            <div key={e.tic} >
                                {e.end > 0 ?
                                    <div className='columns'>
                                        <div className='column box'>

                                            <ul >
                                                <li><b>ID:</b> {i + 1}</li>
                                                <li><b>Current bid expiry time:</b> {getDate(e.tic)}</li>
                                                <li><b>Last bid amount:</b> {e.bid / wad} DAI</li>
                                                <li><b>Goal debt coverage:</b> {e.tab/rad} DAI</li>
                                                <li><b>Highest bidder:</b> {e.guy}</li>
                                                <li><b>Auction Expiry:</b> {getDate(e.end)}</li>
                                                <br></br>
                                            </ul>


                                        </div>
                                        <div className='column mt-6'>
                                            <div className='label'>Enter Bid Amount (DAI):</div>
                                            <input type='text' onChange={(e) => setBid(e.target.value)}></input>
                                            <button className='button is-primary mb-4' onClick={() => sendBid(i+1)}>Bid</button>
                                            <br></br>
                                            <button className='button is-warning' onClick={() => dealAuction(i + 1)}>Deal Auction</button>
                                            <br></br>
                                            <a href='https://ipfs.io/ipfs/QmZjEtJfjwpouRN8gbCTJv7xiuVegCJr8gFK9oCVZNhN3B'>
                                                <button className='button is-secondary'>View Asset</button>
                                            </a>
                                        </div>
                                        <div className='column'></div>
                                        <div className='column'></div>
                                    </div>
                                    :
                                    null}
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