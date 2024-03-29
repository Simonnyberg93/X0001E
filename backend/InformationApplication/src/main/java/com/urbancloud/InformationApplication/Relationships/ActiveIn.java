package com.urbancloud.InformationApplication.Relationships;


import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;


import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import com.urbancloud.InformationApplication.models.Area;

@RelationshipProperties
public class ActiveIn {
	
	@Id 
	@GeneratedValue
	private Long id;
	
	@TargetNode
	@JsonIgnoreProperties({"relatedActors", "includes"})
	private final Area area;
	
	public ActiveIn(Area area) {
		this.area = area;
	}
	
	public Area getArea() {
		return this.area;
	}
	
	public Long getId() {
		return this.id;
	}
	


}
