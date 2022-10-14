import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import {useState,useEffect} from 'react'
import {addDoc,collection, doc, getDocs,query,onSnapshot,orderBy} from 'firebase/firestore'
import {dbService} from '../src/firebase'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {credential,createUserWithEmailAndPassword,GithubAuthProvider,GoogleAuthProvider,signInWithEmailAndPassword,signInWithPopup,TwitterAuthProvider} from "@firebase/auth";
import {Provider} from 'react-redux'
import store from '../src/components/store.js'
import {useDispatch,useSelector} from 'react-redux'

function MyApp({ Component, pageProps }) {
  
  const [products,setProducts]=useState([])
  const [isComplete,setIsComplete]=useState(false)

  const [user,setUser]=useState("")
  
  

  

  const getProducts=async ()=>{  
    const q=query(collection(dbService,"COIN"))
    const querySnapshot=await getDocs(q)
      querySnapshot.forEach((doc)=>{
        const newOne=doc.data()
        setProducts((prev)=>{
          if (prev.length<querySnapshot.size){
            return [newOne,...prev]
          } else {
            return prev
          }
        })
      })
    setIsComplete(true)
  }

  useEffect(() => {
    getProducts()
  }, []);
  
  console.log("코인가격:",products)
  

  return (
    <>
    <Provider store={store}>
    <Head>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossOrigin="anonymous"
      />
    </Head>   
    <div className={styles.container}>
    <div className={styles.Navbar}> 
      <div className={styles.Navbar_logo}>
        <Image src='/images/pantera_white.png' height={150} width={120}></Image>
      </div>
      <div className={styles.Navbar_price}>
          <p className={styles.Navbar_detail}>ETH Price:<br/>{isComplete===true?(products[0].price):("Nothing")}<br/>{isComplete===true?(products[0].date):("Nothing")}</p>
        <p className={styles.Navbar_detail}>{user}</p>
      </div>
    </div>
    <div className={styles.empty_box}></div>
    <Component {...pageProps} />
    <div className={styles.footer}>
      <div className={styles.footer_upper}>
        <div className={styles.footer_upper_content}>Created by</div>
        <div className={styles.footer_content_container}>
          <div className={styles.footer_boundary1}></div>
          <Link href="https://twitter.com/panteraico"><a name="twitter"target="_blank" >Pantera ICO</a></Link>
        </div>
        <div className={styles.footer_content_container}>
          <div className={styles.footer_boundary2}></div>
          <Link href="https://twitter.com/jayceape13?t=16LruMfuyJ03XyH72H25-g&s=09"><a name="twitter"target="_blank" >Jayce</a></Link>
        </div>
        <div className={styles.footer_content_container}>
          <div className={styles.footer_boundary3}></div>
          <Link href="https://twitter.com/Chainmonster135?t=fkmrO4hCcPtkxjHAKcFEyA&s=09"><a name="twitter"target="_blank" >Chainmonster</a></Link>
        </div>
        {/* <div className={styles.footer_upper_content}><Link href="https://twitter.com/panteraico"><a name="twitter"target="_blank" ><Image className={styles.footer_logo} src='/images/pantera.jpg' width={100} height={100}></Image></a></Link></div>
        <div className={styles.footer_upper_content}><Link href="https://twitter.com/jayceape13?t=16LruMfuyJ03XyH72H25-g&s=09"><a name="twitter"target="_blank" >jayce</a></Link></div>
        <div className={styles.footer_upper_content}><Link href="https://twitter.com/Chainmonster135?t=fkmrO4hCcPtkxjHAKcFEyA&s=09"><a name="twitter"target="_blank" >chainmonster</a></Link></div> */}
      </div>
      <div className={styles.footer_lower}>
        <div className={styles.footer_lower_content}>Contact : Alex@lysithea.ventures</div>
      </div>
    </div>
    </div>
    </Provider>
    </>
  )
}

export default MyApp
