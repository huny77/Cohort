package com.cohort.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cohort.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long>{

}
