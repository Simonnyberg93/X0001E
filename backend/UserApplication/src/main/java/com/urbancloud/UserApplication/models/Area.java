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
public class Area implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long areaId;

	@Column(nullable = false)
	private String areaName;

	@ManyToOne(targetEntity=UserDTO.class, fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "userId", nullable = false)
	private UserDTO user;
	
	public Area() {
		super();
	} 
	
	public Area(String areaName, UserDTO user) {
		this.areaName = areaName;
		this.user = user;
	}

	public long getAreaId() {
		return areaId;
	}

	public void setAreaId(long areaId) {
		this.areaId = areaId;
	}

	public String getAreaName() {
		return areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	@Override
	public String toString() {
		return "Area [areaId=" + areaId + ", areaName=" + areaName + ", user=" + user.getUserId() + "]";
	}
	
	
}
