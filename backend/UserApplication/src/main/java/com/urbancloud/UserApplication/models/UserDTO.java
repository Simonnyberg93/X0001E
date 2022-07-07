package com.urbancloud.UserApplication.models;


import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
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
	
	@OneToMany(targetEntity=Topic.class, mappedBy="user", fetch=FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<Topic> topicsOfInterests;
	
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

	public Set<Topic> getTopicsOfInterests() {
		return topicsOfInterests;
	}
	
	public void addTopicsOfInterests(Topic t) {
		if (this.getTopicsOfInterests() == null) {
			Set<Topic> topics = new HashSet<Topic>();
			topics.add(t);
			this.setTopicsOfInterests(topics);
		} else {
			this.topicsOfInterests.add(t);
		}
	}

	public void setTopicsOfInterests(Set<Topic> topicsOfInterests) {
		this.topicsOfInterests = topicsOfInterests;
	}

	@Override
	public String toString() {
		return "UserDTO [userId=" + userId + ", email=" + email + ", password=" + password + ", role=" + role
				+ ", topicsOfInterests=" + topicsOfInterests + "]";
	}
	
	
}
