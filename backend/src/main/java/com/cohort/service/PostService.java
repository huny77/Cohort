package com.cohort.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.hibernate.criterion.Distinct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.event.TransactionalEventListener;

import com.cohort.dto.PostDto;
import com.cohort.entity.Comment;
import com.cohort.entity.Post;
import com.cohort.entity.PostInfo;
import com.cohort.entity.PostLike;
import com.cohort.entity.User;
import com.cohort.repository.PostInfoRepository;
import com.cohort.repository.CommentRepository;
import com.cohort.repository.LikeRepository;
import com.cohort.repository.PostRepository;
import com.cohort.repository.UserRepository;
import com.cohort.request.PostRequest;
import com.cohort.response.BaseResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {

	private final PostRepository postRepository;
	private final LikeRepository postLikeRepository;
	private final PostInfoRepository postInfoRepository;
	private final UserRepository userReposiotry;
	private final CommentRepository commentRepository;

	@Transactional
	public BaseResponse findAll(Integer page) {
		BaseResponse response = null;
		
		if (page > 0) --page;
		int size = 0;
		try {
			int totalPost = (int)postRepository.count();
			
			if (totalPost < 10) {
				size = totalPost;
			} else {
				size = 10;
			}
			
			Page<Post> posts = postRepository.findAll(PageRequest.of(page, size));
			int totalPages = posts.getTotalPages();
			List<Integer> likeList = new ArrayList<>();
			List<PostInfo> infoList = new ArrayList<>();
			for (Post p : posts) {
				int count = postLikeRepository.countByPostId(p.getId());
				likeList.add(count);
				PostInfo postInfo = postInfoRepository.findByPostId(p.getId());
				infoList.add(postInfo);
			}
			List<PostDto> list = new ArrayList<PostDto>();
			for (int i = 0; i < posts.getSize(); i++) {
				list.add(new PostDto(posts.getContent().get(i), likeList.get(i), infoList.get(i), totalPages));
			}
			response = new BaseResponse("success", list);
		} catch (Exception e) {
			response = new BaseResponse("fail", e.getMessage());
		}

		return response;
	}

	@Transactional
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

	@Transactional
	public BaseResponse remove(Long postId) {
		BaseResponse response = null;
		try {
			Post post = postRepository.findById(postId).orElse(null);
			PostInfo postInfo = postInfoRepository.findByPostId(postId);
			if(post == null) {
				response = new BaseResponse("fail", "존재하지 않는 게시글번호");
			}
			else {
				List<Comment> comments = commentRepository.findAllByPost(post);
				List<PostLike> likes = postLikeRepository.findAllByPost(post);
				postInfoRepository.deleteById(postInfo.getId());
				for (PostLike postLike : likes) {
					postLikeRepository.deleteById(postLike.getId());
				}
				for (Comment comment : comments) {
					commentRepository.deleteById(comment.getId());
				}
				System.out.println("postId:"+postId);
				postRepository.deleteById(postId);
				response = new BaseResponse("success", "삭제 성공");
			}
		} catch (Exception e) {
			response = new BaseResponse("fail", e.getMessage());
		}
		return response;
	}

	@Transactional
	public BaseResponse showDetail(Long postId) {
		BaseResponse response = null;
		try {
			Post post = postRepository.findById(postId).orElse(null);
			List<Comment> comments = commentRepository.findAllByPost(post);
			if (post == null) {
				response = new BaseResponse("fail", "존재하지 않는 게시글 Id입니다.");
			} else {
				int count = postLikeRepository.countByPostId(postId);
				PostInfo postInfo = postInfoRepository.findByPostId(postId);
				PostDto postDto = new PostDto(post, count, postInfo, comments);
				response = new BaseResponse("success", postDto);
			}
		} catch (Exception e) {
			response = new BaseResponse("fail", e.getMessage());
		}
		return response;
	}

	public BaseResponse showPostTop5() {
		BaseResponse response = null;
		
		try {
			List<Post> posts = postRepository.findAll();
			HashMap<Long, Integer> map = new HashMap<Long, Integer>();
			for (Post post : posts) {
				int likes = postLikeRepository.countByPostId(post.getId());
				map.put(post.getId(), likes);
			}
			List<Long> keySetList = new ArrayList(map.keySet());
			Collections.sort(keySetList, (o1, o2) -> (map.get(o2).compareTo(map.get(o1))));
			
			List<PostDto> postDtos = new ArrayList<>();
			for (int i = 0; i < 5; i++) {
				Long postId = keySetList.get(i);
				Post post = postRepository.findById(postId).orElse(null);
				PostInfo postInfo = postInfoRepository.findByPostId(postId);
				postDtos.add(new PostDto(post, map.get(keySetList.get(i)), postInfo));
			}
			
			response = new BaseResponse("success", postDtos);
		} catch (Exception e) {
			response = new BaseResponse("fail", e.getMessage());
		}
		
		return response;
	}
}
