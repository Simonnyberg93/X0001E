package com.urbancloud.UserApplication.services;


import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.urbancloud.UserApplication.exceptions.UserAlreadyExistsException;
import com.urbancloud.UserApplication.exceptions.UserNotFoundException;
import com.urbancloud.UserApplication.models.Area;
import com.urbancloud.UserApplication.models.Role;
import com.urbancloud.UserApplication.models.Topic;
import com.urbancloud.UserApplication.models.UserDTO;
import com.urbancloud.UserApplication.models.UserLoginData;
import com.urbancloud.UserApplication.repositories.AreaRepository;
import com.urbancloud.UserApplication.repositories.RoleRepository;
import com.urbancloud.UserApplication.repositories.TopicRepository;
import com.urbancloud.UserApplication.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	TopicRepository topicRepo;
	
	@Autowired
	RoleRepository roleRepo;
	
	@Autowired
	AreaRepository areaRepo;

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
		UserDTO _user = this.userRepo.findByEmailAndPassword(user.getEmail(), user.getPassword());
		if (_user != null) {
			return true;
		}
		return false;
	}

	@Override
	public Set<Topic> fetchUserTopics(String userEmail) throws UserNotFoundException {
		UserDTO user = this.userRepo.findByEmail(userEmail);
		if (user == null) {
			throw new UserNotFoundException();
		}
		Set<Topic> topics = this.topicRepo.findByUser(user);
		return topics;
	}

	@Override
	public Set<Role> fetchUserRoles(String userEmail) throws UserNotFoundException {
		UserDTO optuser = this.userRepo.findByEmail(userEmail);
		if (optuser == null) {
			throw new UserNotFoundException();
		}
		return optuser.getRoles();
	}
	
	@Override
	public Set<Area> fetchUserAreas(String userEmail) throws UserNotFoundException {
		UserDTO user = this.userRepo.findByEmail(userEmail);
		if (user == null) {
			throw new UserNotFoundException();
		}
		return user.getAreasOfInterests();
	}

	@Override
	public void updateTopicList(String email, List<String> topicNames) throws UserNotFoundException {
		UserDTO user = this.userRepo.findByEmail(email);
		if (user == null) {
			throw new UserNotFoundException();
		}
		this.topicRepo.deleteAllByUser(user);
		List<Topic> list = new ArrayList<Topic>();
		for(String topicName : topicNames) {
			list.add(new Topic(topicName, user));
		}
		this.topicRepo.saveAll(list);

	}
	
	@Override
	public void updateRoleList(String email, List<String> roleNames) throws UserNotFoundException {
		UserDTO user = this.userRepo.findByEmail(email);
		if (user == null) {
			throw new UserNotFoundException();
		}
		this.roleRepo.deleteAllByUser(user);
		List<Role> list = new ArrayList<Role>();
		for(String roleName : roleNames) {
			list.add(new Role(roleName, user));
		}
		this.roleRepo.saveAll(list);
	}
	
	@Override
	public void updateAreaList(String email, List<String> areaNames) throws UserNotFoundException {
		UserDTO user = this.userRepo.findByEmail(email);
		if (user == null) {
			throw new UserNotFoundException();
		}
		this.areaRepo.deleteAllByUser(user);
		List<Area> list = new ArrayList<Area>();
		for(String areaName: areaNames) {
			list.add(new Area(areaName, user));
		}
		this.areaRepo.saveAll(list);
	}

	@Override
	public UserDTO fetchUser(String email) throws UserNotFoundException {
		UserDTO user = this.userRepo.findByEmail(email);
		if (user == null) {
			throw new UserNotFoundException();
		}
		Set<Topic> s = user.getTopicsOfInterests();
		return user;
	}



}
