package com.cohort.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cohort.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long>{

}
