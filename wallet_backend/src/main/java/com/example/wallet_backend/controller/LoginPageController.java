package com.example.wallet_backend.controller;

import com.example.wallet_backend.model.User;
import com.example.wallet_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/login-page")
@CrossOrigin("http://localhost:3000/")
public class LoginPageController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user, HttpSession session) {
        if (userService.checkIfUserInDatabase(user.getName())) {
            if (userService.loginUser(user.getName(), user.getPassword(), session)) {
                return new ResponseEntity<>("Login successful!", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Wrong password", HttpStatus.CONFLICT);
            }
        } else {
            return new ResponseEntity<>("User does not exist", HttpStatus.NOT_FOUND);
        }
    }
}
