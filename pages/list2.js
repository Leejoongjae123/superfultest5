import React from 'react';
import styles from '../styles/Home.module.css'
import {Table,Spinner} from 'react-bootstrap';
import Image from 'next/image'
import {addDoc,getDoc,collection, doc, getDocs,query,onSnapshot,orderBy,setDoc} from 'firebase/firestore'
import {dbService} from '../src/firebase'
import Link from 'next/link'
import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';


export default function List () {
  const [products,setProducts]=useState([])
  const [isComplete,setIsComplete]=useState(false)

  const [ready, setReady]=useState([])
  const [username,setUsername]=useState("")
  const [user,setUser]=useState("")
  const [url,setUrl]=useState([])
  const [history,setHistory]=useState([])


  let dispatch=useDispatch()
  let state=useSelector((state)=>{return state})
  
  console.log("사용자이름은:",state.user.name)

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
  const getHistory=async ()=>{  
    const docRef = doc(dbService, "history", state.user.name);
    const docSnap = await getDoc(docRef);
    const data=docSnap.data().url
    setHistory(data)
  }

  const clickPage=async (event)=>{
    console.log(event.target.href)
    const docRef = doc(dbService, "history", state.user.name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().url);
      console.log(docSnap.data().url.length)
      await setDoc(doc(dbService, "history", state.user.name), {
          "url":[...docSnap.data().url,event.target.href]
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      await setDoc(doc(dbService, "history", state.user.name), {
        "url":[event.target.href]
      });
    }
    


  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getHistory();
  }, []);

  // const getState = async ()=>{
  //   const docRef = doc(dbService, "history", state.user.name);
  //   const docSnap = await getDoc(docRef);
  //   let url_list=docSnap.data().url
  //   setUrl(url_list)
  //   console.log(url_list)
  // }


  


  return (
    <>
    <div className={styles.user_id}>@{state.user.name}</div>
    {
      isComplete===true
      ?
      (
        <main className={styles.main}>
          <div className={styles.table_container}>
            
            <Table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>image</th>
                  <th>name</th>
                  <th>link</th>
                  <th>start</th>
                  <th>end</th>
                  <th>state</th>
                </tr>
              </thead>
              <tbody>
                {products.map((elem,index)=>{
                  return(
                    <tr className={styles.table_row} key={index}>
                      <td>{index+1}</td>
                      <td><div className={styles.img_box}><img className={styles.img_content}src={elem.img} alt="" /></div></td>
                      <td>{elem.Name}</td>
                      <td><Link href={elem.url}><a onClick={()=>{clickPage(event)}} target="_blank">{elem.url}</a></Link></td>
                      <td>{elem.date_start}</td>
                      <td>{elem.date_end}</td>
                      <td>{history.includes(elem.url)?(<div style={{'color':'red'}}>finished</div>):(<div style={{'color':'green'}}>ready</div>)}</td>
                  </tr>
                  )
                })}
              </tbody>
            </Table>  
          </div>
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
