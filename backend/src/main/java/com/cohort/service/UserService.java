package com.cohort.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import com.cohort.entity.Post;
import com.cohort.entity.User;
import com.cohort.repository.PostRepository;
import com.cohort.repository.UserRepository;
import com.cohort.request.UserRequest;
import com.cohort.response.BaseResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	@Autowired
	UserRepository userRepository;
	@Autowired
	PostRepository postRepository;
	@Autowired
	PostService postService;
	
	
	/**
	 * 로그인
	 */
	public BaseResponse<User> login(UserRequest request) {
		String mail = request.getMail();
		String name = request.getName();
		System.out.println(":::: 로그인시도 : "+mail+" | "+name+"   ::::");		
		User user;	
		try{
			System.out.println(":::::  접속한 계정의 정보가 DB에 있는지 확인합니다.  ::::");
			user = userRepository.findByMail(mail).orElse(null);			
            if(user==null) {
            	System.out.println("::::  저장된 계정의 정보가 없습니다. 회원 정보를  DB에 저장합니다.	::::");
            	user = userRepository.save(User.builder().mail(request.getMail()).name(request.getName()).image(request.getImage()).build());  	
            }
            else {
            	System.out.println("DB에 등록된 유저입니다. 등록하지 않고 로그인을 진행합니다.");            	
        		System.out.println(mail+" 의 "+" google닉네임 : "+name+" / DB에 저장된 닉네임 : "+user.getName());	
            }
        }catch(Exception e){        	
            return new BaseResponse<User>("fail",null);
        }
		System.out.println("로그인 성공 : "+mail+" 의 "+" google닉네임 : "+name+" / DB에 저장된 닉네임 : "+user.getName());	
		return new BaseResponse<User>("success",user);
	}
	@Transactional
	public BaseResponse<Object> delete(String mail) {
		User user = userRepository.findByMail(mail).orElse(null);
		if(user==null) {
			return new BaseResponse<Object>("fail","일치하는 이메일이 없다.");
		}
		else {
			List<Post> post = postRepository.findAllByUser(user);
			for(Post p : post) {
				postService.remove(p.getId());
			}
			userRepository.deleteById(user.getId());
			return new BaseResponse<Object>("success","회원삭제성공");
		}
	}
	@Transactional
	public BaseResponse<User> update(UserRequest request) {
		try {
			User user = userRepository.findByMail(request.getMail()).orElse(null);
			if(user!=null) {
				user.setName(request.getName());
				user.setImage(request.getImage());
				userRepository.save(user);
				return new BaseResponse<User>("success",user);
			}
			else {
				return new BaseResponse<User>("해당하는 이메일이없어",null);
			}
		}catch (Exception e) {
			System.out.println(e);
			return new BaseResponse<User>("fail",null);
		}
	}
	public BaseResponse<User> find(String mail) {
		try {
			User user = userRepository.findByMail(mail).orElse(null);
			if(user!=null) {
				return new BaseResponse<User>("success",user);
			}
			else {
				return new BaseResponse<User>("해당하는 이메일이없어",null);
			}
		}catch (Exception e) {
			System.out.println(e);
			return new BaseResponse<User>("fail",null);
		}
	}
}
