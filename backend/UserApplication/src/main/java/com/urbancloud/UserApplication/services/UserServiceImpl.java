package com.urbancloud.UserApplication.services;


import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	public Set<Topic> fetchUserTopics(String userEmail) throws UserNotFoundException {
		Optional<UserDTO> optuser = this.userRepo.findByEmail(userEmail);
		if (optuser.isEmpty()) {
			throw new UserNotFoundException();
		}
		Set<Topic> topics = this.topicRepo.findByUser(optuser.get());
		return topics;
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
	public void updateTopicList(String email, String topicName) throws UserNotFoundException {
		Optional<UserDTO> optuser = this.userRepo.findByEmail(email);
		if (optuser.isEmpty()) {
			throw new UserNotFoundException();
		}
		UserDTO userObj = optuser.get();
		// check if topic is already set
		for (Topic t : userObj.getTopicsOfInterests()) {
			if (t.getTopicName().equalsIgnoreCase(topicName)) {
				// topic is already set, do nothing
				return;
			}
		}
		this.topicRepo.save(new Topic(topicName, userObj));
	}



}
