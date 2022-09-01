package com.urbancloud.InformationApplication.Relationships;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.urbancloud.InformationApplication.models.Actor;


@RelationshipProperties
public class RelatedTo {

	@Id 
	@GeneratedValue
	private Long id;
	
	@TargetNode
	@JsonIgnoreProperties({"relatedAreas", "includes", "permissions", "relatedActorsOut"})
	private final Actor actor;
	
	public RelatedTo(Actor actor) {
		this.actor = actor;
	}
	
	public Actor getActor() {
		return this.actor;
	}
	
	public Long getId() {
		return this.id;
	}
	
	public String tooString(String actorTitle) {
		return String.format("(%s)-[:%s]->(%s)", actorTitle, "RELATED_TO", this.actor.getTitle());
	}
}
