import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import { AuthProvider } from './AuthProvider';
import ProtectedRoute from './ProtectedRoute';
import WelcomePage from './WelcomePage'; // Assuming you have a WelcomePage component

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    {/*<Header />*/}
                    <nav>
                        <ul>
                        </ul>
                    </nav>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/login-page" element={<LoginPage />} />
                        <Route path="/registration-page" element={<RegistrationPage />} />
                        <Route path="/login-page/index" element={<RegistrationPage />} />
                        <Route path="/welcome" element={<ProtectedRoute element={<WelcomePage />} />} />
                    </Routes>
                    {/*<Footer />*/}
                </div>
            </Router>
        </AuthProvider>
    );
}
