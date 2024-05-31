package com.example.wallet_backend.mapper;

import com.example.wallet_backend.dto.ExpenseDTO;
import com.example.wallet_backend.model.Expense;
import com.example.wallet_backend.model.User;
import com.example.wallet_backend.model.enums.ExpenseTypeEnum;
import com.example.wallet_backend.model.enums.OperationTypeEnum;

public class ExpenseMapper {

    public static Expense toEntity(ExpenseDTO dto) {
        if (dto == null) {
            return null;
        }
        Expense expense = new Expense();
        expense.setId(dto.getId());
        expense.setAmount(dto.getAmount());
        expense.setOperationType(OperationTypeEnum.valueOf(dto.getOperationType()));
        expense.setType(ExpenseTypeEnum.valueOf(dto.getType()));
        expense.setDate(dto.getDate());

        User user = new User();
        user.setId(dto.getUserId());
        expense.setUser(user);

        return expense;
    }

    public static ExpenseDTO toDTO(Expense entity) {
        if (entity == null) {
            return null;
        }
        return new ExpenseDTO(
                entity.getId(),
                entity.getUser().getId(),
                entity.getAmount(),
                entity.getOperationType(),
                entity.getType(),
                entity.getDate()
        );
    }
}
