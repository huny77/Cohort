package com.cohort.dto;

import com.cohort.entity.Post;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "게시판 상세정보 Dto")
public class PostInfoDto {
	private Long id;
	private String language;
	private String site;
	private Post post;
}
