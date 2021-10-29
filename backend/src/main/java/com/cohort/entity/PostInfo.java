package com.cohort.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;

@Entity
@Getter
public class PostInfo {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column (name = "post_info_id", nullable = false)
	private Long id;
	
	@Column (name = "language", nullable = false, length = 45)
	private String language;
	
	@Column (name = "site", nullable = false, length = 45)
	private String site;
	
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn (name = "post_id")
	private Post post;
}
