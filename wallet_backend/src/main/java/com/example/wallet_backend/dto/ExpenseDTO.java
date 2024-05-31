package com.example.wallet_backend.dto;

import com.example.wallet_backend.model.enums.ExpenseTypeEnum;
import com.example.wallet_backend.model.enums.OperationTypeEnum;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ExpenseDTO {

    private int id;
    @NotNull(message = "User ID cannot be null")
    private Integer userId;

    @NotNull(message = "Amount cannot be null")
    private Integer amount;

    @NotEmpty(message = "Operation Type cannot be empty")
    private String operationType;

    @NotEmpty(message = "Type cannot be empty")
    private String type;

    @NotNull(message = "Date cannot be null")
    private LocalDateTime date;

    public ExpenseDTO(int id, int userId, int amount, OperationTypeEnum operationType, ExpenseTypeEnum type, LocalDateTime date) {
        this.id = id;
        this.userId = userId;
        this.amount = amount;
        this.operationType = String.valueOf(operationType);
        this.type = String.valueOf(type);
        this.date = date;
    }
    public ExpenseDTO(int userId, int amount, OperationTypeEnum operationType, ExpenseTypeEnum type, LocalDateTime date) {
        this.userId = userId;
        this.amount = amount;
        this.operationType = String.valueOf(operationType);
        this.type = String.valueOf(type);
        this.date = date;
    }
}
