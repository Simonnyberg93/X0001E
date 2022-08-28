package com.urbancloud.InformationApplication.models;

import java.util.List;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Node
public class Actor {

	@Id
	@GeneratedValue
	private Long id;
	private String title;
	private String description;
	private String imageUrl;
	private String siteUrl;
	
	@Relationship(type="ACTIVE_IN")
	@JsonIgnoreProperties({"relatedActors"})
	private List<Area> relatedAreas;

	@Relationship(type="RELATED_TO")
	@JsonIgnoreProperties({"relatedActors", "relatedAreas", "permissions"})
	private List<Actor> relatedActors;
	
	@Relationship(type="LICENSED_BY", direction = Relationship.Direction.OUTGOING)
	@JsonIgnoreProperties({"licensedByActor", "laws"})
	private List<Permission> permissions;

	public Actor() { }

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

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getSourceUrl() {
		return siteUrl;
	}

	public void setSourceUrl(String sourceUrl) {
		this.siteUrl = sourceUrl;
	}

	public List<Area> getRelatedAreas() {
		return relatedAreas;
	}

	public void setRelatedAreas(List<Area> relatedAreas) {
		this.relatedAreas = relatedAreas;
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

	public List<Permission> getPermissions() {
		return permissions;
	}

	public void setPermissions(List<Permission> permissions) {
		this.permissions = permissions;
	}
	
	@Override
	public String toString() {
		return "Actor [id=" + id + ", title=" + title + ", description=" + description + ", imageUrl=" + imageUrl
				+ ", siteUrl=" + siteUrl + "]";
	}

	
}
