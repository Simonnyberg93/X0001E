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
	@Column(nullable = false)
	private String firstname;
	@Column(nullable = false)
	private String lastname;
	@Column(nullable = false, unique = true)
	private String email;
	@Column(nullable = false)
	private String password;
	@Column(nullable = false)
	private String accountRole = "CLIENT";
	
	
	@OneToMany(targetEntity=Role.class, mappedBy="user", fetch=FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<Role> roles;
	
	@OneToMany(targetEntity=Area.class, mappedBy="user", fetch=FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<Area> areasOfInterests;
	
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
	
	
	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	
	

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public Set<Area> getAreasOfInterests() {
		return areasOfInterests;
	}

	public void setAreasOfInterests(Set<Area> areasOfInterests) {
		this.areasOfInterests = areasOfInterests;
	}
	
	

	public String getAccountRole() {
		return accountRole;
	}

	public void setAccountRole(String accountRole) {
		this.accountRole = accountRole;
	}

	@Override
	public String toString() {
		return "UserDTO [userId=" + userId + ", firstname=" + firstname + ", lastname=" + lastname + ", email=" + email
				+ ", password=" + password + ", roles=" + roles + ", areasOfInterests=" + areasOfInterests
				+ ", topicsOfInterests=" + topicsOfInterests + "]";
	}

}
