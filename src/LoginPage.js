import React from 'react';
import {CssVarsProvider, useColorScheme} from '@mui/joy/styles';
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

    // necessary for server-side rendering
    // because mode is undefined on the server
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


const handleClick = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const user = { name, password };

    fetch("http://localhost:8080/login-page/login", {
        method: "GET",
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


const LoginPage = () => {
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
                    <Typography level="body-sm">Sign in to continue.</Typography>
                </div>

                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                        // html input attribute
                        name="email"
                        type="email"
                        placeholder="johndoe@email.com"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                        name="password"
                        type="password"
                        placeholder="password"
                    />
                </FormControl>

                <Button sx={{ mt: 1 /* margin top */ }} nClick={handleClick}>
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