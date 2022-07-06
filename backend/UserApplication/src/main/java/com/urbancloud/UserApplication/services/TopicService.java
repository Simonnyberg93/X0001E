package com.urbancloud.UserApplication.services;

import com.urbancloud.UserApplication.exceptions.TopicAlreadyExistsException;
import com.urbancloud.UserApplication.models.Topic;

public interface TopicService {

	Topic addTopic(String topicName) throws TopicAlreadyExistsException;

}
