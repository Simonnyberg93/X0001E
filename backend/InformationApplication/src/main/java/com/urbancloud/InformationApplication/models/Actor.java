package com.urbancloud.InformationApplication.models;

import java.util.List;

import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.urbancloud.InformationApplication.Relationships.ActiveIn;
import com.urbancloud.InformationApplication.Relationships.RelatedTo;

@Node
public class Actor extends NodeDTO  {

	//private String label = "Actor";
	private String imageUrl;
	private String siteUrl;
	private boolean validUrl = true;
	
	@Relationship(type="ACTIVE_IN", direction = Relationship.Direction.INCOMING)
	@JsonIgnoreProperties({"id"})
	private List<ActiveIn> relatedAreas;

	@Relationship(type="RELATED_TO", direction = Relationship.Direction.INCOMING)
	@JsonIgnoreProperties({"id"})
	private List<RelatedTo> relatedActorsInc;
	
	@Relationship(type="RELATED_TO", direction = Relationship.Direction.OUTGOING)
	@JsonIgnoreProperties({"id"})
	private List<RelatedTo> relatedActorsOut;
	
	@Relationship(type="LICENSED_BY", direction = Relationship.Direction.OUTGOING)
	@JsonIgnoreProperties({"licensedByActor", "laws"})
	private List<Permission> permissions;

	public Actor() {
		super();
	}
	
	public List<RelatedTo> getRelatedActorsInc() {
		return relatedActorsInc;
	}

	public void setRelatedActorsInc(List<RelatedTo> relatedActorsInc) {
		this.relatedActorsInc = relatedActorsInc;
	}

	public List<RelatedTo> getRelatedActorsOut() {
		return relatedActorsOut;
	}

	public void setRelatedActorsOut(List<RelatedTo> relatedActorsOut) {
		this.relatedActorsOut = relatedActorsOut;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}


	public List<ActiveIn> getRelatedAreas() {
		return relatedAreas;
	}

	public void setRelatedAreas(List<ActiveIn> relatedAreas) {
		this.relatedAreas = relatedAreas;
	}


	public String getSiteUrl() {
		return siteUrl;
	}


	public void setSiteUrl(String siteUrl) {
		this.siteUrl = siteUrl;
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
	

	@Override
	public String toString() {
		return "Actor [imageUrl=" + imageUrl + ", siteUrl=" + siteUrl + ", validUrl=" + validUrl + "]";
	}
	
}
