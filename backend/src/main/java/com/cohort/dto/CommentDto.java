package com.cohort.dto;

import java.time.LocalDateTime;

import org.springframework.util.Assert;

import com.cohort.entity.Comment;
import com.cohort.entity.Post;
import com.cohort.entity.User;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "게시판 코드 댓글 Dto")
public class CommentDto {
	private Long id;
	private String content;
	private LocalDateTime created;
	private User user;
	
	@Builder
	public CommentDto(Comment c, User user) {
		Assert.notNull(c, "comment must not be null");
		Assert.notNull(user, "user must not be null");
		
		this.id = c.getId();
		this.content = c.getContent();
		this.created = c.getCreated();
		this.user = user;
	}
	
	public Comment toEntity() {
		return Comment.builder()
				.content(this.content)
				.user(this.user)
				.build();
	}
}
