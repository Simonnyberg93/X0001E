package com.urbancloud.InformationApplication.Relationships;

import java.util.List;

import org.springframework.data.neo4j.core.schema.RelationshipId;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;

import com.urbancloud.InformationApplication.models.Actor;

@RelationshipProperties
public class ActiveIn {
	
	@RelationshipId
	private Long id;
	
	private final List<String> activeIn;
	
	@TargetNode
	private final Actor actor;
	
	public ActiveIn(Actor actor, List<String> activeIn) {
		this.actor = actor;
		this.activeIn = activeIn;
	}
	
	public List<String> getActiveIn(){
		return activeIn;
	}

}
