package com.example.wallet_backend.service;

import com.example.wallet_backend.model.User;
import com.example.wallet_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    public User saveNewUser(User user){
        return userRepository.save(user);
    }

    public boolean checkIfUserInDatabase(String userName) {
        Optional<User> userByName = userRepository.findUserByName(userName);
        return userByName.isPresent();
    }


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
