import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossOrigin="anonymous"
      />
    </Head>    
    <div className={styles.Navbar}> 
      <ul className={styles.Navbar_content}>
        <li className={styles.Navbar_contents}>Logo</li>
        <li className={styles.Navbar_contents}></li>
        
      </ul>
    </div>
    <Component {...pageProps} />
    </>
  )
}

export default MyApp
