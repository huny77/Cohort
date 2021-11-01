package com.cohort.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cohort.entity.User;
import com.cohort.request.UserRequest;
import com.cohort.response.BaseResponse;
import com.cohort.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@CrossOrigin("*")
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/app/users")
public class UserController {		
	@Autowired
	UserService userService;	
	/**
     * 로그인 API [POST] /app/users/
     * 
     * @return BaseResponse
     */
    // Body
	@PostMapping()
	@ApiOperation(value = "구글로그인", notes = "구글로그인",response = BaseResponse.class) 
	public BaseResponse glogin(@RequestBody @ApiParam(value="구글로그인정보", required = true) UserRequest request) {
		return userService.login(request);			
	}
}
