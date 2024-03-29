package com.urbancloud.UserApplication.repositories;

import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.urbancloud.UserApplication.models.Topic;
import com.urbancloud.UserApplication.models.UserDTO;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {

	Topic findByTopicName(String topicName);

	Set<Topic> findByUser(UserDTO user);
	
	@Transactional
	void deleteAllByUser(UserDTO user);

}
