package com.cohort.dto;

import java.util.Date;

import com.cohort.entity.Post;
import com.cohort.entity.User;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "게시판 코드 댓글 Dto")
public class CommentDto {
	private Long id;
	private String content;
	private Date created;
	private User user;
	private Post post;
}
