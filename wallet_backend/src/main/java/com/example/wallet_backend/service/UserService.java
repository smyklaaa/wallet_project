package com.example.wallet_backend.service;

import com.example.wallet_backend.model.User;
import com.example.wallet_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveNewUser(User user) {
        return userRepository.save(user);
    }

    public boolean checkIfUserInDatabase(String userName) {
        Optional<User> userByName = userRepository.findUserByName(userName);
        return userByName.isPresent();
    }

    public boolean checkIfCorrectPassword(String userName, String password) {
        Optional<User> userOptional = userRepository.findUserByName(userName);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getPassword().equals(password);
        }
        return false;
    }

    public boolean loginUser(String userName, String password, HttpSession session) {
        if (checkIfCorrectPassword(userName, password)) {
            session.setAttribute("user", userName);
            return true;
        }
        return false;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
