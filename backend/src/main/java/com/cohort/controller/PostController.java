package com.cohort.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cohort.request.PostRequest;
import com.cohort.response.BaseResponse;
import com.cohort.service.PostService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

/**
 * 게시판 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@CrossOrigin("*")
@Api(value = "게시판 API", tags = {"Post"})
@RestController
@RequestMapping("/app/post")
@RequiredArgsConstructor
public class PostController {
	@Autowired
	private final PostService postService;
	
	@PostMapping()
	@ApiOperation(value = "코드 저장", response = BaseResponse.class)
	public BaseResponse savePost(@RequestBody PostRequest request) {
		return postService.save(request);
	}
	
	@GetMapping()
	@ApiOperation(value = "게시판 코드 조회",response = BaseResponse.class)
	public BaseResponse showPost() {
		return postService.findAll();
	}

	@DeleteMapping("/{id}")
	@ApiOperation(value = "게시판 코드 삭제", response = BaseResponse.class)
	public BaseResponse deletePost(@PathVariable Long id) {
		return postService.remove(id);
	}
}
