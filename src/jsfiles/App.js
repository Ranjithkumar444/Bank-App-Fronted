import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Signup from './SignUp';
import Dashboard from './Dashboard';
import CreateAccount from './Create-Account';
import Withdraw from './Withdraw';
import Credit from './credit';
import Transfer from './transfer';
import Balance from './balance';

const App = () => {
    const storedUser = localStorage.getItem('user');
    const initialUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
    const [userState, setUser] = useState(initialUser);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [accountExists, setAccountExists] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            axios
                .get('http://localhost:8080/api/user/dashboard', {
                    headers: { Authorization: `Bearer ${storedToken}` },
                })
                .then((response) => {
                    console.log("Dashboard Response:", response.data);

                    if (response.data.message === 'No bank account found. Please create one.') {
                        setAccountExists(false);
                    } else {
                        setAccountExists(true);
                        localStorage.setItem("accountDetails", JSON.stringify(response.data));
                    }

                    if (!userState) {
                        setUser(JSON.parse(localStorage.getItem('user')));
                    }
                })
                .catch((error) => {
                    console.error("Error fetching dashboard details:", error);
                    if (error.response?.status === 401) {
                        handleLogout();
                    }
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [userState]);

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('accountDetails');
    };

    if (loading) return <p>Loading...</p>;

    return (
        <BrowserRouter>
            <div>
                
                <Routes>
                    <Route path="/" element={userState ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                    <Route path="/signup" element={userState ? <Navigate to="/dashboard" /> : <Signup />} />
                    <Route path="/login" element={userState ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />
                    <Route
                        path="/dashboard"
                        element={userState ? (accountExists ? <Dashboard /> : <CreateAccount />) : <Navigate to="/login" />}
                    />
                    <Route
                        path="/create-account"
                        element={userState ? (accountExists ? <Navigate to="/dashboard" /> : <CreateAccount />) : <Navigate to="/login" />}
                    />
                    <Route path="*" element={<Navigate to={userState ? '/dashboard' : '/login'} />} />
                    <Route path="/withdraw" element={<Withdraw />} />
                    <Route path="/credit" element={<Credit/>}></Route>
                    <Route path="/transfer" element={<Transfer/>}></Route>
                    <Route path="/balance" element={<Balance/>}></Route>
                </Routes>
                {userState && <button onClick={handleLogout} className='logout'>Logout</button>}
            </div>
        </BrowserRouter>
    );
};

export default App;
