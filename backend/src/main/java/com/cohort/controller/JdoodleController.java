package com.cohort.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cohort.entity.User;
import com.cohort.request.UserRequest;
import com.cohort.response.BaseResponse;
import com.cohort.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * 컴파일러 API 요청 처리를 위한 컨트롤러 정의.
 */
@CrossOrigin("*")
@Api(value = "컴파일러 API", tags = { "jdoodle" })
@RestController
@RequestMapping("/app/jdoodle")
public class JdoodleController {

	/**
	 * JDoole API [POST] /app/jdoodle/
	 * 
	 * @return BaseResponse
	 */
	// Body
	@GetMapping()
	@ApiOperation(value = "컴파일요청", notes = "컴파일요청", response = BaseResponse.class)
//	public BaseResponse excuteJdoodle(@RequestBody @ApiParam(value="컴파일 요청 정보", required = true) String script) {
	public BaseResponse excuteJdoodle() {
		String clientId = "bcab261f806f12bd1d85ee8dff759a41"; // Replace with your client ID
		String clientSecret = "9c8bddaae2f1659b8a4e3c5042e46376ce772348e24711b7b4c02113c65aa893"; // Replace with your
																									// client Secret
		String language = "php";
		String versionIndex = "0";
		String script = "<?php echo \\\"hello\\\"; ?>";
		StringBuilder sb = new StringBuilder();
		try {
			URL url = new URL("https://api.jdoodle.com/v1/execute");
			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			connection.setDoOutput(true);
			connection.setRequestMethod("POST");
			connection.setRequestProperty("Content-Type", "application/json");
			String input = "{\"clientId\": \"" + clientId + "\",\"clientSecret\":\"" + clientSecret + "\",\"script\":\""
					+ script + "\",\"language\":\"" + language + "\",\"versionIndex\":\"" + versionIndex + "\"} ";
			System.out.println(input);
			OutputStream outputStream = connection.getOutputStream();
			outputStream.write(input.getBytes());
			outputStream.flush();
			System.out.println("outputStream :" + outputStream);
			if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
				throw new RuntimeException(
						"Please check your inputs : HTTP error code : " + connection.getResponseCode());
			}
			BufferedReader bufferedReader;
			bufferedReader = new BufferedReader(new InputStreamReader((connection.getInputStream())));
			String output;
			System.out.println("Output from JDoodle .... \n");
			while ((output = bufferedReader.readLine()) != null) {
				sb.append(output + System.getProperty("line.separator"));
				System.out.println(output);
			}
			connection.disconnect();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new BaseResponse("success", sb.toString());
	}

}
