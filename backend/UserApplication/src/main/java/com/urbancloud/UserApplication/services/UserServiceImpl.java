package com.urbancloud.UserApplication.services;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.urbancloud.UserApplication.exceptions.TopicNotFoundException;
import com.urbancloud.UserApplication.exceptions.UserAlreadyExistsException;
import com.urbancloud.UserApplication.exceptions.UserNotFoundException;
import com.urbancloud.UserApplication.models.Topic;
import com.urbancloud.UserApplication.models.UserDTO;
import com.urbancloud.UserApplication.models.UserLoginData;
import com.urbancloud.UserApplication.repositories.TopicRepository;
import com.urbancloud.UserApplication.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	TopicRepository topicRepo;

	@Override
	public UserDTO addUser(UserDTO user) throws UserAlreadyExistsException {
		try {
			UserDTO result = this.userRepo.save(user);
			return result;
		} catch (Exception e) {
			throw new UserAlreadyExistsException();
		}
	}

	@Override
	public boolean userLogin(UserLoginData user) {
		Optional<UserDTO> optuser = this.userRepo.findByEmailAndPassword(user.getEmail(), user.getPassword());
		if (optuser.isPresent()) {
			return true;
		}
		return false;
	}

	@Override
	public List<Topic> fetchUserTopics(String userEmail) throws UserNotFoundException {
		Optional<UserDTO> optuser = this.userRepo.findByEmail(userEmail);
		if (optuser.isEmpty()) {
			throw new UserNotFoundException();
		}
		System.out.println("Topics: " + optuser.get().getTopicsOfInterests());
		return optuser.get().getTopicsOfInterests();
	}

	@Override
	public String fetchUserRole(String userEmail) throws UserNotFoundException {
		Optional<UserDTO> optuser = this.userRepo.findByEmail(userEmail);
		if (optuser.isEmpty()) {
			throw new UserNotFoundException();
		}
		return optuser.get().getRole();
	}

	@Override
	public void updateTopicList(String email, String topicName) throws UserNotFoundException, TopicNotFoundException {
		Optional<UserDTO> optuser = this.userRepo.findByEmail(email);
		Optional<Topic> opttopic = this.topicRepo.findByTopicName(topicName);
		if (optuser.isEmpty()) {
			throw new UserNotFoundException();
		}
		if( opttopic.isEmpty()) {
			throw new TopicNotFoundException();
		}
		UserDTO userObj = optuser.get();
		Topic topicObj = opttopic.get();
		userObj.addTopicsOfInterests(topicObj);
		System.out.println("Helloworld : " + userObj.getTopicsOfInterests());
		this.userRepo.save(userObj);
	}



}
