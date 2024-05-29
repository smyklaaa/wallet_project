package com.example.wallet_backend.repositories;

import com.example.wallet_backend.model.Expense;
import com.example.wallet_backend.model.enums.ExpenseTypeEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Integer> {

    @Query("SELECT e.id, e.amount, e.operation_type, e.type, e.date, e.user.id FROM Expense e WHERE " +
            "(:userId IS NULL OR e.user.id = :userId) AND " +
            "(:type IS NULL OR e.type = :type) AND " +
            "(:startDate IS NULL OR :endDate IS NULL OR e.date BETWEEN :startDate AND :endDate)")
    List<Object[]> findExpenses(Integer userId, ExpenseTypeEnum type, LocalDateTime startDate, LocalDateTime endDate);

}
