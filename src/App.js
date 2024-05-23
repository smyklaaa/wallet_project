import './App.css';
import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';

import Home from "./Home";
import LoginPage from "./LoginPage";

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
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login-page" element={<LoginPage/>}/>
                </Routes>

                {/*<Footer />*/}
            </div>
        </Router>
    );
}
