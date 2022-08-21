package com.urbancloud.InformationApplication.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.urbancloud.InformationApplication.models.Actor;
import com.urbancloud.InformationApplication.models.Area;
import com.urbancloud.InformationApplication.models.Permission;
import com.urbancloud.InformationApplication.models.Document;
import com.urbancloud.InformationApplication.services.NodeService;

@CrossOrigin
@RestController
@RequestMapping("/api/neo4j")
public class NodeController {

	@Autowired
	NodeService nodeService;
	
	@GetMapping("/fetch/actor/byid/{id}")
	public ResponseEntity<?> fetchActorById(@PathVariable(value = "id") Long id) { 
		try {
			Actor result = this.nodeService.fetchActorById(id);
			return new ResponseEntity<Actor>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Failed to retrive node with id " + id, HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/fetch/documents/by/derives_from/{permissionId}")
	public ResponseEntity<?> fetchDocumentsByDerivesFromRelation(@PathVariable(value = "permissionId") Long permissionId) {
		try {
			List<Document> result = this.nodeService.fetchDocumentsByDerivesFromRelation(permissionId);
			return new ResponseEntity<List<Document>>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Failed to retrive nodes", HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/fetch/actors/by/active_in/{areaId}")
	public ResponseEntity<?> fetchActorByActiveInRelation(@PathVariable(value = "areaId") Long areaId) { 
		try {
			List<Actor> result = this.nodeService.fetchActorsByRelationToArea(areaId);
			return new ResponseEntity<List<Actor>>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("FAIL", HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/fetch/actors/by/related_to/{actorId}")
	public ResponseEntity<?> fetchActorsByRelatedToRelation(@PathVariable(value = "actorId") Long actorId) {
		try {
			List<Actor> result = this.nodeService.fetchActorsByRelatedToRelation(actorId);
			return new ResponseEntity<List<Actor>>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("FAIL", HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/fetch/areas/by/active_in/{actorId}")
	public ResponseEntity<?> fetchAreasByActiveInRelation(@PathVariable(value = "actorId") Long actorId) {
		try {
			List<Area> result = this.nodeService.fetchAreasByActiveInRelation(actorId);
			return new ResponseEntity<List<Area>>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("FAIL", HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/fetch/permissions/by/licenced_by/{actorId}")
	public ResponseEntity<?> fetchPermissionsByLicensedByRelation(@PathVariable(value = "actorId") Long actorId) {
		try {
			List<Permission> result = this.nodeService.fetchPermissionsByLicensedByRelation(actorId);
			return new ResponseEntity<List<Permission>>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("FAIL", HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/fetch/actor/by/licensed_by/{permissionId}")
	public ResponseEntity<?> fetchActorByLicensedByRelation(@PathVariable(value = "permissionId") Long permissionId) {
		try {
			Actor result = this.nodeService.fetchActorByLicensedByRelation(permissionId);
			return new ResponseEntity<Actor>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("FAIL", HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/fetch/documents/by/include/{areaId}")
	public ResponseEntity<?> fetchDocumentByIncludeRelation(@PathVariable(value = "areaId") Long areaId) { 
		try {
			List<Document> result = this.nodeService.fetchDocumentsByRelationToArea(areaId);
			return new ResponseEntity<List<Document>>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("FAIL", HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/fetch/permission/by/shortestpath/{areaId}")
	public ResponseEntity<?> fetchDocumentsByShortestpath(@PathVariable(value = "areaId") Long areaId) { 
		try {
			List<Permission> result = this.nodeService.fetchPermissionsByShortestPathToArea(areaId);
			return new ResponseEntity<List<Permission>>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>(" ", HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/fetch/areas/by/shortestpath/{permissionId}")
	public ResponseEntity<?> fetchAreasByShortestpath(@PathVariable(value = "permissionId") Long permissionId) { 
		try {
			List<Area> result = this.nodeService.fetchAreasByShortestPathToPermission(permissionId);
			return new ResponseEntity<List<Area>>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>(" ", HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/fetch/actors/by/shortestpath/{permissionId}")
	public ResponseEntity<?> fetchActorsByShortestpath(@PathVariable(value = "permissionId") Long permissionId) { 
		try {
			List<Actor> result = this.nodeService.fetchActorsByShortestPathToPermission(permissionId);
			return new ResponseEntity<List<Actor>>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Failed to fetch actors.", HttpStatus.CONFLICT);
		}
	}
	
	
	@GetMapping("/fetch/area/byid/{id}")
	public ResponseEntity<?> fetchAreaById(@PathVariable(value = "id") Long id) { 
		try {
			Area result = this.nodeService.fetchAreaById(id);
			return new ResponseEntity<Area>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Failed to retrive node with id " + id, HttpStatus.CONFLICT);
		} 
	}

	@GetMapping("/fetch/areas/byneighborarea/{areaTitle}")
	public ResponseEntity<?> fetchAreaByNeighbor(@PathVariable(value = "areaTitle") String areaTitle) {
		try {
			List<Area> result = this.nodeService.fetchAreasByNeighbor(areaTitle);
			return new ResponseEntity<List<Area>>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Failed to retrive node with neighboring to area with title " + areaTitle, HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/fetch/document/byid/{id}")
	public ResponseEntity<?> fetchDocumentById(@PathVariable(value = "id") Long id) { 
		try {
			Document result = this.nodeService.fetchDocumentById(id);
			return new ResponseEntity<Document>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Failed to retrive node with id " + id, HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/fetch/documents/bysource/{source}")
	public ResponseEntity<?> fetchDocumentBySource(@PathVariable(value = "source") String source) {
		try {
			List<Document> result = this.nodeService.fetchDocumentsBySource(source);
			return new ResponseEntity<List<Document>>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Failed to retrive documents with source " + source, HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("fetch/permission/byid/{id}")
	public ResponseEntity<?> fetchPermissionById(@PathVariable(value = "id") Long id) {
		try {
			Permission result = this.nodeService.fetchPermissionById(id);
			return new ResponseEntity<Permission>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Failed to retrive node with id " + id, HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/fetch/all/actors")
	public ResponseEntity<?> fetchAllActors(){
		try {
			List<Actor> result = this.nodeService.fetchAllActors();
			return new ResponseEntity<List<Actor>>(result, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("Failed to fetch actors!", HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/fetch/all/areas")
	public ResponseEntity<?> fetchAllAreas(){
	  try {
	    List<Area> result = this.nodeService.fetchAllAreas();
	    return new ResponseEntity<List<Area>>(result, HttpStatus.OK);
	  } catch (Exception e) {
	    e.printStackTrace();
	    return new ResponseEntity<String>("Failed to fetch areas!", HttpStatus.CONFLICT);
	  }
	}
	
	@GetMapping("/fetch/all/permissions")
	public ResponseEntity<?> fetchAllPermissions(){
	  try {
	    List<Permission> result = this.nodeService.fetchAllPermissions();
	    return new ResponseEntity<List<Permission>>(result, HttpStatus.OK);
	  } catch (Exception e) {
	    e.printStackTrace();
	    return new ResponseEntity<String>("Failed to fetch Permissions!", HttpStatus.CONFLICT);
	  }
	}
	
	@GetMapping("/fetch/all/documents")
	public ResponseEntity<?> fetchAllTopics(){
		try {
			List<Document> result = this.nodeService.fetchAllDocuments();
			return new ResponseEntity<List<Document>>(result, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("Failed to fetch documents!", HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping("/fetch/actor/bytitles")
	public ResponseEntity<?> fetchActorByTitles(@RequestBody List<String> listOfTitles) { 
		try {
			List<Actor> result = this.nodeService.findMultipleByTitle(listOfTitles);
			return new ResponseEntity<List<Actor>>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Failed to retrive nodes with titles " + listOfTitles, HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping("/fetch/area/bytitles")
	public ResponseEntity<?> fetchareaByTitles(@RequestBody List<String> listOfTitles) { 
		try {
			List<Area> result = this.nodeService.findMultipleAreasByTitle(listOfTitles);
			return new ResponseEntity<List<Area>>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Failed to retrive nodes with titles " + listOfTitles, HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping("/fetch/documents/bytitles")
	public ResponseEntity<?> fetchDocumentByTitles(@RequestBody List<String> listOfTitles) { 
		try {
			List<Document> result = this.nodeService.findMultipleDocumentsByTitle(listOfTitles);
			return new ResponseEntity<List<Document>>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Failed to retrive nodes with titles " + listOfTitles, HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping("/post/actor")
	public ResponseEntity<?> postActor(@RequestBody Actor actor){
		try {
			Actor result = this.nodeService.postActor(actor);
			return new ResponseEntity<Actor>(result, HttpStatus.OK);
		} 
		catch (Exception e) {
			return new ResponseEntity<String>("Failed to post actor!", HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping("/post/multiple/actors")
	public ResponseEntity<?> postActors(@RequestBody List<Actor> actor){
		boolean result = this.nodeService.postActors(actor);
		if(result) {
			return new ResponseEntity<String>("Succesfully added actors.", HttpStatus.OK);
		}
		return new ResponseEntity<String>("Failed to post actors!", HttpStatus.CONFLICT);
		
	}
	
	@PostMapping("/post/area")
	public ResponseEntity<?> postArea(@RequestBody Area area){
		try {
			Area result = this.nodeService.postArea(area);
			return new ResponseEntity<Area>(result, HttpStatus.OK);
		} 
		catch (Exception e) {
			return new ResponseEntity<String>("Failed to post area!", HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping("/post/document")
	public ResponseEntity<?> postTopic(@RequestBody Document document){
		try {
			Document result = this.nodeService.postDocument(document);
			return new ResponseEntity<Document>(result, HttpStatus.OK);
		} 
		catch (Exception e) {
			return new ResponseEntity<String>("Failed to post document!", HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping("/post/multiple/areas")
	public ResponseEntity<?> postAreas(@RequestBody List<Area> areas) {
		boolean result = this.nodeService.postAreas(areas);
		if (result) {
			return new ResponseEntity<String>("Succesfully added areas.", HttpStatus.OK);
		}
		return new ResponseEntity<String>("Failed to post areas!", HttpStatus.CONFLICT);
	}
	
	
	
	@PostMapping("/post/permission")
	public ResponseEntity<?> postPermission(@RequestBody Permission permission){
		try {
			Permission result = this.nodeService.postPermission(permission);
			return new ResponseEntity<Permission>(result, HttpStatus.OK);
		} 
		catch (Exception e) {
			return new ResponseEntity<String>("Failed to post permission!", HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping("/post/multiple/permissions")
	public ResponseEntity<?> postPermissions(@RequestBody List<Permission> permissions){
		boolean result = this.nodeService.postPermissions(permissions);
		if(result) {
			return new ResponseEntity<String>("Succesfully added permissions!", HttpStatus.OK);
		}
		return new ResponseEntity<String>("Failed to post permissions!", HttpStatus.CONFLICT);
		
	}
	
	@PostMapping("/post/multiple/documents")
	public ResponseEntity<?> postTopics(@RequestBody List<Document> documents){
		boolean result = this.nodeService.postDocuments(documents);
		if(result) {
			return new ResponseEntity<String>("Succesfully added documents!", HttpStatus.OK);
		}
		return new ResponseEntity<String>("Failed to post documents!", HttpStatus.CONFLICT);
		
	}
	
	@DeleteMapping("/delete/actor/{id}")
	public ResponseEntity<String> removeActor(@PathVariable(value = "id") Long id) throws Exception {
		if (this.nodeService.removeActor(id)) {
			return new ResponseEntity<String>("Success", HttpStatus.OK);
		}
		return new ResponseEntity<String>("Fail", HttpStatus.CONFLICT);
	}
	
	@DeleteMapping("/delete/area/{id}")
	public ResponseEntity<String> removeArea(@PathVariable(value = "id") Long id) throws Exception {
		if (this.nodeService.removeArea(id)) {
			return new ResponseEntity<String>("Success", HttpStatus.OK);
		}
		return new ResponseEntity<String>("Fail", HttpStatus.CONFLICT);
	}
	
	@DeleteMapping("/delete/permission/{id}")
	public ResponseEntity<String> removePermission(@PathVariable(value = "id") Long id) throws Exception {
		if (this.nodeService.removePermission(id)) {
			return new ResponseEntity<String>("Success", HttpStatus.OK);
		}
		return new ResponseEntity<String>("Fail", HttpStatus.CONFLICT);
	}
	
	@DeleteMapping("/delete/document/{id}")
	public ResponseEntity<String> removeTopic(@PathVariable(value = "id") Long id) throws Exception {
		if (this.nodeService.removeDocument(id)) {
			return new ResponseEntity<String>("Success", HttpStatus.OK);
		}
		return new ResponseEntity<String>("Fail", HttpStatus.CONFLICT);
	}
}
