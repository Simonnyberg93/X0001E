package com.urbancloud.InformationApplication.models;

import java.util.List;

import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.urbancloud.InformationApplication.Relationships.DerivesFrom;
import com.urbancloud.InformationApplication.Relationships.LicensedBy;

@Node
public class Permission extends NodeDTO {
	
	private final String label = "Permission";
					  
	@Relationship(type="LICENSED_BY", direction = Relationship.Direction.INCOMING)
	@JsonIgnoreProperties("id")
	private LicensedBy licensedByActor;

	@Relationship(type="DERIVES_FROM", direction = Relationship.Direction.INCOMING)
	@JsonIgnoreProperties("id")
	private List<DerivesFrom> laws;
	
	public Permission() { }

	public String getLabel() {
		return label;
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
