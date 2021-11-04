package com.cohort.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cohort.entity.Post;
import com.cohort.entity.PostLike;
import com.cohort.entity.User;

public interface LikeRepository extends JpaRepository<PostLike, Long>{

	int countByPostId(Long id);
	List<PostLike> findAllByPost(Post post);
	List<PostLike> findByPostAndUser(Post post, User user);
	void deleteAllByPost(Post post);


}
