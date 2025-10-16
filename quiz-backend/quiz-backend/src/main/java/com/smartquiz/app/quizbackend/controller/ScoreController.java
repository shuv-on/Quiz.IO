package com.smartquiz.app.quizbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartquiz.app.quizbackend.entity.Score;
import com.smartquiz.app.quizbackend.service.ScoreService;

@RestController
@RequestMapping("/api/scores")
@CrossOrigin(origins = "http://localhost:5173")
public class ScoreController {
    @Autowired
    private ScoreService scoreService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitScore(@RequestBody Score score) {
        try {
            Score savedScore = scoreService.submitScore(score);
            return ResponseEntity.ok("Score saved! Your score: " + savedScore.getScore());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving score: " + e.getMessage());
        }
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<List<Score>> getLeaderboard() {
        List<Score> leaderboard = scoreService.getLeaderboard();
        return ResponseEntity.ok(leaderboard);
    }
}