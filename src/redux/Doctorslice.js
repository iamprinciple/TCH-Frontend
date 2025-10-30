import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
    name:"doctor",
    initialState:{
        isFetching:false,
        allDoctor: {},
        fetcherror:null,
        allAppointment:[]
    },
    reducers:{
        fetchingData:(state)=>{
            state.isFetching = true
            // state.allDoctor = []
            state.fetcherror = null
        },
        fetchDoctor:(state, action)=>{
            state.isFetching = false
            state.allDoctor = action.payload
            state.fetcherror = null
        },
        updateDoctor:(state, action)=>{
            state.isFetching = false
            state.allDoctor = {...state.allDoctor, ...action.payload}
            state.fetcherror = null
        },
        fetchError:(state, action)=>{
            state.isFetching = false
            // state.allDoctor = []
            state.fetcherror = action.payload
        },fetchAppointment:(state, action)=>{
            state.allAppointment = action.payload
        }
    }
})
export const {fetchingData, fetchDoctor, updateDoctor, fetchError, fetchAppointment} = doctorSlice.actions;
export default doctorSlice.reducer
