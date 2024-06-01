import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TextField, Select, MenuItem, Grid, InputLabel, FormControl } from '@material-ui/core';
import debounce from 'lodash.debounce';
import Button from "@mui/joy/Button";
import { isCookieExpired } from "./IsCookieExpired";

function ExpenseTable() {
    const [expenses, setExpenses] = useState([]);
    const [filters, setFilters] = useState({
        type: '',
        operationType: '',
        startDate: '',
        endDate: ''
    });

    const [newExpense, setNewExpense] = useState({
        amount: '',
        operationType: '',
        type: '',
        date: ''
    });

    const expenseCategories = [
        'food', 'medicines', 'transport', 'entertainment', 'utilities', 'rent',
        'groceries', 'clothing', 'education', 'healthcare', 'insurance', 'investment',
        'savings', 'travel', 'gifts', 'donations', 'pets', 'subscriptions', 'maintenance', 'miscellaneous',
        'transfer'
    ];

    const formatDateTime = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('.')[0]; // Remove milliseconds
    };

    const fetchExpenses = async (filters) => {
        if (isCookieExpired("loginDate")){
            alert("wrong cookie")
        }
        try {
            const queryParams = Object.fromEntries(
                Object.entries(filters).filter(([key, value]) => value)
            );
            const params = new URLSearchParams(queryParams).toString();
            const response = await fetch(`http://localhost:8080/expense/filter?${params}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Failed to fetch expenses');
            }
            const data = await response.json();
            setExpenses(data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const addExpense = async (expense) => {
        try {
            const queryParams = Object.fromEntries(
                Object.entries(expense).filter(([key, value]) => value)
            );
            const params = new URLSearchParams(queryParams).toString();
            const response = await fetch(`http://localhost:8080/expense/add?${params}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Failed to add expense');
            }
            fetchExpenses(filters);
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/login-page/logout', {
                method: 'POST',
                credentials: 'include'
            });

            if (response.ok) {
                const cookies = document.cookie.split(";");

                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i];
                    const eqPos = cookie.indexOf("=");
                    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
                }

                window.location.href = "/login-page";
            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred during logout:', error);
        }
    };

    const handleNewExpenseChange = (e) => {
        const { name, value } = e.target;
        setNewExpense(prevNewExpense => ({
            ...prevNewExpense,
            [name]: value
        }));
    };

    const handleAddExpense = () => {
        addExpense(newExpense);
        // Reset the new expense form
        setNewExpense({
            amount: '',
            operationType: '',
            type: '',
            date: ''
        });
    };

    const debouncedFetchExpenses = useCallback(
        debounce((filters) => fetchExpenses(filters), 300),
        []
    );

    useEffect(() => {
        debouncedFetchExpenses(filters);
    }, [filters, debouncedFetchExpenses]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: (name === 'startDate' || name === 'endDate') ? formatDateTime(value) : value
        }));
    };

    return (
        <div>
            <div style={styles.newExpenseContainer}>
                <h2 style={styles.h2}>Add New Expense</h2>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            name="amount"
                            label="Amount"
                            value={newExpense.amount}
                            type="number"
                            InputProps={{ inputProps: { min: 1} }}
                            onChange={handleNewExpenseChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormControl fullWidth>
                            <InputLabel>Type</InputLabel>
                            <Select
                                name="type"
                                value={newExpense.type}
                                onChange={handleNewExpenseChange}
                                fullWidth
                            >
                                <MenuItem value="" disabled>Select Type</MenuItem>
                                {expenseCategories.map(category => (
                                    <MenuItem key={category} value={category}>{category}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormControl fullWidth>
                            <InputLabel>Operation Type</InputLabel>
                            <Select
                                name="operationType"
                                value={newExpense.operationType}
                                onChange={handleNewExpenseChange}
                                fullWidth
                            >
                                <MenuItem value="" disabled>Select Operation Type</MenuItem>
                                <MenuItem value="positive">Positive</MenuItem>
                                <MenuItem value="negative">Negative</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            name="date"
                            label="Date"
                            type="datetime-local"
                            value={newExpense.date}
                            onChange={handleNewExpenseChange}
                            InputLabelProps={{
                                shrink: true
                            }}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Button onClick={handleAddExpense} style={styles.addExpenseButton}>Add Expense</Button>
            </div>

            <div style={styles.expenseListContainer}>
                <h2 style={styles.h2}>Your Expenses</h2>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                        <FormControl fullWidth>
                            <InputLabel>Type</InputLabel>
                            <Select
                                name="type"
                                value={filters.type}
                                onChange={handleFilterChange}
                                fullWidth
                            >
                                <MenuItem value="">All Types</MenuItem>
                                {expenseCategories.map(category => (
                                    <MenuItem key={category} value={category}>{category}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl fullWidth>
                            <InputLabel>Operation Type</InputLabel>
                            <Select
                                name="operationType"
                                value={filters.operationType}
                                onChange={handleFilterChange}
                                fullWidth
                            >
                                <MenuItem value="">All Operation Types</MenuItem>
                                <MenuItem value="positive">Positive</MenuItem>
                                <MenuItem value="negative">Negative</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            name="startDate"
                            label="Start Date"
                            type="datetime-local"
                            value={filters.startDate}
                            onChange={handleFilterChange}
                            InputLabelProps={{
                                shrink: true
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            name="endDate"
                            label="End Date"
                            type="datetime-local"
                            value={filters.endDate}
                            onChange={handleFilterChange}
                            InputLabelProps={{
                                shrink: true
                            }}
                            fullWidth
                        />
                    </Grid>
                </Grid>

                <Table>
                    <TableBody>
                        {expenses.map((expense) => {
                            const date = new Date(expense.date);
                            const formattedDate = date.toLocaleString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                            });

                            return (
                                <TableRow key={expense.id}>
                                    <TableCell>{expense.amount}</TableCell>
                                    <TableCell>{expense.type}</TableCell>
                                    <TableCell>{expense.operationType}</TableCell>
                                    <TableCell>{formattedDate}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            <Button onClick={handleLogout} style={styles.logoutButton}>Logout</Button>
        </div>
    );
}

const styles = {
    newExpenseContainer: {
        width: '90%',
        border: '1px solid #ccc',
        padding: '20px',
        marginBottom: '20px',
        borderRadius: '5px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    expenseListContainer: {
        width: '90%',
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '5px',
        margin: 'auto'
    },
    addExpenseButton: {
        marginTop: '20px',
        display: 'block',
        backgroundColor: '#0b6bcb',
        color: '#fff',
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    logoutButton: {
        marginTop: '20px',
        display: 'block',
        backgroundColor: '#0b6bcb',
        color: '#fff',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    h2: {
        fontSize: '1.4rem',
        fontWeight: 'bold',
        margin: '5px 10',
        color: '#0b6bcb'
    }
};

export default ExpenseTable;
