package com.cohort.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cohort.entity.User;
import com.cohort.repository.UserRepository;
import com.cohort.request.UserRequest;
import com.cohort.response.BaseResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	@Autowired
	UserRepository userRepository;
	
	/**
	 * 로그인
	 */
	public BaseResponse<Object> login(UserRequest request) {
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
            return new BaseResponse<Object>("fail",e.getMessage());
        }
		System.out.println("로그인 성공 : "+mail+" 의 "+" google닉네임 : "+name+" / DB에 저장된 닉네임 : "+user.getName());	
		return new BaseResponse<Object>("success",user);
	}
}