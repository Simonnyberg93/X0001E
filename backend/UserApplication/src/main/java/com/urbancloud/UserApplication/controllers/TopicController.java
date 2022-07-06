package com.urbancloud.UserApplication.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.urbancloud.UserApplication.exceptions.TopicAlreadyExistsException;
import com.urbancloud.UserApplication.models.Topic;
import com.urbancloud.UserApplication.services.TopicService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/topics")
public class TopicController {
	
	@Autowired
	TopicService topicService;

	@PostMapping("addtopic")
	public ResponseEntity<?> addNewTopic(@RequestBody String topic) throws TopicAlreadyExistsException{
		Topic result = this.topicService.addTopic(topic);
		return new ResponseEntity<Topic>(result, HttpStatus.OK);
	}
}
