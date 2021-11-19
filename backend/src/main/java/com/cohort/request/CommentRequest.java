package com.cohort.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
@ApiModel("CommentRequest")
public class CommentRequest {	
	@ApiModelProperty(name="댓글단 유저 메일", example="tngud128@gmail.com")
	String mail;
	@ApiModelProperty(name="댓글 내용", example="새로운 댓글")
	String content;
	@ApiModelProperty(name="댓글단 게시글 id", example="0")
	long post_id;
	
	

}
