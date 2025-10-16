package com.smartquiz.app.quizbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartquiz.app.quizbackend.entity.Score;
import com.smartquiz.app.quizbackend.repository.ScoreRepository;

@Service
public class ScoreService {
    @Autowired
    private ScoreRepository scoreRepository;

    public Score submitScore(Score score) {
        return scoreRepository.save(score);
    }

    public List<Score> getLeaderboard() {
        return scoreRepository.findAllOrderByScoreDesc();
    }
}