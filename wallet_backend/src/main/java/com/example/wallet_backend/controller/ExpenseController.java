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
            @RequestParam(required = false) ExpenseTypeEnum type,
            @RequestParam(required = false) OperationTypeEnum operationType,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {

        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

        LocalDateTime start = startDate != null ? LocalDateTime.parse(startDate, formatter) : null;
        LocalDateTime end = endDate != null ? LocalDateTime.parse(endDate, formatter) : null;

        List<ExpenseDTO> expenses = expenseService.findExpenses(userId, type, operationType, start, end);
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }
}
