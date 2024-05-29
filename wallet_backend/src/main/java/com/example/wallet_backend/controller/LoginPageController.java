package com.example.wallet_backend.controller;

import com.example.wallet_backend.model.User;
import com.example.wallet_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login-page")
@CrossOrigin
public class LoginPageController {
    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public ResponseEntity<String> add(@RequestBody User user){
        if (userService.checkIfUserInDatabase(user.getName())){
            return new ResponseEntity<>("User already exists", HttpStatus.CONFLICT);
        } else {
            userService.saveNewUser(user);
            return new ResponseEntity<>("Thank you for your registration!", HttpStatus.OK);
        }
    }
}
