package com.urbancloud.InformationApplication.models;

import java.util.List;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Node
public class Permission {
	
	@Id
	@GeneratedValue
	private Long id;
	private String title;
	private String description;
					  
	@Relationship(type="LICENSED_BY")
	@JsonIgnoreProperties("permissions")
	private Actor licensedByActor;

	@Relationship(type="DERIVES_FROM")
	@JsonIgnoreProperties("relatedPermissions")
	private List<Document> laws;
	
	public Permission() { }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Actor getLicensedByActor() {
		return licensedByActor;
	}

	public void setLicensedByActor(Actor licensedByActor) {
		this.licensedByActor = licensedByActor;
	}

	public List<Document> getLaws() {
		return laws;
	}

	public void setLaws(List<Document> laws) {
		this.laws = laws;
	}
	
}
