package com.example.wallet_backend.controller;

import com.example.wallet_backend.model.User;
import com.example.wallet_backend.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/login-page")
@CrossOrigin(origins = "http://localhost:3000/", allowCredentials = "true")
public class LoginPageController {

    private final UserService userService;

    public LoginPageController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user, HttpSession session) {

        if (userService.checkIfUserInDatabase(user.getName())) {
            if (userService.loginUser(user.getName(), user.getPassword() )) {
                session.setAttribute("user", user.getName());
                System.out.println("value from login: " + session.getAttribute("user"));
                return new ResponseEntity<>("Login successful!", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Wrong password", HttpStatus.CONFLICT);
            }
        } else {
            return new ResponseEntity<>("User does not exist", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/test")
    public ResponseEntity<String> test( HttpSession session) {
        session.getAttribute("user");
        System.out.println(session.getAttribute("user"));
        return new ResponseEntity<>("User does not exist", HttpStatus.NOT_FOUND);
    }
}
