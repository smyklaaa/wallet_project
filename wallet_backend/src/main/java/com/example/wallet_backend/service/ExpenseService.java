package com.example.wallet_backend.service;

import com.example.wallet_backend.model.Expense;
import com.example.wallet_backend.model.enums.ExpenseTypeEnum;
import com.example.wallet_backend.repositories.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public Expense addExpense(Expense expense){
        return expenseRepository.save(expense);
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public List<Object[]> findExpenses(Integer userId, ExpenseTypeEnum type, LocalDateTime startDate, LocalDateTime endDate) {
        return expenseRepository.findExpenses(userId, type, startDate, endDate);
    }
}
