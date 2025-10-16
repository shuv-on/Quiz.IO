package com.smartquiz.app.quizbackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/test")
    public String test() {
        return "Hello from Quiz Backend! App is running perfectly on port 8081. DB connected!";
    }
}