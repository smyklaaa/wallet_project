package com.example.wallet_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/secure")
public class SecurePageController {

    @GetMapping("/welcome")
    public ResponseEntity<String> welcome(HttpSession session) {
        if (session.getAttribute("user") != null) {
            return new ResponseEntity<>("Witam!", HttpStatus.OK);
        }
        return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
}
