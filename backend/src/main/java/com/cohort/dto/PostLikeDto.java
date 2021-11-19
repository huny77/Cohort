package com.cohort.dto;

import com.cohort.entity.Post;
import com.cohort.entity.User;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "게시판 '좋아요' Dto")
public class PostLikeDto {
	
	private Long id;
	private User user;
	private Post post;
}
