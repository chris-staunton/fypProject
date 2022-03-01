import Head from 'next/head'
import styles from "../styles/RwaVault.module.css"
import 'bulma/css/bulma.css'



export default function RwaVault() {
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
                    <div className='navbar-end'>
                        <button className='button is-primary'>Connect Wallet</button>
                    </div>
                </div>
            </nav>
            <section>
                <div className='container'>
                    <p>placeholder text</p>
                </div>
            </section>
        </div>
    )
}