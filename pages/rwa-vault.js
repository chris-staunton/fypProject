import Head from 'next/head'
import { useState, useEffect } from 'react'
import styles from "../styles/RwaVault.module.css"
import 'bulma/css/bulma.css'
import Web3 from 'web3'
import urn from '../blockchain/urn'
import vat from '../blockchain/vat'



const RwaVault = () => {
    const [error, setError] = useState('')
    const [vatAdress, setVatAddress] = useState('')
    const [user, setUser] = useState('Not Connected')
    const [can, setCan] = useState(0)
    const [debt, setDebt] = useState('')
    const [bal, setBal] = useState('')
    let web3

    useEffect(() => {
        getVatAddressHandler()

    })

    const getVatAddressHandler = async () =>{
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
        const result = await vat.methods.urns(web3.utils.asciiToHex("RWA999-A"),"0xc9f6b85b362a338BE0De500AD262f0203942e7eE").call()
        setDebt(result[1]/1000000000000000000)
        setBal(result[0]/1000000000000000000)
    }

    //window.ethereum
    const connectWalletHandler = async () => {
        // alert("Connecting...")
        if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
            try{
                await window.ethereum.request({ method: "eth_requestAccounts" })
                web3 = new Web3(window.ethereum)
                const accounts = await web3.eth.getAccounts();
                setUser(accounts[0])
                await getCanHandler()
                await getVaultBalanceHandler()
            } catch(err) {
                setError(err.message)
            }
            
        }
        else{
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