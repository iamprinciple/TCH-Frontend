import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{
        isfetching:false,
        alluser:[],
        fetcherror:null
    },
    reducers:{
        FetchingData:(state)=>{
            state.isfetching = true
            state.alluser =[]
            state.fetcherror = null
        },
        FetchingSuccess:(state, action)=>{
            state.isfetching = false
            state.alluser =action.payload
            state.fetcherror = null
        },
        FetchingError:(state, action)=>{
            state.isfetching = false
            state.alluser =[]
            state.fetcherror = action.payload
        },
        UpdateUser: (state, action) => {
            state.alluser = {...state.alluser, ...action.payload}
        }
    }
})
export const {FetchingData, FetchingSuccess, FetchingError, UpdateUser} = userSlice.actions;
export default userSlice.reducer;