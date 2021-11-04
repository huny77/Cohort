package com.cohort.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cohort.dto.PostDto;
import com.cohort.entity.Post;
import com.cohort.entity.PostInfo;
import com.cohort.entity.PostLike;
import com.cohort.entity.User;
import com.cohort.repository.PostInfoRepository;
import com.cohort.repository.PostLikeRepository;
import com.cohort.repository.PostRepository;
import com.cohort.repository.UserRepository;
import com.cohort.request.PostRequest;
import com.cohort.response.BaseResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PostService {

	private final PostRepository postRepository;
	private final PostLikeRepository postLikeRepository;
	private final PostInfoRepository postInfoRepository;
	private final UserRepository userReposiotry;

	public BaseResponse findAll() {
		BaseResponse response = null;
		
		try {
			List<Post> postList = postRepository.findAll();
			List<Integer> likeList = new ArrayList<>();
			List<PostInfo> infoList = new ArrayList<>();
			for (Post p : postList) {
				int count = postLikeRepository.countByPostId(p.getId());
				likeList.add(count);
				PostInfo postInfo = postInfoRepository.findByPostId(p.getId());
				infoList.add(postInfo);
			}
			List<PostDto> list = new ArrayList<PostDto>();
			for (int i = 0; i < postList.size(); i++) {
				list.add(new PostDto(postList.get(i), likeList.get(i), infoList.get(i)));
			}
			response = new BaseResponse("success", list);
		} catch (Exception e) {
			response = new BaseResponse("fail", e.getMessage());
		}

		return response;
	}

	public BaseResponse save(PostRequest request) {
		BaseResponse response = null;
		try {
			User user = userReposiotry.findByMail(request.getMail()).orElse(null);
			PostDto postDto = new PostDto(request, user);
			Post post = postDto.toEntity();
			postRepository.save(post);
			postInfoRepository.save(PostInfo.builder().language(request.getLanguage()).site(request.getSite()).post(post).build());
			response = new BaseResponse("success", "코드 저장");
		} catch (Exception e) {
			response = new BaseResponse("fail", e.getMessage());
		}
		return response;
		
	}

	public BaseResponse remove(Long postId) {
		BaseResponse response = null;
		try {
			postRepository.deleteById(postId);
			response = new BaseResponse("success", "삭제 성공");
		} catch (Exception e) {
			response = new BaseResponse("fail", e.getMessage());
		}
		return response;
	}
}
