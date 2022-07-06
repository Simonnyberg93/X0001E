package com.urbancloud.UserApplication.controllers;


import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import com.urbancloud.UserApplication.exceptions.TopicNotFoundException;
import com.urbancloud.UserApplication.exceptions.UserAlreadyExistsException;
import com.urbancloud.UserApplication.exceptions.UserNotFoundException;
import com.urbancloud.UserApplication.models.Topic;
import com.urbancloud.UserApplication.models.UserDTO;
import com.urbancloud.UserApplication.models.UserLoginData;
import com.urbancloud.UserApplication.services.TopicService;
import com.urbancloud.UserApplication.services.UserService;


@CrossOrigin
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

	@Autowired
	UserService userService;
	
	@Autowired
	TopicService topicService;
	
	/**
	 * 
	 * @param user The new user to be added to the database.
	 * @return the user entity that has been entered to the database.
	 * @throws UserAlreadyExistsException if the user already exists in the database.
	 */
	@PostMapping("/register")
	public ResponseEntity<?> addNewUser(@RequestBody UserDTO user) throws UserAlreadyExistsException {
		UserDTO newuser = this.userService.addUser(user);
		return new ResponseEntity<UserDTO>(newuser, HttpStatus.OK);
	}
	
	@PostMapping("/{email}/addtopic/{topicname}")
	public ResponseEntity<?> addTopicOfInterest(@PathVariable("email") String email, @PathVariable("topicname") String topicName) throws UserNotFoundException, TopicNotFoundException {
		this.userService.updateTopicList(email, topicName);
		return new ResponseEntity<String>("Success", HttpStatus.OK);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody UserLoginData user) throws UserNotFoundException {
		boolean validUser = userService.userLogin(user);
		if (validUser) {
			String tokenresult = generateToken(user);
			HashMap tokenMap = new HashMap();
			tokenMap.put("token", tokenresult);
			return new ResponseEntity<HashMap>(tokenMap, HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("Invalid Username / Password", HttpStatus.NOT_FOUND);
		}
		
	}
	
	@GetMapping("/topics/{email}")
	public ResponseEntity<?> fetchTopicsOfInterest(@PathVariable("email") String email) throws UserNotFoundException {
		List<Topic> topics = this.userService.fetchUserTopics(email);
		return new ResponseEntity<List<Topic>>(topics, HttpStatus.OK);
	}
	
	@GetMapping("/role/{email}")
	public ResponseEntity<?> fetchUserRole(@PathVariable("email") String email) throws UserNotFoundException {
		String role = this.userService.fetchUserRole(email);
		return new ResponseEntity<String>(role, HttpStatus.OK);
	}
	
	// To get a token for authentication, by logging in with email and password
	private String generateToken(UserLoginData user) {
		long expiry = 10_000_000_00;
		return Jwts.builder().setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + expiry))
				.setSubject(user.getEmail())
				.signWith(SignatureAlgorithm.HS256, "urbancloud").compact();

	}
}