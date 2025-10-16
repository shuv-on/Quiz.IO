package com.smartquiz.app.quizbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.smartquiz.app.quizbackend.entity.User;
import com.smartquiz.app.quizbackend.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User signup(User user) {
        // Duplicate check
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists!");
        }
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists!");
        }
        // Hash password
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User login(String emailOrUsername, String password) {
        User user = userRepository.findByEmail(emailOrUsername).orElse(
            userRepository.findByUsername(emailOrUsername).orElse(null)
        );
        if (user == null || !encoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials!");
        }
        return user;
    }
}