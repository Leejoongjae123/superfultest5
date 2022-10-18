import React from 'react';
import styles from '../styles/Home.module.css'
import {Spinner} from 'react-bootstrap';
import Image from 'next/image'
import {addDoc,getDoc,collection, doc, getDocs,query,onSnapshot,orderBy,setDoc} from 'firebase/firestore'
import {dbService} from '../src/firebase'
import { getAuth } from 'firebase/auth';
import Link from 'next/link'
import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Table from '../src/components/table'

export default function List () {
  const [products,setProducts]=useState([])
  const [isComplete,setIsComplete]=useState(false)

  const [ready, setReady]=useState([])
  const [username,setUsername]=useState("")
  const [user,setUser]=useState("")
  const [url,setUrl]=useState([])
  const [history,setHistory]=useState([])
  const [refresh,setRefresh]=useState(true)
  


  let dispatch=useDispatch()
  let clickstate=useSelector((state)=>{return state})
  
  
  
  
  const getProducts=async ()=>{  
    const q=query(collection(dbService,"Cards"))
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
    getProducts();
  }, []);
  
  const getHistory=async ()=>{  
    const docRef = doc(dbService, "history",clickstate.user.name);
    const docSnap = await getDoc(docRef);
    let data
    if (docSnap.data()){
      data=docSnap.data().url
    } else {
      data=[]
    }
    setHistory(data)
  }

  useEffect(() => {
    getHistory();
  }, []);

  console.log(getAuth())
  
  return (
    <>
    
    <div className={styles.user_id}>@{clickstate.user.name}</div>
    {
      isComplete===true
      ?
      (
        <main className={styles.main}>
          
          <Table products={products} history={history} clickstate={clickstate}></Table>
          
        </main>
      )
      :(
        <div className={styles.spinner}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )
    }
    
  </>  

  );
}
