package com.cohort.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post extends BaseEntity {

	
	@Column (name = "title", nullable = false, length = 45)
	private String title;
	
	@Column (name = "content", nullable = true)
	private String content;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column (name = "created", updatable = true)
	private Date created;
	
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn (name = "user_id")
    private User user;
	
	@OneToOne(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
	PostInfo postInfo;
	
	@PrePersist
	public void onCreate() {
		this.created = new Date();
	}

}
