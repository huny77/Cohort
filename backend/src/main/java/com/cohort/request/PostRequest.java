package com.cohort.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
@ApiModel(value = "게시판 코드")
public class PostRequest {
	@ApiModelProperty(name = "제목")
	String title;
	@ApiModelProperty(name = "작성 코드")
	String content;
	@ApiModelProperty(name = "프로그래밍언어", example = "java")
	String language;
	@ApiModelProperty(name = "알고리즘 사이트", example = "BOJ")
	String site;
	@ApiModelProperty(name = "유저 메일")
	String mail;
}
