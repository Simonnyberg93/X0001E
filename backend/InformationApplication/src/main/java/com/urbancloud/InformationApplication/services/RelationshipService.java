package com.urbancloud.InformationApplication.services;

import java.util.List;

public interface RelationshipService {

	public void addActorToActorRelation(Long idOne, Long idTwo) throws Exception;
	
	public void addActorToAreaRelation(Long actorId, Long areaId) throws Exception;
	
	public void addAreaToDocumentRelation(Long areaId, List<Long> documentIds) throws Exception;
	
	public void addAreaToPermissionRelations(Long areaId, List<Long> permissionIds) throws Exception;

	public void addActorToMultipleDocumentsRelations(Long actorId, List<Long> documentIds) throws Exception;
	
	public void addActorToMultiplePermissionRelations(Long actorId, List<Long> permissionIds) throws Exception;
	
	public void addPermissionToDocumentRelation(Long permissionId, Long documentId) throws Exception;
}
