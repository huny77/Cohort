package com.cohort.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.cohort.entity.User;
import com.cohort.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	
	/**
     * 회원가입
     */
    @Transactional
    public User save(User user) {
        return userRepository.save(user);
    }
}
