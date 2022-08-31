package com.urbancloud.InformationApplication.models;

import java.util.List;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.urbancloud.InformationApplication.Relationships.DerivesFrom;
import com.urbancloud.InformationApplication.Relationships.LicensedBy;

@Node
public class Permission {
	
	@Id
	@GeneratedValue
	private Long id;
	private String title;
	private String description;
					  
	@Relationship(type="LICENSED_BY", direction = Relationship.Direction.INCOMING)
	@JsonIgnoreProperties("id")
	private LicensedBy licensedByActor;

	@Relationship(type="DERIVES_FROM", direction = Relationship.Direction.INCOMING)
	@JsonIgnoreProperties("id")
	private List<DerivesFrom> laws;
	
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

	public LicensedBy getLicensedByActor() {
		return licensedByActor;
	}

	public void setLicensedByActor(LicensedBy licensedByActor) {
		this.licensedByActor = licensedByActor;
	}

	public List<DerivesFrom> getLaws() {
		return laws;
	}

	public void setLaws(List<DerivesFrom> laws) {
		this.laws = laws;
	}

	
}
