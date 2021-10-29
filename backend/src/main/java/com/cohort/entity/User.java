package com.cohort.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;

@Entity
@Getter
public class User {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column (name = "user_id", nullable = false)
	private Long id;
	
	@Column (name = "mail", nullable = false, length = 45)
	private String mail;
	
	@Column (name = "name", nullable = false, length = 45)
	private String name;
	
	@Column (name = "image", nullable = true, length = 45)
	private String image;
}
