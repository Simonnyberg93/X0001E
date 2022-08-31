package com.urbancloud.InformationApplication.Relationships;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.urbancloud.InformationApplication.models.Actor;

@RelationshipProperties
public class LicensedBy {

	@Id
	@GeneratedValue
	private Long id;
	
	@TargetNode
	@JsonIgnoreProperties({"permissions", "relatedActorsInc", "relatedActorsOut", "relatedAreas"})
	private final Actor actor;
	
	public LicensedBy(Actor actor) {
		this.actor = actor;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Actor getActor() {
		return actor;
	}
	
	
}
