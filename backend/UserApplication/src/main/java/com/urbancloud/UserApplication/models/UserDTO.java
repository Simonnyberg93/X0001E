package com.urbancloud.UserApplication.models;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class UserDTO {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long userId;
	@Column(nullable = false, unique = true)
	private String email;
	@Column(nullable = false)
	private String password;
	private String role;
	
	@OneToMany(targetEntity=Topic.class, mappedBy="topicName", fetch=FetchType.EAGER)
	private List<Topic> topicsOfInterests = new ArrayList<Topic>();
	
	public UserDTO() { 
		super();
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public List<Topic> getTopicsOfInterests() {
		return topicsOfInterests;
	}
	
	public void addTopicsOfInterests(Topic t) {
		if (this.getTopicsOfInterests() == null) {
			List<Topic> topics = Arrays.asList(t);
			this.setTopicsOfInterests(topics);
		} else {
			this.topicsOfInterests.add(t);
		}
	}

	public void setTopicsOfInterests(List<Topic> topicsOfInterests) {
		this.topicsOfInterests = topicsOfInterests;
	}
}
