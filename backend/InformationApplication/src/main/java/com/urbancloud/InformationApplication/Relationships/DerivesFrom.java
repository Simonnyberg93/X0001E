package com.urbancloud.InformationApplication.Relationships;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.urbancloud.InformationApplication.models.Document;

@RelationshipProperties
public class DerivesFrom {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@TargetNode
	@JsonIgnoreProperties({"relatedPermissions", "areas"})
	private final Document document;
	
	public DerivesFrom(Document document) {
		this.document = document;
	}
	
	public Long getId() {
		return id;
	}

	public Document getDocument() {
		return this.document;
	}


}
