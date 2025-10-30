import { configureStore } from '@reduxjs/toolkit';
import userSlice from './Userslice';
import doctorSlice from './Doctorslice';

export default configureStore({
    reducer:{
        userSlice,
        doctorSlice
    }
})