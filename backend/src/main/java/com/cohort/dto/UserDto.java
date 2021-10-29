package com.cohort.dto;


import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "회원 Dto")
public class UserDto {
	private Long id;
	private String mail;
	private String name;
	private String image;
}
