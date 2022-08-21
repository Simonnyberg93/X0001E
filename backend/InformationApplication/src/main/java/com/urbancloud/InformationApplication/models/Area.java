package com.urbancloud.InformationApplication.models;

import java.util.List;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Node
public class Area {

	@Id
	@GeneratedValue
	private Long id;
	private String title;
	private String description;
	private String siteUrl;
	
	@Relationship(type="ACTIVE_IN", direction = Relationship.Direction.OUTGOING)
	@JsonIgnoreProperties("relatedAreas")
	private List<Actor> relatedActors;
	
	@Relationship(type="INCLUDES")
	@JsonIgnoreProperties("areas")
	private List<Document> includes;
	
	@Relationship(type="RELATES_TO", direction = Relationship.Direction.INCOMING)
	@JsonIgnoreProperties("relatedAreas")
	private List<Permission> relatedPermissions;
	
	
	public Area()  { }

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

	public String getSiteUrl() {
		return siteUrl;
	}

	public void setSiteUrl(String siteUrl) {
		this.siteUrl = siteUrl;
	}

	public List<Actor> getRelatedActors() {
		return relatedActors;
	}

	public void setRelatedActors(List<Actor> relatedActors) {
		this.relatedActors = relatedActors;
	}

	public List<Document> getIncludes() {
		return includes;
	}

	public void setIncludes(List<Document> includes) {
		this.includes = includes;
	}

	public List<Permission> getRelatedPermissions() {
		return relatedPermissions;
	}

	public void setRelatedPermissions(List<Permission> relatedPermissions) {
		this.relatedPermissions = relatedPermissions;
	}

	
	
}
