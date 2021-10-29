package com.cohort.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

import lombok.Getter;

@Entity
@Getter
public class User extends BaseEntity {
	
	@Column (name = "mail", nullable = false, length = 45)
	private String mail;
	
	@Column (name = "name", nullable = false, length = 45)
	private String name;
	
	@Column (name = "image", nullable = true, length = 45)
	private String image;
}
