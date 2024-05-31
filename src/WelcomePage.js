import React from 'react';
import Button from "@mui/joy/Button";



const WelcomePage = () => {

    const handleClick = (e) => {
        e.preventDefault();

        fetch("http://localhost:8080/login-page/test", {
            method: "POST",
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
        })
            .then(response => {
                console.log('Error:');

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <h1>Witam!</h1>
            <Button sx={{ mt: 1 }} onClick={handleClick}>
                Log in
            </Button>
        </div>
    );
};

export default WelcomePage;
