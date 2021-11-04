package com.cohort.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cohort.entity.PostLike;
import com.cohort.entity.User;

public interface PostLikeRepository extends JpaRepository<PostLike, Long>{

	int countByPostId(Long id);

}
