import _ from 'lodash'
import React from 'react'
import { Table } from 'semantic-ui-react'
import {useState,useEffect} from 'react'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import {addDoc,getDoc,collection, doc, getDocs,query,onSnapshot,orderBy,setDoc} from 'firebase/firestore'
import {dbService} from '../firebase'
import { useDispatch,useSelector } from 'react-redux'
import {changeState} from './store'
import { Button } from 'semantic-ui-react'



function exampleReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        }
      }
      
      if (action.column==="date_start"){
        console.log("11")

        return {
          column: action.column,
          data: _.sortBy(state.data, ["date_start_timestamp"]),
          direction: 'ascending',
        }        
      } else if (action.column==="date_end"){
        console.log("11")
        return {
          column: action.column,
          data: _.sortBy(state.data, ["date_end_timestamp"]),
          direction: 'ascending',
        }
      } else {
        console.log("33")
        return {
          column: action.column,
          data: _.sortBy(state.data, [action.column]),
          direction: 'ascending',
        }
      }

    case 'FILTER1':
      let newData1=state.data.filter((elem)=>{
        return elem.img===action.info
      })
      return {
        data:newData1
      }
    
    case 'FILTER_F':
    console.log(action.info)
    
    let newData2=state.data.filter((elem)=>{
      if (action.info.includes(elem.url)){
        return elem
      }
    })
    return {
      data:newData2
    }
    
    case 'FILTER_R':
      console.log(action.info)
      
      let newData3=state.data.filter((elem)=>{
        if (action.info.includes(elem.url)){
          
        } else {
          return elem
        }
      })
      return {
        data:newData3
      }
    case 'REFRESH':
      console.log(action.info)
      return {
        data:action.info
      }
    

    default:
      throw new Error()
  }
}

function TableExampleSortable({products,history,clickstate}) {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: products,
    direction: null,
  })
  const { column, data, direction } = state
  const [urlHistory,setUrlHistory]=useState([])

  const clickPage=async (event)=>{
    console.log(event.target.href)
    const docRef = doc(dbService, "history", clickstate.user.name);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().url);
      console.log(docSnap.data().url.length)
      await setDoc(doc(dbService, "history", clickstate.user.name), {
          "url":[...docSnap.data().url,event.target.href]
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      await setDoc(doc(dbService, "history", clickstate.user.name), {
        "url":[event.target.href]
      });
    }
  }

  const getHistory=async ()=>{  
    const docRef = doc(dbService, "history",clickstate.user.name);
    const docSnap = await getDoc(docRef);
    let data
    if (docSnap.data()){
      data=docSnap.data().url
    } else {
      data=[]
    }
    setUrlHistory(data)
  }

  useEffect(() => {
    getHistory();
  }, []);

  const changeHistory=()=>{
    getHistory()
  }

  return (
    <>
      <div className={styles.btn_refresh}>
        <Button color='blue' onClick={() => {dispatch({ type: 'REFRESH',info:products}), changeHistory()}} icon='refresh' content='Refresh' />
      </div>
      
      <Table color='grey' className={styles.table} sortable celled fixed inverted>
        <Table.Header  className={styles.table_header}>
            <Table.Row >
            <Table.HeaderCell  width={1} 
            >
              Index
            </Table.HeaderCell>
            <Table.HeaderCell width={1}            
            >
              Image
            </Table.HeaderCell>
            <Table.HeaderCell width={3}
              sorted={column === 'Name' ? direction : null}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'Name' })}
            >
              Name
            </Table.HeaderCell>
            <Table.HeaderCell width={6}
              // sorted={column === 'URL' ? direction : null}
              // onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'URL' })}
            >
              URL
            </Table.HeaderCell>
            <Table.HeaderCell width={2}
              sorted={column === 'date_start' ? direction : null}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'date_start' })}
            >
              date_start
            </Table.HeaderCell>
            <Table.HeaderCell width={2}
              sorted={column === 'date_end' ? direction : null}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'date_end' })}
            >
              date_end
            </Table.HeaderCell>
            
            <Table.HeaderCell width={1}
            >
              state
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((elem,index) => 

          (
            
            <Table.Row key={index}>
              <Table.Cell textAlign='center' verticalAlign='middle'>{index+1}</Table.Cell>
              <Table.Cell textAlign='center' verticalAlign='middle' onClick={() => dispatch({ type: 'FILTER1',info:elem.img})}><div className={styles.img_box}><img className={styles.img_content}src={elem.img} alt="" /></div></Table.Cell>
              <Table.Cell textAlign='center' verticalAlign='middle'>{elem.Name}</Table.Cell>
              <Table.Cell textAlign='center' verticalAlign='middle'><Link href={elem.url}><a onClick={()=>{clickPage(event)}} target="_blank">{elem.url}</a></Link></Table.Cell>
              <Table.Cell textAlign='center' verticalAlign='middle'>{elem.date_start}</Table.Cell>
              <Table.Cell textAlign='center' verticalAlign='middle'>{elem.date_end}</Table.Cell>
              <Table.Cell textAlign='center' verticalAlign='middle' >{urlHistory.includes(elem.url)?(<div onClick={() => dispatch({ type: 'FILTER_F',info:urlHistory})} style={{'color':'red','cursor':'pointer'}}>finished</div>):(<div onClick={() => dispatch({ type: 'FILTER_R',info:urlHistory})} style={{'color':'blue','cursor':'pointer'}}>ready</div>)}</Table.Cell>

            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  )
}

export default TableExampleSortable