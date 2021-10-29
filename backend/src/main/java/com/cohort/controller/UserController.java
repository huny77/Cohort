package com.cohort.controller;

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
@RequestMapping("/api/v1/users")
public class UserController {
	
//	private final UserService userService;
	
	@PostMapping("/glogin")
	@ApiOperation(value = "구글로그인", notes = "구글로그인") 
	public String glogin(@RequestBody @ApiParam(value="구글로그인정보", required = true) String b) {
		System.out.println(b);	
		return b;
	}

	@ApiOperation(value = "회원가입", response = BaseResponse.class)
    @PostMapping("/join")
    public BaseResponse join(@ApiParam(value = "회원 정보") @RequestBody UserRequest request){

        BaseResponse response = null;
        try{
            response = new BaseResponse("success", "가입 완료");
        }catch(IllegalStateException e){
            response = new BaseResponse("fail",e.getMessage());
        }
        return response;
    }
}
