package com.cohort.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.util.Assert;

import com.cohort.entity.Comment;
import com.cohort.entity.Post;
import com.cohort.entity.PostInfo;
import com.cohort.entity.User;
import com.cohort.request.PostRequest;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "게시판 코드 Dto")
public class PostDto {
	private Long id;
	private String title;
	private String content;
	private LocalDateTime created;
	private User user;
	private String language;
	private String site;
	private Integer like;
	private List<Comment> comments;
	private Integer totalPages;
	

	/**
	 * Assert.notNull null값이 입력되면 안되는 컬럼들을 위한 안전장치
	 */
	@Builder
	// 코드 저장에 필요한 생성자
	public PostDto(PostRequest request, User user) {
		Assert.notNull(request, "request must not be null");
		Assert.notNull(user, "user must not be null");
		
		this.title = request.getTitle();
		this.content = request.getContent();
		this.language = request.getLanguage();
		this.site = request.getSite();
		this.user = user;
	}
	
	/**
	 * Assert.notNull null값이 입력되면 안되는 컬럼들을 위한 안전장치
	 */
	@Builder
	// 게시글 조회에 필요한 생성자
	public PostDto(Post post, Integer like, PostInfo postInfo, int totalPages) {
		Assert.notNull(post, "post must not be null");
		Assert.notNull(postInfo, "postInfo must not be null");
		
		this.id = post.getId();
		this.title = post.getTitle();
		this.created = post.getCreated();
		this.user = post.getUser();
		this.content = post.getContent();
		this.like = like;
		this.language = postInfo.getLanguage();
		this.site = postInfo.getSite();
		this.totalPages = totalPages;
	}

	/**
	 * Assert.notNull null값이 입력되면 안되는 컬럼들을 위한 안전장치
	 */
	@Builder
	// 게시글 Top5조회에 필요한 생성자
	public PostDto(Post post, Integer like, PostInfo postInfo) {
		Assert.notNull(post, "post must not be null");
		Assert.notNull(postInfo, "postInfo must not be null");
		
		this.id = post.getId();
		this.title = post.getTitle();
		this.created = post.getCreated();
		this.user = post.getUser();
		this.content = post.getContent();
		this.like = like;
		this.language = postInfo.getLanguage();
		this.site = postInfo.getSite();
	}
	
	/**
	 * Assert.notNull null값이 입력되면 안되는 컬럼들을 위한 안전장치
	 */
	@Builder
	// 게시글 상세 조회에 필요한 생성자
	public PostDto(Post post, Integer like, PostInfo postInfo, List<Comment> comments) {
		Assert.notNull(post, "post must not be null");
		Assert.notNull(postInfo, "postInfo must not be null");
		
		this.id = post.getId();
		this.title = post.getTitle();
		this.created = post.getCreated();
		this.user = post.getUser();
		this.content = post.getContent();
		this.like = like;
		this.language = postInfo.getLanguage();
		this.site = postInfo.getSite();
		this.comments = comments;
	}
	
	
	public Post toEntity() {
		return Post.builder()
				.title(this.title)
				.content(this.content)
				.user(this.user)
				.build();
	}





}
