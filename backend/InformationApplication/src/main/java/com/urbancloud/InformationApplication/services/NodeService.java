package com.urbancloud.InformationApplication.services;

import java.util.List;

import com.urbancloud.InformationApplication.models.Actor;
import com.urbancloud.InformationApplication.models.Area;
import com.urbancloud.InformationApplication.models.Permission;
import com.urbancloud.InformationApplication.models.Document;

public interface NodeService {
	
	public Actor fetchActorById(Long id) throws Exception;
	
	public Area fetchAreaById(Long id) throws Exception;
	
	public Permission fetchPermissionById(Long id) throws Exception;
	
	public Document fetchDocumentById(Long id) throws Exception;

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
	
}
