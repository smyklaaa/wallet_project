package com.example.wallet_backend.dto;

import com.example.wallet_backend.model.enums.ExpenseTypeEnum;
import com.example.wallet_backend.model.enums.OperationTypeEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ExpenseDTO {

    private int id;
    private int userId;
    private int amount;
    private OperationTypeEnum operationType;
    private ExpenseTypeEnum type;
    private LocalDateTime date;

    public ExpenseDTO(int id, int userId, int amount, OperationTypeEnum operationType, ExpenseTypeEnum type, LocalDateTime date) {
        this.id = id;
        this.userId = userId;
        this.amount = amount;
        this.operationType = operationType;
        this.type = type;
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public OperationTypeEnum getOperationType() {
        return operationType;
    }

    public void setOperationType(OperationTypeEnum operationType) {
        this.operationType = operationType;
    }

    public ExpenseTypeEnum getType() {
        return type;
    }

    public void setType(ExpenseTypeEnum type) {
        this.type = type;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}
