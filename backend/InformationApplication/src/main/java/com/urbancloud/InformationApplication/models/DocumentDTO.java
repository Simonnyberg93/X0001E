package com.urbancloud.InformationApplication.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

public class DocumentDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String title;
	private String source;
	private String description;
	private String siteUrl;
	private boolean validUrl;
	private String label = "Document";
	
	@JsonIgnoreProperties({"includes", "relatedActors"})
	private List<Area> areas = new ArrayList<Area>();
	
	@JsonIgnoreProperties({"laws"})
	private List<Permission> relatedPermissions;

	public DocumentDTO(Document document) {
		this.id = document.getId();
		this.title = document.getTitle();
		this.source = document.getSource();
		this.description = document.getDescription();
		this.siteUrl = document.getSiteUrl();
		this.relatedPermissions = document.getRelatedPermissions();
		this.validUrl = document.isValidUrl();
		document.getAreas().forEach(rel -> this.areas.add(rel.getArea()));
	}
	
	

	public boolean isValidUrl() {
		return validUrl;
	}



	public void setValidUrl(boolean validUrl) {
		this.validUrl = validUrl;
	}



	public String getLabel() {
		return label;
	}



	public void setLabel(String label) {
		this.label = label;
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

	public List<Area> getAreas() {
		return areas;
	}

	public void setAreas(List<Area> areas) {
		this.areas = areas;
	}

	public List<Permission> getRelatedPermissions() {
		return relatedPermissions;
	}

	public void setRelatedPermissions(List<Permission> relatedPermissions) {
		this.relatedPermissions = relatedPermissions;
	}

	@Override
	public int hashCode() {
		return Objects.hash(areas, description, id, relatedPermissions, siteUrl, source, title);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		DocumentDTO other = (DocumentDTO) obj;
		return Objects.equals(areas, other.areas) && Objects.equals(description, other.description)
				&& Objects.equals(id, other.id) && Objects.equals(relatedPermissions, other.relatedPermissions)
				&& Objects.equals(siteUrl, other.siteUrl) && Objects.equals(source, other.source)
				&& Objects.equals(title, other.title);
	}
	
	
}
