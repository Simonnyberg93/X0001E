package com.urbancloud.InformationApplication.services;

import java.util.List;

import com.urbancloud.InformationApplication.exceptions.ActorNotFoundException;
import com.urbancloud.InformationApplication.exceptions.AreaNotFoundException;
import com.urbancloud.InformationApplication.exceptions.DocumentNotFoundException;
import com.urbancloud.InformationApplication.exceptions.PermissionNotFoundException;
import com.urbancloud.InformationApplication.models.Actor;
import com.urbancloud.InformationApplication.models.Area;
import com.urbancloud.InformationApplication.models.Permission;
import com.urbancloud.InformationApplication.models.Document;
import com.urbancloud.InformationApplication.models.NodeDTO;

public interface NodeService {
	
	public Actor fetchActorById(Long id) throws ActorNotFoundException;
	
	public Area fetchAreaById(Long id) throws AreaNotFoundException;
	
	public Permission fetchPermissionById(Long id) throws PermissionNotFoundException;
	
	public Document fetchDocumentById(Long id) throws DocumentNotFoundException;

	public List<Actor> fetchAllActors() throws Exception;
	
	public List<Area> fetchAllAreas() throws Exception;

	public List<Permission> fetchAllPermissions() throws Exception;
	
	public List<Document> fetchAllDocuments() throws Exception;
	
	public Actor postActor(Actor actor) throws Exception;

	public Area postArea(Area area) throws Exception;

	public Permission postPermission(Permission permission) throws Exception;
	
	public Document postDocument(Document topic) throws Exception;

	public boolean postActors(List<Actor> actor);

	public boolean postAreas(List<Area> areas);

	public boolean postPermissions(List<Permission> permissions);
	
	public boolean postDocuments(List<Document> topics);
	
	public boolean removeActor(Long id);

	public boolean removeArea(Long id);

	public boolean removePermission(Long id);
	
	public boolean removeDocument(Long id);

	public List<Document> fetchDocumentsBySource(String source) throws Exception;

	public List<Area> fetchAreasByNeighbor(String areaTitle) throws Exception;
	
	public List<Actor> findMultipleByTitle(List<String> listOfTitles) throws Exception;

	public List<Area> findMultipleAreasByTitle(List<String> listOfTitles) throws Exception;

	public List<Document> findMultipleDocumentsByTitle(List<String> listOfTitles) throws Exception;

	public List<Document> fetchDocumentsByRelationToArea(Long areaId) throws Exception;

	public List<Permission> fetchPermissionsByShortestPathToArea(Long areaId) throws Exception;

	public List<Area> fetchAreasByShortestPathToPermission(Long permissionId) throws Exception;

	public List<Actor> fetchActorsByShortestPathToPermission(Long permissionId) throws Exception;

	public boolean updateValidUrl(Long id, boolean validUrl);

	public List<NodeDTO> findNodesWithFaultyUrls();

	public boolean updateUrl(Long id, String newUrl) throws Exception;


}
