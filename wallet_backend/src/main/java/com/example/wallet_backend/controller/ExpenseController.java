package com.example.wallet_backend.controller;

import com.example.wallet_backend.dto.ExpenseDTO;
import com.example.wallet_backend.model.enums.ExpenseTypeEnum;
import com.example.wallet_backend.model.enums.OperationTypeEnum;
import com.example.wallet_backend.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/expense")
@CrossOrigin("http://localhost:3000/")
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
        if (type == null || "null".equals(type) || type.isEmpty()) {
            expenseTypeEnum = null;
        } else {
            expenseTypeEnum = ExpenseTypeEnum.valueOf(type.toLowerCase());
        }

        OperationTypeEnum operationTypeEnum;
        if (operationType == null || "null".equals(operationType) || operationType.isEmpty()) {
            operationTypeEnum = null;
        } else {
            operationTypeEnum = OperationTypeEnum.valueOf(operationType.toLowerCase());
        }

        LocalDateTime start;
        if (startDate == null || "null".equals(startDate) || startDate.isEmpty()) {
            start = LocalDateTime.parse("0001-01-01T00:00:01");
        } else {
            start = LocalDateTime.parse(startDate, formatter);
        }

        LocalDateTime end;
        if (endDate == null || "null".equals(endDate) || endDate.isEmpty()) {
            end = LocalDateTime.parse("9999-12-31T23:59:59");
        } else {
            end = LocalDateTime.parse(endDate, formatter);
        }

        List<ExpenseDTO> expenses = expenseService.findExpenses(userId, expenseTypeEnum, operationTypeEnum, start, end);
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }
}
