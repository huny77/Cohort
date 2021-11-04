package com.cohort.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cohort.entity.Comment;
import com.cohort.entity.Post;

public interface CommentRepository extends JpaRepository<Comment, Long>{
	List<Comment> findAllByPost(Post post);

}
