package com.cohort.dto;

import java.util.Date;

import com.cohort.entity.User;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "게시판 코드 Dto")
public class PostDto {
	private Long id;
	private String title;
	private String content;
	private Date created;
	private User user;
}
