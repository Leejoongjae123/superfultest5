import { configureStore,createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name:"user",
  initialState:{'name':"nothing"},
  reducers:{
    changeName(state,a){
      state.name=a.payload
    },
    
  }
})

let historyFlag = createSlice({
  name:"historyFlag",
  initialState:false,
  reducers:{
    changeState(state){
      state=!state
    },
    
  }
})

export let {changeName,changeState} = user.actions

export default configureStore({
  reducer: {
    user:user.reducer,
    historyFlag:historyFlag.reducer
  }
}) 