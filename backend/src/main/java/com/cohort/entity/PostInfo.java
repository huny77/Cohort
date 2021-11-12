package com.cohort.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostInfo extends BaseEntity {
	
	@Column (name = "language", nullable = false, length = 45)
	private String language;
	
	@Column (name = "site", nullable = false, length = 45)
	private String site;
	
	@JsonBackReference
//	@OnDelete(action=OnDeleteAction.CASCADE)
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn (name = "post_id")
	private Post post;
}
