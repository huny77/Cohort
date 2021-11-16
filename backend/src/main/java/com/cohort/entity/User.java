package com.cohort.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * 구글유저 모델 정의.
 */
@Entity
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {	
	@Column (name = "mail", nullable = false)
	String mail;	
	@Column (name = "name", nullable = false)
	String name;	
	@Column (name = "image", nullable = true)
	String image;
}
