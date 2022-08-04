package com.urbancloud.UserApplication.controllers;


import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

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

import com.urbancloud.UserApplication.exceptions.UserAlreadyExistsException;
import com.urbancloud.UserApplication.exceptions.UserNotFoundException;
import com.urbancloud.UserApplication.models.Area;
import com.urbancloud.UserApplication.models.Role;
import com.urbancloud.UserApplication.models.Topic;
import com.urbancloud.UserApplication.models.UserDTO;
import com.urbancloud.UserApplication.models.UserLoginData;
import com.urbancloud.UserApplication.services.UserService;


@CrossOrigin
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

	@Autowired
	UserService userService;
	
	/**
	 * 
	 * @param user The new user to be added to the database.
	 * @return the user entity that has been entered to the database.
	 * @throws UserAlreadyExistsException if the user already exists in the database.
	 */
	@PostMapping("/register")
	public ResponseEntity<?> addNewUser(@RequestBody UserDTO user) throws UserAlreadyExistsException {
		user.setAccountRole("CLIENT");
		UserDTO newuser = this.userService.addUser(user);
		return new ResponseEntity<UserDTO>(newuser, HttpStatus.OK);
	}
	
	@PostMapping("/topic/addtopic/{email}")
	public ResponseEntity<?> addTopicOfInterest(@PathVariable("email") String email, @RequestBody List<String> topicNames) throws UserNotFoundException {
		this.userService.updateTopicList(email, topicNames);
		return new ResponseEntity<String>("Success", HttpStatus.OK);
	}
	
	@PostMapping("/role/addrole/{email}")
	public ResponseEntity<?> addRole(@PathVariable("email") String email, @RequestBody List<String> roleNames) throws UserNotFoundException {
		this.userService.updateRoleList(email, roleNames);
		return new ResponseEntity<String>("Success", HttpStatus.OK);
	}
	
	@PostMapping("/area/addarea/{email}")
	public ResponseEntity<?> addAreaOfInterest(@PathVariable("email") String email, @RequestBody List<String> areaNames) throws UserNotFoundException {
		this.userService.updateAreaList(email, areaNames);
		return new ResponseEntity<String>("Success", HttpStatus.OK);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody UserLoginData user) throws UserNotFoundException {
		boolean validUser = userService.userLogin(user);
		if (validUser) {
			String tokenresult = generateToken(user);
			HashMap<String, String> tokenMap = new HashMap<String, String>();
			tokenMap.put("token", tokenresult);
			return new ResponseEntity<HashMap<String, String>>(tokenMap, HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("Invalid Username / Password", HttpStatus.NOT_FOUND);
		}
		
	}
	
	@GetMapping("/topics/fetch/{email}")
	public ResponseEntity<?> fetchTopicsOfInterest(@PathVariable("email") String email) throws UserNotFoundException {
		Set<Topic> topics = this.userService.fetchUserTopics(email);
		return new ResponseEntity<Set<Topic>>(topics, HttpStatus.OK);
	}
	
	@GetMapping("/role/fetch/{email}")
	public ResponseEntity<?> fetchUserRole(@PathVariable("email") String email) throws UserNotFoundException {
		Set<Role> roles = this.userService.fetchUserRoles(email);
		return new ResponseEntity<Set<Role>>(roles, HttpStatus.OK);
	}
	
	@GetMapping("/area/fetch/{email}")
	public ResponseEntity<?> fetchUserArea(@PathVariable("email") String email) throws UserNotFoundException {
		Set<Area> areas = this.userService.fetchUserAreas(email);
		return new ResponseEntity<Set<Area>>(areas, HttpStatus.OK);
	}
	
	@GetMapping("/getuser/{email}")
	public ResponseEntity<?> fetchUserDTO(@PathVariable("email") String email) throws UserNotFoundException {
		UserDTO user = this.userService.fetchUser(email);
		return new ResponseEntity<UserDTO>(user, HttpStatus.OK);
	}
	// To get a token for authentication, by logging in with email and password
	private String generateToken(UserLoginData user) throws UserNotFoundException {
		UserDTO userObj = this.userService.fetchUser(user.getEmail());
		long expiry = 10_000_000;
		return Jwts.builder().setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + expiry))
				.setSubject(userObj.getEmail())
				.signWith(SignatureAlgorithm.HS256, "urbancloud").claim("role", userObj.getAccountRole()).compact();

	}
}