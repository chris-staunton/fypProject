import Head from 'next/head'
import { useState, useEffect } from 'react'
import styles from "../styles/RwaVault.module.css"
import 'bulma/css/bulma.css'
import Web3 from 'web3'
import vmContract from '../blockchain/urn'



const RwaVault = () => {
    const [error, setError] = useState('')
    const [vatAdress, setVatAddress] = useState('')
    const [user, setUser] = useState('Not Connected')
    const [can, setCan] = useState(0)
    let web3

    useEffect(() => {
        getVatAddressHandler()

    })

    const getVatAddressHandler = async () =>{
        const vatAdress = await vmContract.methods.vat().call()
        setVatAddress(vatAdress)
    }

    const getCanHandler = async () => {
        const accounts = await web3.eth.getAccounts();
        const can = await vmContract.methods.can(accounts[0]).call()
        setCan(can)
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
                <div className='container has-text-danger'>
                    <p>{error}</p>
                </div>
            </section>
        </div>
    )
}


export default RwaVault;