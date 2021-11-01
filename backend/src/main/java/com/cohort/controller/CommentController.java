package com.cohort.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cohort.service.CommentService;

import io.swagger.annotations.Api;

/**
 * 댓글 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@CrossOrigin("*")
@Api(value = "유저 API", tags = {"Comment"})
@RestController
@RequestMapping("/app/comments")
public class CommentController {
	
//	private final CommentService commentService;
}
