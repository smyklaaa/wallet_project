package com.example.wallet_backend.model;

import com.example.wallet_backend.model.enums.ExpenseTypeEnum;
import com.example.wallet_backend.model.enums.OperationTypeEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private User user;

    private int amount;

    @Enumerated(EnumType.STRING)
    private OperationTypeEnum operation_type;

    @Enumerated(EnumType.STRING)
    private ExpenseTypeEnum type;

    private LocalDateTime date;
}
