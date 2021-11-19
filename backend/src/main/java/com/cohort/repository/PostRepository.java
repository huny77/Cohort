package com.cohort.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cohort.entity.Post;
import com.cohort.entity.User;

public interface PostRepository extends JpaRepository<Post, Long>{

	List<Post> findAllByUser(User user);
	
}
