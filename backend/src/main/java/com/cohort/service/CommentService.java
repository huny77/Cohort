package com.cohort.service;

import java.util.ArrayList;
import java.util.List;

import javax.naming.CommunicationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cohort.dto.CommentDto;
import com.cohort.entity.Comment;
import com.cohort.entity.Post;
import com.cohort.entity.User;
import com.cohort.repository.CommentRepository;
import com.cohort.repository.PostRepository;
import com.cohort.repository.UserRepository;
import com.cohort.request.CommentRequest;
import com.cohort.response.BaseResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {

	@Autowired
	CommentRepository commentRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	PostRepository postRepository;
	
	
	public BaseResponse save(CommentRequest request) {
		System.out.println("댓글등록");
		BaseResponse response = null;
		try {
			User user = userRepository.findByMail(request.getMail()).orElse(null);
			Post post = postRepository.findById(request.getPost_id()).orElse(null);
			
			if(user==null) {
				response = new BaseResponse("fail","등록되지 않은 이메일"); 
			}
			else if(post==null) {
				response = new BaseResponse("fail","등록되지 않은 게시글번호"); 
			}
			else {
				commentRepository.save(Comment.builder().post(post).user(user).content(request.getContent()).build());
				response = new BaseResponse("success",request);				
			}
		}
		catch(Exception e){
			response = new BaseResponse("fail",e.getMessage());			
		}
		return response;
		
	}


	public BaseResponse delete(Long id) {
		BaseResponse res = null;
		try {
			commentRepository.deleteById(id);
			res = new BaseResponse("success",id+" 댓글삭제완료");
			
		}catch (Exception e) {
			res = new BaseResponse("fail","해당하는  댓글의 id가 없습니다.");
		}
		return res;
	}


	public BaseResponse findCommentByPostId(Long id) {
		BaseResponse res = null;
		try {
			Post post = postRepository.findById(id).orElse(null);
			if(post==null) {
				res = new BaseResponse("fail","존재하지 않는 post id 입니다");
			}
			System.out.println(post);
			List<Comment> list = commentRepository.findAllByPost(post);
			List<CommentDto> dtoList = new ArrayList<>();
			for (Comment c : list) {
				User user = userRepository.findById(c.getUser().getId()).orElse(null);
				dtoList.add(new CommentDto(c, user));
			}
			System.out.println(dtoList);
			res = new BaseResponse("success",dtoList);
		}catch (Exception e) {
			res = new BaseResponse("fail",e.getMessage());
		}
		return res;
	}
}
