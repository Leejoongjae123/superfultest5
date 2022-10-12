import React from 'react';
import styles from '../styles/Home.module.css'
import {Table,Spinner} from 'react-bootstrap';
import Image from 'next/image'
import {addDoc,collection, doc, getDocs,query,onSnapshot,orderBy} from 'firebase/firestore'
import {dbService} from '../src/firebase'
import Link from 'next/link'
import { useState,useEffect } from 'react';

export default function List () {
  const [products,setProducts]=useState([])
  const [isComplete,setIsComplete]=useState(false)

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
    getProducts()
  }, []);
  
  console.log(products)
  console.log(isComplete)

  return (
    <>
    {
      isComplete===true
      ?
      (
        <div className={styles.container}>
          <main className={styles.main}>
            <div className={styles.table_container}>
              <h2 className={styles.table_header}>List</h2>
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
                        <td><Link href={elem.url}>{elem.url}</Link></td>
                        <td>{elem.date_start}</td>
                        <td>{elem.date_end}</td>
                        <td>Ready</td>
                    </tr>
                    )
                  })}
                </tbody>
              </Table>  
            </div>
          </main>
        </div>
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
