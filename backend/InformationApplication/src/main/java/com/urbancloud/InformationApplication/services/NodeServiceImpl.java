package com.urbancloud.InformationApplication.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.urbancloud.InformationApplication.exceptions.ActorNotFoundException;
import com.urbancloud.InformationApplication.exceptions.AreaNotFoundException;
import com.urbancloud.InformationApplication.exceptions.DocumentNotFoundException;
import com.urbancloud.InformationApplication.exceptions.PermissionNotFoundException;
import com.urbancloud.InformationApplication.models.Actor;
import com.urbancloud.InformationApplication.models.Area;
import com.urbancloud.InformationApplication.models.Permission;
import com.urbancloud.InformationApplication.models.Document;
import com.urbancloud.InformationApplication.models.NodeDTO;
import com.urbancloud.InformationApplication.repository.ActorRepository;
import com.urbancloud.InformationApplication.repository.AreaRepository;
import com.urbancloud.InformationApplication.repository.PermissionRepository;
import com.urbancloud.InformationApplication.repository.DocumentRepository;
import com.urbancloud.InformationApplication.repository.NodeRepo;

@Service
public class NodeServiceImpl implements NodeService {

	@Autowired
	ActorRepository actorRepo;
	
	@Autowired
	AreaRepository areaRepo;
	
	@Autowired
	PermissionRepository permRepo;
	
	@Autowired
	DocumentRepository documentRepo;
	
	@Autowired
	NodeRepo nodeRepo;

	@Override
	public List<Actor> fetchAllActors() throws Exception {
		try {
			List<Actor> result = this.actorRepo.fetchAll();
			return result;
		} catch (Exception e) {
			System.out.println("ERROR :" + e.getMessage());
			throw new Exception("Failed");
		}
	}

	@Override
	public Actor postActor(Actor actor) throws Exception {
		return this.actorRepo.save(actor);
	}

	@Override
	public boolean removeActor(Long id) {
		if (id == null) {
			return false;
		}
		try {
			this.actorRepo.deleteById(id);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public boolean postActors(List<Actor> actors) {
		try {
			this.actorRepo.saveAll(actors);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public List<Area> fetchAllAreas() throws Exception {
		try {
			List<Area> result = this.areaRepo.fetchAll();
			return result;
		} catch (Exception e) {
			throw new Exception("Failed");
		}
	}


	@Override
	public Area postArea(Area area) throws Exception {
		return this.areaRepo.save(area);
	}
	
	@Override
	public List<Permission> fetchAllPermissions() throws Exception {
		try {
			List<Permission> result = this.permRepo.fetchAll();
			return result;
		} catch (Exception e) {
			throw new Exception("Failed");
		}
	}

	@Override
	public Permission postPermission(Permission permission) throws Exception {
		return this.permRepo.save(permission);
	}

	@Override
	public boolean postAreas(List<Area> areas) {
		try {
			this.areaRepo.saveAll(areas);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean postPermissions(List<Permission> permissions) {
		try { 
			this.permRepo.saveAll(permissions); 
			return true;
		} catch (Exception e) { 
			e.printStackTrace(); 
			return false;
		}
	}

	@Override
	public boolean removeArea(Long id) {
		if (id == null) {
			return false;
		}
		try {
			this.areaRepo.deleteById(id);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public boolean removePermission(Long id) {
		if (id == null) {
			return false;
		}
		try {
			this.permRepo.deleteById(id);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public List<Document> fetchAllDocuments() throws Exception {
		return this.documentRepo.fetchAll();
	}

	@Override
	public Document postDocument(Document topic) throws Exception {
		return this.documentRepo.save(topic);
	}

	@Override
	public boolean postDocuments(List<Document> topics) {
		try {
			this.documentRepo.saveAll(topics);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean removeDocument(Long id) {
		if (id == null) {
			return false;
		}
		try {
			this.documentRepo.deleteById(id);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public Actor fetchActorById(Long id) throws ActorNotFoundException {
		try {
			Optional<Actor> result = this.actorRepo.findById(id);
			if(result.isEmpty()) {
				throw new ActorNotFoundException("Actor with id: {"+id+"} was not found.");
			}
			Actor actor = result.get();
			return actor;
		} catch(Exception e) {
			e.printStackTrace();
			throw new ActorNotFoundException(e.getMessage());
		}
	}

	@Override
	public Area fetchAreaById(Long id) throws AreaNotFoundException {
		try {
			Optional<Area> result = this.areaRepo.findById(id);
			if (result.isEmpty()) {
				throw new Exception("Could not find Area with id: {"+id+"}.");
			}
			return result.get();
		} catch (Exception e) {
			throw new AreaNotFoundException(e.getMessage());
		}
	}

	@Override
	public Permission fetchPermissionById(Long id) throws PermissionNotFoundException {
		try {
			Optional<Permission> result = this.permRepo.findById(id);
			Permission permission = result.get();
			return permission;
		} catch (Exception e) {
			throw new PermissionNotFoundException();
		}
	}

	@Override
	public Document fetchDocumentById(Long id) throws DocumentNotFoundException {
		try {
			Optional<Document> result = this.documentRepo.findById(id);
			if (result.isEmpty()) {
				throw new Exception("Could not find Document with id: {"+id+"}.");
			}
			return result.get();
		} catch (Exception e) {
			throw new DocumentNotFoundException(e.getMessage());
		}
	}

	@Override
	public List<Document> fetchDocumentsBySource(String source) throws Exception {
		return this.documentRepo.findBySource(source);
	}

	@Override
	public List<Area> fetchAreasByNeighbor(String areaTitle) throws Exception {
		return this.areaRepo.findNeighboringAreas(areaTitle);
	}

	@Override
	public List<Actor> findMultipleByTitle(List<String> listOfTitles) throws Exception {
		return this.actorRepo.findMultipleByTitle(listOfTitles);
	}

	@Override
	public List<Area> findMultipleAreasByTitle(List<String> listOfTitles) throws Exception {
		return this.areaRepo.findAreaByTitle(listOfTitles);
	}

	@Override
	public List<Document> findMultipleDocumentsByTitle(List<String> listOfTitles) throws Exception {
		return this.documentRepo.findByTitle(listOfTitles);
	}


	@Override
	public List<Document> fetchDocumentsByRelationToArea(Long areaId) throws Exception {
		return this.documentRepo.fetchByIncludesRelation(areaId);
	}

	@Override
	public List<Permission> fetchPermissionsByShortestPathToArea(Long areaId) throws Exception {
		return this.permRepo.fetchByShortestPathToArea(areaId);
	}

	@Override
	public List<Area> fetchAreasByShortestPathToPermission(Long permissionId) throws Exception {
		return this.areaRepo.fetchByShortestPathToPermission(permissionId);
	}

	@Override
	public List<Actor> fetchActorsByShortestPathToPermission(Long permissionId) throws Exception {
		return this.actorRepo.fetchByShortestPathToPermission(permissionId);
	}

	@Override
	public boolean updateValidUrl(Long id, boolean validUrl) {
		Optional<Object> obj = this.actorRepo.updateValidUrlAttribute(id, validUrl);
		if (obj.isEmpty()) {
			return false;
		}
		return true;
	}

	@Override
	public List<NodeDTO> findNodesWithFaultyUrls() {
		// TODO Auto-generated method stub
		return this.nodeRepo.findByFaultyUrls();
	}

	@Override
	public boolean updateUrl(Long id, String newUrl) throws Exception {
		Optional<NodeDTO> result = this.nodeRepo.updateUrl(id, newUrl);
		if (result.isEmpty()) {
			return false;
		}
		this.updateValidUrl(id, true);
		return true;
	}

}
