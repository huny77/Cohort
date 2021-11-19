package com.cohort.entity;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * 
 * 게시글 좋아요 모델 정의
 *
 */
@Entity
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
//Entity 영속성 및 업데이트에 대한 Auditing 정보를 캡처하는 JPA Entity Listener
@EntityListeners(AuditingEntityListener.class)
@Table(
		name="post_like",
		uniqueConstraints={
			@UniqueConstraint(
				columnNames={"user_id","post_id"}
			)
		}
	)
public class PostLike extends BaseEntity {
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn (name = "user_id")
	@OnDelete(action=OnDeleteAction.CASCADE)
    User user;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn (name = "post_id")
	@OnDelete(action=OnDeleteAction.CASCADE)
    Post post;
}
