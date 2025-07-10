import React from 'react';
import './App.css'; // Import your CSS file
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Patients from './components/Patients';
import Doctor from './components/Doctor';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Patients />} />
                    <Route path="Patients" element={<Patients />} />
                    <Route path="Doctors" element={<Doctor />} />

                </Route>
            </Routes>
        </Router>
    );
};

export default App;
