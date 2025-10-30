import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import Store from './redux/Store';
import 'font-awesome/css/font-awesome.min.css'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './components/Signin';
import Login from './components/Login';
// import Dashboard from './components/Dashboard';
import PatientDashboard from './components/PatientDashboard';
import AdminDashboard from './components/AdminDashboard';
import DoctorDashboard from './components/DoctorDashboard';
// import PrivateRoute from './components/PrivateRoute';
import PatientLanding from './components/PatientLanding';
import BookApointment from './components/BookApointment'
import Profile from './components/Profile';
import Records from './components/Records';
import MedicalRecords from './components/MedicalRecords';
import DocAppointment from './components/DocAppointment';
import DoctorLanding from './components/DoctorLanding';
import MoreInfo from './components/MoreInfo'
import Bookings from './components/Bookings';
import Prescription from './components/Prescription';
import Healthtracker from './components/Healthtracker';
import Pharmacy from './components/Pharmacy';
import ProfileDoc from './components/ProfileDoc';
import AdminLanding from './components/AdminLanding';
import AdminDoc from './components/AdminDoc';
import AdminPatient from './components/AdminPatient';
import AdminAppointments from './components/AdminAppointments';
import AdminPharmcy from './components/AdminPharmcy';
import Paymentstatus from './components/Paymentstatus';
import Error404 from './components/Error404';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Error404/>}/>
        <Route path='/' element={<Signin/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin' element={<AdminDashboard/>}>
          <Route path='/admin' element={<AdminLanding/>}/>
          <Route path='/admin/doctor' element={<AdminDoc/>}/>
          <Route path='/admin/patient' element={<AdminPatient/>}/>
          <Route path='/admin/all_appointments' element={<AdminAppointments/>}/>
          <Route path='/admin/pharmacy' element={<AdminPharmcy/>}/>
        </Route>
        <Route path='/doctor' element={<DoctorDashboard/>}>
          <Route path='/doctor' element={<DoctorLanding/>}/>
          <Route path='/doctor/more_info' element={<MoreInfo/>}/>
          <Route path='/doctor/doctor_profile' element={<ProfileDoc/>}/>
          <Route path='/doctor/appointments' element={<DocAppointment/>}/>
          <Route path='/doctor/make_prescription' element={<Prescription/>}/>
        </Route>

        <Route path='/patient' element={<PatientLanding/>}>
          <Route path='/patient' element={<PatientDashboard/>}/>
          <Route path='/patient/profile' element={<Profile/>}/>
          <Route path='/patient/records' element={<Records/>}/>
          <Route path='/patient/book-appointment' element={<BookApointment/>}/>
          <Route path='/patient/medical-records' element={<MedicalRecords/>}/>
          <Route path='/patient/doctor-details' element={<Bookings/>}/>
          <Route path='/patient/track_health' element={<Healthtracker/>}/>
          <Route path='/patient/pharmacy' element={<Pharmacy/>}/>
          
        </Route>
        <Route path='/payment_success' element={<Paymentstatus/>}/>
        
      </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
