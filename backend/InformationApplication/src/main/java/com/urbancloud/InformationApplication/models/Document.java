package com.urbancloud.InformationApplication.models;

import java.util.List;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.urbancloud.InformationApplication.Relationships.Includes;

@Node
public class Document {
	
	@Id
	@GeneratedValue
	private Long id;
	private String title;
	private String source;
	private String description;
	private String siteUrl;
	private boolean validUrl;
	
	@Relationship(type="INCLUDES", direction = Relationship.Direction.INCOMING)
	@JsonIgnoreProperties({"id"})
	private List<Includes> areas;
	
	@Relationship(type="DERIVES_FROM", direction = Relationship.Direction.OUTGOING)
	@JsonIgnoreProperties("laws")
	private List<Permission> relatedPermissions;
	

	public Document() {}

	public List<Includes> getAreas() {
		return areas;
	}

	public void setAreas(List<Includes> areas) {
		this.areas = areas;
	}

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

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
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

	public List<Permission> getRelatedPermissions() {
		return relatedPermissions;
	}

	public void setRelatedPermissions(List<Permission> relatedPermissions) {
		this.relatedPermissions = relatedPermissions;
	}

	public boolean isValidUrl() {
		return validUrl;
	}

	public void setValidUrl(boolean validUrl) {
		this.validUrl = validUrl;
	}
	
	
}
