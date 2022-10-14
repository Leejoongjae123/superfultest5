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

export let {changeName} = user.actions

export default configureStore({
  reducer: {
    user:user.reducer,
  }
}) 