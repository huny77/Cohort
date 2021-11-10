package com.cohort.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cohort.request.CommentRequest;
import com.cohort.request.LikeRequest;
import com.cohort.request.PostRequest;
import com.cohort.response.BaseResponse;
import com.cohort.service.CommentService;
import com.cohort.service.LikeService;
import com.cohort.service.PostService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
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
	
	@Autowired
	CommentService commentService;
	
	@Autowired
	LikeService likeService;
	
	@PostMapping()
	@ApiOperation(value = "코드 저장", response = BaseResponse.class)
	public BaseResponse savePost(@RequestBody PostRequest request) {
		return postService.save(request);
	}
	
	@GetMapping("/shows/{page}")
	@ApiOperation(value = "게시판 코드 조회",response = BaseResponse.class)
	public BaseResponse showPost(@PathVariable Integer page) {
		return postService.findAll(page);
	}
	
	@GetMapping("/details/{id}")
	@ApiOperation(value = "게시판 코드 상세 조회", response = BaseResponse.class)
	public BaseResponse showDetail(@PathVariable Long id) {
		return postService.showDetail(id);
	}
	
	@DeleteMapping("/{id}")
	@ApiOperation(value = "게시판 코드 삭제", response = BaseResponse.class)
	public BaseResponse deletePost(@PathVariable Long id) {
		return postService.remove(id);
	}
	
	/**
     * 댓글 등록 API [POST] /app/post/comments
     * 
     * @return BaseResponse
     */
	@PostMapping("/comments")
	@ApiOperation(value = "댓글 작성", notes = "댓글 작성",response = BaseResponse.class) 
	public BaseResponse createComment(@RequestBody @ApiParam(value="구글로그인정보", required = true) CommentRequest request) {
		return commentService.save(request);			
	}
	
	/**
     * 댓글 삭제 API [Delete] /app/post/comments/{cid}
     * 
     * @return BaseResponse
     */
	@DeleteMapping("/comments/{id}")
	@ApiOperation(value = "댓글 삭제", notes = "댓글 삭제",response = BaseResponse.class) 
	public BaseResponse deleteComment(@PathVariable Long id) {
		return commentService.delete(id);			
	}
	/**
     * 댓글 조회 API [Delete] /app/post/comments/{pid}
     * 
     * @return BaseResponse
     */
	
	@GetMapping("/comments/{id}")
	@ApiOperation(value = "게시판 댓글 조회",response = BaseResponse.class)
	public BaseResponse readComment(@PathVariable Long id) {
		return commentService.findCommentByPostId(id);
	}
	
	/**
     * 게시글 좋아요 등록 API [POST] /app/post/likes
     * 
     * @return BaseResponse
     */
	@PostMapping("/likes")
	@ApiOperation(value = "게시글 좋아요 등록",response = BaseResponse.class) 
	public BaseResponse registLike(@RequestBody @ApiParam(value="구글로그인정보", required = true) LikeRequest request) {
		return likeService.like(request);			
	}
	/**
     * 게시글의 좋아요  조회 API [Delete] /app/post/likes/{pid}
     * 
     * @return BaseResponse
     */
	
	@GetMapping("/likes/{id}")
	@ApiOperation(value = "게시글 좋아요 조회",response = BaseResponse.class)
	public BaseResponse readLikes(@PathVariable Long id) {
		return likeService.findLikesByPostId(id);
	}
	
	/**
     * 게시글 좋아요 삭제 API [Delete] /app/post/likes/{cid}
     * 
     * @return BaseResponse
     */
	@DeleteMapping("/likes")
	@ApiOperation(value = "좋아요 취소", notes = "좋아요 취소",response = BaseResponse.class) 
	public BaseResponse deleteLike(@RequestParam(value = "pid",required = true) Long pid,
			@RequestParam(value = "mail", required = true) String mail) {
		return likeService.delete(pid,mail);			
	}
	
}
