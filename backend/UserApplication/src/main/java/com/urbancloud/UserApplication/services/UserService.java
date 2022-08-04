package com.urbancloud.UserApplication.services;


import java.util.List;
import java.util.Set;

import com.urbancloud.UserApplication.exceptions.UserAlreadyExistsException;
import com.urbancloud.UserApplication.exceptions.UserNotFoundException;
import com.urbancloud.UserApplication.models.Role;
import com.urbancloud.UserApplication.models.Area;
import com.urbancloud.UserApplication.models.Topic;
import com.urbancloud.UserApplication.models.UserDTO;
import com.urbancloud.UserApplication.models.UserLoginData;

public interface UserService {

	public UserDTO addUser(UserDTO user) throws UserAlreadyExistsException;
	
	public Set<Topic> fetchUserTopics(String userEmail) throws UserNotFoundException;
	
	public Set<Role> fetchUserRoles(String userEmail) throws UserNotFoundException;
	
	public Set<Area> fetchUserAreas(String email) throws UserNotFoundException;
	
	public UserDTO fetchUser(String email) throws UserNotFoundException;

	public boolean userLogin(UserLoginData user);
	
	public void updateTopicList(String email, List<String> topicNames) throws UserNotFoundException;

	public void updateRoleList(String email, List<String> roleNames) throws UserNotFoundException;

	public void updateAreaList(String email, List<String> areaNames) throws UserNotFoundException;

}
