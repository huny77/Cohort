package com.cohort.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cohort.entity.Comment;
import com.cohort.entity.Post;

public interface CommentRepository extends JpaRepository<Comment, Long>{

	Page<Comment> findAllByPost(Post post, Pageable pageable);
	List<Comment> findAllByPost(Post post);
	int countByPost(Post post);

}
