import React, { useState } from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { setCookieAfterLogin } from './IsCookieExpired';
import {useNavigate} from "react-router-dom";

function ModeToggle() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <Button
            variant="outlined"
            onClick={() => {
                setMode(mode === 'light' ? 'dark' : 'light');
            }}
        >
            {mode === 'light' ? 'Turn dark' : 'Turn light'}
        </Button>
    );
}

const LoginPage = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const user = { name, password };

        fetch("http://localhost:8080/login-page/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        })
            .then(response => {
                if (response.status === 404) {
                    setError('User does not exist');
                } else if (response.status === 409) {
                    setError('Wrong password');
                } else if (response.ok) {
                    setSuccess('Login successful!');
                    navigate('/expenses');
                } else {
                    console.log(response)
                    setError('An error occurred. Please try again.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setError('An error occurred. Please try again.');
            });
    };

    return (
        <CssVarsProvider>
            <ModeToggle />
            <Sheet
                sx={{
                    width: 300,
                    mx: 'auto',
                    my: 4,
                    py: 3,
                    px: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    borderRadius: 'sm',
                    boxShadow: 'md',
                }}
            >
                <div>
                    <Typography level="h4" component="h1">
                        Welcome!
                    </Typography>
                    <Typography level="body-sm">Sign in to continue.</Typography>
                </div>

                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                        name="email"
                        type="email"
                        placeholder="johndoe@email.com"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                        name="password"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>

                {error && (
                    <Typography color="danger" fontSize="sm">
                        {error}
                    </Typography>
                )}
                {success && (
                    <Typography color="success" fontSize="sm">
                        {success}
                    </Typography>
                )}

                <Button sx={{ mt: 1 }} onClick={handleClick}>
                    Log in
                </Button>
                <Typography
                    endDecorator={<Link href="/registration-page">Sign up</Link>}
                    fontSize="sm"
                    sx={{ alignSelf: 'center' }}
                >
                    Don't have an account?
                </Typography>
            </Sheet>
        </CssVarsProvider>
    );
};

export default LoginPage;
