package com.cohort.response;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "서버에서 클라이언트로 데이터 전송하는 객체", description = "보내는 데이터를 갖는 객체")
public class BaseResponse<T> {
	private String status;
	private T data;
}
