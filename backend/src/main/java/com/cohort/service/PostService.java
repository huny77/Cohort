package com.cohort.service;

import org.springframework.stereotype.Service;

import com.cohort.repository.PostRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {

	private final PostRepository postRepository;
}
