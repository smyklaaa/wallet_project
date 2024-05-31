import './App.css';
import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';

import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import ExpensePage from "./ExpensePage";


export default function App() {
    return (
        <Router>
            <div className="App">
                {/*<Header />*/}
                <nav>
                    <ul>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/login-page" element={<LoginPage/>}/>
                    <Route path="/registration-page" element={<RegistrationPage/>}/>
                    <Route path="/expenses" element={<ExpensePage/>}/>
                </Routes>

                {/*<Footer />*/}
            </div>
        </Router>
    );
}
