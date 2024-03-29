package com.urbancloud.UserApplication.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Role implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long roleId;

	@Column(nullable = false)
	private String roleName;

	@ManyToOne(targetEntity=UserDTO.class, fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "userId", nullable = false)
	private UserDTO user;
	
	public Role() {
		super();
	}
	
	public Role(String roleName, UserDTO user) {
		this.roleName = roleName;
		this.user = user;
	}

	public long getRoleId() {
		return roleId;
	}

	public void setRoleId(long roleId) {
		this.roleId = roleId;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	@Override
	public String toString() {
		return "Role [roleId=" + roleId + ", roleName=" + roleName + ", user=" + user.getUserId() + "]";
	}
	
	
}
