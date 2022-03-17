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



const Oracle = () => {
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

    const getValue = () =>{
        
    }

    const getGood = () =>{

    }

    const changeValue = () =>{
        try{

            //do this
            // change oracle so only one change of value
            // combine bump and dip

        } catch(err) {
            setError(err.message)
        }
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

                const oracle = oracleContract(web3, "0x166D6C931dbF8783D25D7a609916965F283c03d6")
                setOracle(oracle)


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
                        <h1>RWA Vault Oracle</h1>

                    </div>
                    <div className='navbar-item'>
                        <p>current user: {user}</p>

                    </div>
                    <div className='navbar-end'>
                        <button className='button is-primary' onClick={connectWalletHandler}>Connect Wallet</button>
                    </div>
                </div>
            </nav>
            
           
        </div>
    )
}


export default Oracle;