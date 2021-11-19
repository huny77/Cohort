package com.cohort.service;

import java.util.ArrayList;
import java.util.List;

import javax.naming.CommunicationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cohort.entity.Comment;
import com.cohort.entity.Post;
import com.cohort.entity.PostLike;
import com.cohort.entity.User;
import com.cohort.repository.CommentRepository;
import com.cohort.repository.LikeRepository;
import com.cohort.repository.PostRepository;
import com.cohort.repository.UserRepository;
import com.cohort.request.CommentRequest;
import com.cohort.request.LikeRequest;
import com.cohort.response.BaseResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LikeService {

	@Autowired
	CommentRepository commentRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	PostRepository postRepository;	
	@Autowired
	LikeRepository likeRepository;

	public BaseResponse like(LikeRequest request) {
		BaseResponse response = null;
		try {
			User user = userRepository.findByMail(request.getMail()).orElse(null);
			Post post = postRepository.findById(request.getPost_id()).orElse(null);
			if(user==null || post==null) {
				response = new BaseResponse("fail","user or post is null");
			}
			else {
				likeRepository.save(PostLike.builder().user(user).post(post).build());
				response = new BaseResponse("success","좋아요 추가 완료");
			}
		}catch (Exception e) {
			response = new BaseResponse("fail",e.getMessage());
		}
		
		return response;
	}

	public BaseResponse findLikesByPostId(Long id) {
		BaseResponse res = null;
		try {
			Post post = postRepository.findById(id).orElse(null);
			if(post==null) {
				res = new BaseResponse("fail","존재하지 않는 post id 입니다");
			}
			System.out.println(post);
			List<PostLike> list = likeRepository.findAllByPost(post);			
			System.out.println(list);
			List<String> likes = new ArrayList<>();
			for(PostLike p : list) {
				likes.add(p.getUser().getMail());
			}			
			res = new BaseResponse("success",likes);
		}catch (Exception e) {
			res = new BaseResponse("fail",e.getMessage());
		}
		return res;
	}

	public BaseResponse delete(Long pid, String mail) {
		BaseResponse res = null;
		try {
		
			Post post = postRepository.findById(pid).orElse(null);
			User user = userRepository.findByMail(mail).orElse(null);
			if(user==null || post==null) {
				res = new BaseResponse("fail","user or post is null");
			}else {
				PostLike like = likeRepository.findByPostAndUser(post,user).get(0);
				likeRepository.delete(like);
				res = new BaseResponse("success","좋아요 취소");
			}
		}catch (Exception e) {
			res = new BaseResponse("fail",e.getMessage());
		}
		return res;
	}
}
