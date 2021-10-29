package com.cohort.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;

@Entity
@Getter
public class Post {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column (name = "post_id", nullable = false)
	private Long id;
	
	@Column (name = "title", nullable = false, length = 45)
	private String title;
	
	@Column (name = "content", nullable = false, length = 45)
	private String content;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column (name = "created", updatable = true)
	private Date created;
	
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn (name = "user_id")
    private User user;
	
	@PrePersist
	public void onCreate() {
		this.created = new Date();
	}
}
