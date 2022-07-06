package com.urbancloud.UserApplication.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Topic {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long topicId;
	@Column(nullable = false)
	private String topicName;
	
	@ManyToOne(targetEntity=UserDTO.class, fetch = FetchType.EAGER)
	private UserDTO user;
	
	public Topic() {
		super();
	}

	public Topic(String topicName) {
		this.topicName = topicName;
	}

	public long getTopicId() {
		return topicId;
	}

	public void setTopicId(long topicId) {
		this.topicId = topicId;
	}

	public String getTopicName() {
		return topicName;
	}

	public void setTopicName(String topicName) {
		this.topicName = topicName;
	}

	@Override
	public String toString() {
		return "Topic [topicId=" + topicId + ", topicName=" + topicName + "]";
	}
	
	
	
}
