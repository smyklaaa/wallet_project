import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TextField } from '@material-ui/core';
import debounce from 'lodash.debounce';
import {useColorScheme} from "@mui/joy/styles";
import Button from "@mui/joy/Button";
import {isCookieExpired} from "./Test";

function ExpenseTable() {
    const [expenses, setExpenses] = useState([]);
    const [filters, setFilters] = useState({
        userId: 1,
        type: '',
        operationType: '',
        startDate: '',
        endDate: ''
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
            const response = await fetch(`http://127.0.0.1:8080/expense/filter?${params}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
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

    // Debounce the fetchExpenses function to avoid frequent calls
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
                    shrink: true,
                }}
            />
            <TextField
                name="endDate"
                label="End Date"
                type="datetime-local"
                value={filters.endDate}
                onChange={handleFilterChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>User ID</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Operation Type</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {expenses.map(expense => (
                        <TableRow key={expense.id}>
                            <TableCell>{expense.id}</TableCell>
                            <TableCell>{expense.userId}</TableCell>
                            <TableCell>{expense.amount}</TableCell>
                            <TableCell>{expense.operationType}</TableCell>
                            <TableCell>{expense.type}</TableCell>
                            <TableCell>{expense.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default ExpenseTable;
