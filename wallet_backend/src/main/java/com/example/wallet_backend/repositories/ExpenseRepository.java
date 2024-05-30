package com.example.wallet_backend.repositories;

import com.example.wallet_backend.dto.ExpenseDTO;
import com.example.wallet_backend.model.Expense;
import com.example.wallet_backend.model.enums.ExpenseTypeEnum;
import com.example.wallet_backend.model.enums.OperationTypeEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Integer> {

    @Query("SELECT new com.example.wallet_backend.dto.ExpenseDTO(e.id, e.user.id, e.amount, e.operationType, e.type, e.date) FROM Expense e WHERE " +
            "(:userId IS NULL OR e.user.id = :userId) AND " +
            "(:type IS NULL OR e.type = :type) AND " +
            "(:operationType IS NULL OR e.operationType = :operationType) AND " +
            "(:startDate IS NULL OR :endDate IS NULL OR e.date BETWEEN :startDate AND :endDate)")
    List<ExpenseDTO> findExpenses(Integer userId, ExpenseTypeEnum type, OperationTypeEnum operationType, LocalDateTime startDate, LocalDateTime endDate);
}
