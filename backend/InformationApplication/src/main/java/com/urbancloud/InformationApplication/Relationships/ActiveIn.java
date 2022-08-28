package com.urbancloud.InformationApplication.Relationships;


import org.springframework.data.neo4j.core.schema.RelationshipId;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;

import com.urbancloud.InformationApplication.models.Actor;

@RelationshipProperties
public class ActiveIn {
	
	@RelationshipId
	private Long id;
	
	@TargetNode
	private final Actor actor;
	
	public ActiveIn(Actor actor) {
		this.actor = actor;
	}
	

}
