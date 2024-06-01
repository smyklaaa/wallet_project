package com.example.wallet_backend.repositories;

import com.example.wallet_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT u.id FROM User u WHERE u.name = :name")
    Integer findIdByName(@Param("name") String name);
    Optional<User> findUserByName(String name);
}
