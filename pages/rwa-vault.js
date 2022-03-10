import Head from 'next/head'
import { useState, useEffect } from 'react'
import styles from "../styles/RwaVault.module.css"
import 'bulma/css/bulma.css'
import Web3 from 'web3'
import urn from '../blockchain/urn'
import vat from '../blockchain/vat'
import jugContract from '../blockchain/jug'



const RwaVault = () => {
    const [error, setError] = useState('')
    const [vatAdress, setVatAddress] = useState('')
    const [user, setUser] = useState('Not Connected')
    const [can, setCan] = useState(0)
    const [debt, setDebt] = useState('')
    const [bal, setBal] = useState('')
    const [dai, setDai] = useState('')
    const [jug, setJug] = useState(null)
    let web3

    const wad = (Math.pow(10, 18)) //18 decimals
    const ray = (Math.pow(10, 27)) //27 decimals
    const rad = Math.pow(10, 45) //45 decimals
    const ilk = "0x5257413939392d41000000000000000000000000000000000000000000000000"

    useEffect(() => {
        getVatAddressHandler()

    })

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
        const vatAdress = await urn.methods.vat().call()
        setVatAddress(vatAdress)
    }

    const getCanHandler = async () => {
        const accounts = await web3.eth.getAccounts();
        const can = await urn.methods.can(accounts[0]).call()
        setCan(can)
    }

    const getVaultBalanceHandler = async () => {
        // const accounts = await web3.eth.getAccounts();
        const result = await vat.methods.urns(ilk, "0xc9f6b85b362a338BE0De500AD262f0203942e7eE").call()
        const dai = await vat.methods.dai("0xc9f6b85b362a338BE0De500AD262f0203942e7eE").call()
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
                web3 = new Web3(window.ethereum)
                const accounts = await web3.eth.getAccounts();
                setUser(accounts[0])
                await getCanHandler()
                await getVaultBalanceHandler()

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
                    <p>Is {user} an operator?: {can}</p>
                </div>
            </section>
            <section>
                <div className='container'>
                    <p>total debt: {debt}</p>
                    <p>collateral bal: {bal}</p>
                    <p>total dai drawn: {dai}</p>
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
        </div>
    )
}


export default RwaVault;