import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TextField } from '@material-ui/core';
import debounce from 'lodash.debounce';
import Button from "@mui/joy/Button";
import {isCookieExpired} from "./IsCookieExpired";

function ExpenseTable() {
    const [expenses, setExpenses] = useState([]);
    const [filters, setFilters] = useState({
        userId: 1,
        type: '',
        operationType: '',
        startDate: '',
        endDate: ''
    });

    const [newExpense, setNewExpense] = useState({
        userId: '',
        amount: '',
        operationType: '',
        type: '',
        date: ''
    });

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
            const response = await fetch('http://127.0.0.1:8080/expense/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(expense),
                credentials: 'include'
            });
            if (!response.ok) {
                alert("Wrong values provided while adding new expense")
                throw new Error('Failed to add expense');
            }
            fetchExpenses(filters);
        } catch (error) {
            console.error('Error adding expense:', error);
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
            userId: '',
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
                <TextField
                    name="userId"
                    label="User ID"
                    value={newExpense.userId}
                    onChange={handleNewExpenseChange}
                />
                <TextField
                    name="amount"
                    label="Amount"
                    value={newExpense.amount}
                    onChange={handleNewExpenseChange}
                />
                <TextField
                    name="type"
                    label="Type"
                    value={newExpense.type}
                    onChange={handleNewExpenseChange}
                />
                <TextField
                    name="operationType"
                    label="Operation Type"
                    value={newExpense.operationType}
                    onChange={handleNewExpenseChange}
                />
                <TextField
                    name="date"
                    label="Date"
                    type="datetime-local"
                    value={newExpense.date}
                    onChange={handleNewExpenseChange}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <Button onClick={handleAddExpense} style={styles.addExpenseButton}>Add Expense</Button>
            </div>

            <div style={styles.expenseListContainer}>
                <h2 style={styles.h2}>Your Expenses</h2>
                <TextField
                    name="userId"
                    label="User ID"
                    value={filters.userId}
                    onChange={handleFilterChange}
                />
                <TextField
                    name="type"
                    label="Type"
                    value={filters.type}
                    onChange={handleFilterChange}
                />
                <TextField
                    name="operationType"
                    label="Operation Type"
                    value={filters.operationType}
                    onChange={handleFilterChange}
                />
                <TextField
                    name="startDate"
                    label="Start Date"
                    type="datetime-local"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <TextField
                    name="endDate"
                    label="End Date"
                    type="datetime-local"
                    value={filters.endDate}
                    onChange={handleFilterChange}
                    InputLabelProps={{
                        shrink: true
                    }}
                />

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Amount</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Operation Type</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expenses.map((expense) => (
                            <TableRow key={expense.id}>
                                <TableCell>{expense.amount}</TableCell>
                                <TableCell>{expense.type}</TableCell>
                                <TableCell>{expense.operationType}</TableCell>
                                <TableCell>{expense.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
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
        margin: '20px'
    },
    h2: {
        fontSize: '1.4rem',
        fontWeight: 'bold',
        margin: '5px 10',
        color: '#0b6bcb'
    }
};

export default ExpenseTable;
