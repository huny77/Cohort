package com.cohort.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cohort.service.PostService;

import io.swagger.annotations.Api;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@CrossOrigin("*")
@Api(value = "게시판 API", tags = {"Post"})
@RestController
@RequestMapping("/api/v1/posts")
public class PostController {
//	private final PostService postService;
}
