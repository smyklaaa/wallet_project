import React, { useState } from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Cookies from 'js-cookie';
export const setCookieAfterLogin = () => {
    const loginDate = new Date().toISOString(); // Get the current date in ISO format
    Cookies.set('loginDate', loginDate, { expires: 7 }); // Cookie will expire in 7 days
};
export const isCookieExpired = (cookieName) => {
    const cookieValue = Cookies.get(cookieName);

    if (!cookieValue) {
        // wywolaj funkcje logout
        return true;
    }

    const cookieDate = new Date(cookieValue);
    const now = new Date();

    const diffMilliseconds = now - cookieDate;

    const diffHours = diffMilliseconds / (1000 * 60 * 60);

    if (diffHours > 1){
        // wywolaj funkcje logout
    }
};
