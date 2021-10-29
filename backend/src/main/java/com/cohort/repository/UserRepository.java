package com.cohort.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cohort.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
