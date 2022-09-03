package com.urbancloud.InformationApplication.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


public class ActorDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private String title;
	private String description;
	private String imageUrl;
	private String siteUrl;
	private String label = "Actor";
	private boolean validUrl;
	
	@JsonIgnoreProperties({"includes", "relatedActors"})
	private List<Area> relatedAreas = new ArrayList<Area>();
	
	@JsonIgnoreProperties({"relatedAreas", "relatedActorsInc", "permissions", "relatedActorsOut"})
	private List<Actor> relatedActors = new ArrayList<Actor>();
	
	@JsonIgnoreProperties({"licensedByActor", "laws"})
	private List<Permission> permissions;
	

	public ActorDTO(Actor actorObj) {
		this.id = actorObj.getId();
		this.title = actorObj.getTitle();
		this.description = actorObj.getDescription();
		this.imageUrl = actorObj.getImageUrl();
		this.siteUrl = actorObj.getSiteUrl();
		this.permissions = actorObj.getPermissions();
		if(this.permissions == null) {
			this.permissions = new ArrayList<Permission>();
		}
		this.validUrl = actorObj.isValidUrl();
		actorObj.getRelatedActorsInc()
			.forEach(rel -> {
				this.relatedActors.add(rel.getActor());
			});
		actorObj.getRelatedActorsOut()
			.forEach(rel -> {
				this.relatedActors.add(rel.getActor());
			});
		actorObj.getRelatedAreas().forEach(rel -> this.relatedAreas.add(rel.getArea()));
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

	public String getSiteUrl() {
		return siteUrl;
	}

	public void setSiteUrl(String siteUrl) {
		this.siteUrl = siteUrl;
	}

	public List<Area> getRelatedAreas() {
		return relatedAreas;
	}

	public void setRelatedAreas(List<Area> relatedAreas) {
		this.relatedAreas = relatedAreas;
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

	@Override
	public int hashCode() {
		return Objects.hash(description, id, imageUrl, permissions, relatedActors, relatedAreas, siteUrl, title,
				validUrl);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ActorDTO other = (ActorDTO) obj;
		return Objects.equals(description, other.description) && Objects.equals(id, other.id)
				&& Objects.equals(imageUrl, other.imageUrl) && Objects.equals(permissions, other.permissions)
				&& Objects.equals(relatedActors, other.relatedActors)
				&& Objects.equals(relatedAreas, other.relatedAreas) && Objects.equals(siteUrl, other.siteUrl)
				&& Objects.equals(title, other.title) && validUrl == other.validUrl;
	}

}
