package com.example.wallet_backend.service;

import com.example.wallet_backend.dto.ExpenseDTO;
import com.example.wallet_backend.mapper.ExpenseMapper;
import com.example.wallet_backend.model.Expense;
import com.example.wallet_backend.model.enums.ExpenseTypeEnum;
import com.example.wallet_backend.model.enums.OperationTypeEnum;
import com.example.wallet_backend.repositories.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public ExpenseDTO addExpense(ExpenseDTO expenseDTO) {
        Expense expense = ExpenseMapper.toEntity(expenseDTO);
        Expense savedExpense = expenseRepository.save(expense);
        return ExpenseMapper.toDTO(savedExpense);
    }

    public List<ExpenseDTO> getAllExpenses() {
        List<Expense> expenses = expenseRepository.findAll();
        return expenses.stream()
                .map(ExpenseMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<ExpenseDTO> findExpenses(Integer userId, ExpenseTypeEnum type, OperationTypeEnum operationType, LocalDateTime startDate, LocalDateTime endDate) {
        return expenseRepository.findExpenses(userId, type, operationType, startDate, endDate);
    }
}
