package com.urbancloud.UserApplication.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.urbancloud.UserApplication.exceptions.TopicAlreadyExistsException;
import com.urbancloud.UserApplication.models.Topic;
import com.urbancloud.UserApplication.repositories.TopicRepository;

@Service
public class TopicServiceImpl implements TopicService{
	
	@Autowired
	TopicRepository topicRepo;

	@Override
	public Topic addTopic(String topicName) throws TopicAlreadyExistsException {
		Optional<Topic> opttopic = this.topicRepo.findByTopicName(topicName);
		if (opttopic.isPresent()) {
			throw new TopicAlreadyExistsException();
		}
		return this.topicRepo.save(new Topic(topicName));
	}

}
