import React, { useState } from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';

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

const RegistrationPage = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== repeatPassword) {
            setError('Passwords do not match!');
            return;
        }

        const user = { name, password };

        fetch("http://localhost:8080/registration-page/add-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(response => {
            if (response.status === 409) {
                setError('User already exists');
            } else if (response.ok) {
                setSuccess('Thank you for your registration!');
            } else {
                setError('An error occurred. Please try again.');
            }
        }).catch(() => {
            setError('An error occurred. Please try again.');
        });
    };

    return (
        <CssVarsProvider>
            <ModeToggle />
            <Sheet
                sx={{
                    width: 300,
                    mx: 'auto', // margin left & right
                    my: 4, // margin top & bottom
                    py: 3, // padding top & bottom
                    px: 2, // padding left & right
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
                    <Typography level="body-sm">Sign up to continue.</Typography>
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

                <FormControl>
                    <FormLabel>Repeat Password</FormLabel>
                    <Input
                        name="repeat-password"
                        type="password"
                        placeholder="repeat password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
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

                <Button sx={{ mt: 1 /* margin top */ }} onClick={handleClick}>
                    Sign up
                </Button>
                <Typography
                    endDecorator={<Link href="/login-page">Log in</Link>}
                    fontSize="sm"
                    sx={{ alignSelf: 'center' }}
                >
                    Back to login page?
                </Typography>
            </Sheet>
        </CssVarsProvider>
    );
};

export default RegistrationPage;
