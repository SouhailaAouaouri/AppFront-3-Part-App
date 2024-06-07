import React from 'react';
import './App.css';
import LoginPage from "./components/login";
import CallbackPage from "./components/CallbackPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/authorize" element={<CallbackPage/>} />
                <Route path="/home" element={<Home/>} />

            </Routes>
        </Router>
    );
}

export default App;
