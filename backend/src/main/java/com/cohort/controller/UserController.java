package com.cohort.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	public BaseResponse<User> glogin(@RequestBody @ApiParam(value="구글로그인정보", required = true) UserRequest request) {
		return userService.login(request);			
	}
    /**
     * 회원탈퇴 API
     * [DELETE] /app/users
     * @return BaseResponse
     */
	@DeleteMapping()
	@ApiOperation(value = "계정정보삭제", notes = "계정정보삭제",response = BaseResponse.class) 
	public BaseResponse delete(@RequestParam(value="mail", required=true) String mail) {
		return userService.delete(mail);			
	}
    /**
     * 회원수정 API
     * [PATCH] /app/users
     * @return BaseResponse
     */	
	@PatchMapping()
	@ApiOperation(value = "계정정보수정", notes = "계정정보수정",response = BaseResponse.class) 
	public BaseResponse<User> update(@RequestBody @ApiParam(value="구글로그인정보", required = true) UserRequest request){		
		return userService.update(request);
	}
	
    /**
     * 회원조회 API
     * [GET] /app/users
     * @return BaseResponse
     */	
	@GetMapping()
	@ApiOperation(value = "계정정보조회", notes = "계정정보조회",response = BaseResponse.class) 
	public BaseResponse<User> read(@RequestParam(value="mail", required=true) String mail){		
		return userService.find(mail);
	}
	
}
