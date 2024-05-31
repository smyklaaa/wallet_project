package com.example.wallet_backend.controller;

import com.example.wallet_backend.dto.ExpenseDTO;
import com.example.wallet_backend.model.enums.ExpenseTypeEnum;
import com.example.wallet_backend.model.enums.OperationTypeEnum;
import com.example.wallet_backend.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/expense")
@CrossOrigin
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @GetMapping("/test")
    public ResponseEntity<String> test(){
        return new ResponseEntity<>("test", HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ExpenseDTO>> getAllExpenses() {
        List<ExpenseDTO> expenses = expenseService.getAllExpenses();
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody ExpenseDTO expense){
        expenseService.addExpense(expense);
        return new ResponseEntity<>("expense added", HttpStatus.OK);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<ExpenseDTO>> filterExpenses(
            @RequestParam Integer userId,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String operationType,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {

        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

        ExpenseTypeEnum expenseTypeEnum;
        if (type == null || "null".equals(type) || "".equals(type)) {
            expenseTypeEnum = null;
        } else {
            expenseTypeEnum = ExpenseTypeEnum.valueOf(type.toLowerCase());
        }

        OperationTypeEnum operationTypeEnum;
        if (operationType == null || "null".equals(operationType) || "".equals(operationType)) {
            operationTypeEnum = null;
        } else {
            operationTypeEnum = OperationTypeEnum.valueOf(operationType.toLowerCase());
        }

        LocalDateTime start;
        if (startDate == null || "null".equals(startDate) || "".equals(startDate)) {
            start = null;
        } else {
            start = startDate != null ? LocalDateTime.parse(startDate, formatter) : null;
        }

        LocalDateTime end;
        if (endDate == null || "null".equals(endDate) || "".equals(endDate)) {
            end = null;
        } else {
            end = endDate != null ? LocalDateTime.parse(endDate, formatter) : null;
        }

        List<ExpenseDTO> expenses = expenseService.findExpenses(userId, expenseTypeEnum, operationTypeEnum, start, end);
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }
}
