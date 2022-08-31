package com.urbancloud.InformationApplication.Relationships;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.urbancloud.InformationApplication.models.Area;


@RelationshipProperties
public class Includes {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@TargetNode
	@JsonIgnoreProperties({"includes", "relatedActors"})
	private final Area area;

	public Includes(Area area) {
		super();
		this.area = area;
	}

	public Long getId() {
		return id;
	}

	public Area getArea() {
		return area;
	}
	
	

}
