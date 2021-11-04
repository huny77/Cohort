package com.cohort.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.cohort.entity.PostInfo;

public interface PostInfoRepository extends JpaRepository<PostInfo, Long>{

	PostInfo findByPostId(Long id);

}
