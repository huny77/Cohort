package com.cohort.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("GoogleLoginUserRequest")
public class UserRequest {
	@ApiModelProperty(name="유저 메일", example="tngud128@gmail.com")
	String mail;
	@ApiModelProperty(name="유저 이름", example="오수형")
	String name;
	@ApiModelProperty(name="유저 이미지 CDN URL", example="https://lh3.googleusercontent.com/a/AATXAJwyewbWsmvPJG9-Jx7JkVWU0XCk60Vd2l3d7DKDuA=s96-c-br100-rg-mo")
	String image;	

}
