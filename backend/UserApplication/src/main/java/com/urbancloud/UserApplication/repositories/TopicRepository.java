package com.urbancloud.UserApplication.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.urbancloud.UserApplication.models.Topic;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {

	Optional<Topic> findByTopicName(String topicName);


}
