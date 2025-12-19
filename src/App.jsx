import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Patients from './components/Patients';
import DoctorScreen from './components/Doctor';
import VisitHistory from './pages/VisitHistory';
import PatientList from './pages/PatientList';
import Login from './pages/login';
import SignUp from './pages/SignUp';
import DataTableGuide from './pages/Guide';
import { AuthProvider } from './context/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="Login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <AuthProvider>
                    <Routes>
                        <Route element={<ProtectedRoute />}>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Patients />} />
                                <Route path="Patients" element={<Patients />} />
                                <Route path="DoctorScreen" element={<DoctorScreen />} />
                                <Route path="VisitHistory" element={<VisitHistory />} />
                                <Route path="PatientList" element={<PatientList />} />
                                <Route path="Guide" element={<DataTableGuide />} />
                            </Route>
                        </Route>
                    </Routes>
                </ AuthProvider>
            </Routes>
        </Router >
    );
};

export default App;
