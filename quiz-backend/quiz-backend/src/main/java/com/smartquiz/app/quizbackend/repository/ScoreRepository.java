package com.smartquiz.app.quizbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.smartquiz.app.quizbackend.entity.Score;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
    List<Score> findByUsernameOrderByScoreDesc(String username);
    @Query("SELECT s FROM Score s ORDER BY s.score DESC, s.createdAt DESC")
    List<Score> findAllOrderByScoreDesc(); 
}