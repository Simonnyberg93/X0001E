package com.urbancloud.InformationApplication.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

public class PermissionDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String title;
	private String description;
	private String label = "Permission";
					  
	@JsonIgnoreProperties({"relatedActorsInc", "relatedActorsOut", "relatedAreas", "permissions"})
	private Actor licensedByActor;
	
	@JsonIgnoreProperties({"relatedPermissions", "areas"})
	private List<Document> laws = new ArrayList<Document>();
	
	public PermissionDTO(Permission permission) {
		this.id = permission.getId();
		this.title = permission.getTitle();
		this.description = permission.getDescription();
		this.licensedByActor = permission.getLicensedByActor().getActor();
		permission.getLaws().forEach(rel -> this.laws.add(rel.getDocument()));
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

	@Override
	public int hashCode() {
		return Objects.hash(description, id, laws, title);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PermissionDTO other = (PermissionDTO) obj;
		return Objects.equals(description, other.description) && Objects.equals(id, other.id)
				&& Objects.equals(laws, other.laws) && Objects.equals(title, other.title);
	}
	
}
