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
// import { NextFetchEvent } from 'next/server'



const RwaVault = () => {
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
    const [ilkStr, setIlkStr] = useState(null)
    const [nftUri, setNftUri] = useState(null)
    // let web3

    const wad = Math.pow(10, 18) //18 decimals
    const ray = (Math.pow(10, 27)) //27 decimals
    const rad = Math.pow(10, 45) //45 decimals
    const ilk = "0x5257413130320000000000000000000000000000000000000000000000000000" //RWA102

    useEffect(() => {


        if (urn) getVatAddressHandler()
        if (urn && user) getCanHandler()
        if (urn && user) getVaultBalanceHandler()

    }, [urn, user])

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
        try{
            console.log("withdrawing: ", withdrawl)

            urn.methods.draw(withdrawl.toString()).send({
                from: user
            })

        } catch(err){
            setError(err.message)
        }
    }

    const repayDai = async () => {
        try{
            console.log("repaying: ", repayment)

            urn.methods.wipe(repayment.toString()).send({
                from: user
            })
        } catch (err) {
            setError(err.message)
        }
    }

    const wipeAll = async () => {
        try{
            console.log("wiping all debt")

            daiContract1.methods.transfer(urnAddr,(debt*wad).toString()).send({
                from: user

            })

            urn.methods.wipeAll().send({
                from: user
            })
        } catch(err) {
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
            setCan(can)
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
        const nftUri = await nft.methods.tokenUri(tokenId).call()
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
                        <h1>RWA Vault</h1>

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
                    <p>placeholder text: {vatAdress}</p>
                </div>
            </section>
            <section>
                <div className='container'>
                    <input type='text' onChange={(e) => setUrnAddr(e.target.value)}></input>
                    <button onClick={connectVault}>Connect Vault</button>
                    <p>Vault Address: {urnAddr}</p>
                </div>
            </section>
            <section>
                <div className='container'>
                    <p>Is {user} an operator?: {can}</p>
                </div>
            </section>
            <section>
                <div className='container'>
                    <p>total debt: {debt}</p>
                    <p>{ilkStr} collateral bal: {bal}</p>
                    {/* <p>total dai drawn: {dai}</p> */}
                </div>
            </section>
            <section>
                <div className='container has-text-danger'>
                    <p>{error}</p>
                </div>
            </section>
            <section>
                <div className='container'>
                    <button className='button is-secondary' onClick={updateDebt}>Refresh Debt</button>
                </div>
            </section>
            <section>
                <div className='container'>
                    <button className='button is-secondary'>Repay Dai</button>
                </div>
            </section>
            <section>
                <div className='container'>
                    <button className='button is-secondary' onClick={lockCollateral}>Lock Collateral</button>
                    <button className='button is-secondary' onClick={freeCollateral}>Free Collateral</button>
                </div>
            </section>
            <section>
                <div className='container'>
                    <input type='text' onChange={(e) => setWithdrawl(e.target.value*wad)}></input>
                    <button className='button is-secondary' onClick={drawDai}>Draw DAI</button>
                    <input type='text' onChange={(e) => setRepayment(e.target.value*wad)}></input>
                    <button className='button is-secondary' onClick={repayDai}>Repay DAI</button>
                </div>
            </section>
            <section>
                <div className='container'>
                    <button className='button is-primary' onClick={wipeAll}>Wipe all debt</button>
                    {/* <button className='button is-secondary' onClick={freeCollateral}>Free Collateral</button> */}
                </div>
            </section>

            <section>
                <div className='container'>
                    <h1>{ilkStr} NFT data:</h1>
                    <h2></h2>
                    <a href='https://ipfs.io/ipfs/QmddMpiPGUkDjFnqbY8ZVVrVG1DePq8H6LDbgQiWgcUmsb'>Here is the uri</a>
                </div>
            </section>
        </div>
    )
}


export default RwaVault;