package com.cohort.service;

import org.springframework.stereotype.Service;

import com.cohort.repository.CommentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {

	private final CommentRepository commentRepository;
}
