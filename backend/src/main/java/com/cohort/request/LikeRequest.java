package com.cohort.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
@ApiModel(value = "LikeRequest")
public class LikeRequest {
	@ApiModelProperty(name = "게시글 번호")
	Long post_id;
	@ApiModelProperty(name = "유저 메일")
	String mail;
}
