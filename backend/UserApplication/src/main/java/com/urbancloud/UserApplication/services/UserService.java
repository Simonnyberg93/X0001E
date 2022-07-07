package com.urbancloud.UserApplication.services;


import java.util.Set;

import com.urbancloud.UserApplication.exceptions.UserAlreadyExistsException;
import com.urbancloud.UserApplication.exceptions.UserNotFoundException;
import com.urbancloud.UserApplication.models.Topic;
import com.urbancloud.UserApplication.models.UserDTO;
import com.urbancloud.UserApplication.models.UserLoginData;

public interface UserService {

	public UserDTO addUser(UserDTO user) throws UserAlreadyExistsException;
	
	public Set<Topic> fetchUserTopics(String userEmail) throws UserNotFoundException;
	
	public String fetchUserRole(String userEmail) throws UserNotFoundException;
	
	public void updateTopicList(String email, String topicName) throws UserNotFoundException;

	public boolean userLogin(UserLoginData user);
}
