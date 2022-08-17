package com.urbancloud.InformationApplication.controllers;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.urbancloud.InformationApplication.services.RelationshipService;

@CrossOrigin
@RestController
@RequestMapping("/api/neo4j/relationship")
public class RelationshipController {
	
	@Autowired
	RelationshipService service;

	@PostMapping("/add/actor2actor/byid/{idOne}/{idTwo}")
	public ResponseEntity<?> addRelatedActorToActor(@PathVariable(value = "idOne") Long idOne, @PathVariable(value = "idTwo") Long idTwo){
		try {
			this.service.addActorToActorRelation(idOne, idTwo);
			return new ResponseEntity<String>("Succesfully added relationship", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Failed to add relationship", HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping("/add/actor2documents/byid/{actorId}")
	public ResponseEntity<?> addRelatedActorToDocuments(@PathVariable(value = "actorId") Long actorId, @RequestBody List<Long> documentIds){
		try {
			this.service.addActorToMultipleDocumentsRelations(actorId, documentIds);
			return new ResponseEntity<String>("Succesfully added relationship", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Failed to add relationship", HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping("/add/actor2area/byid/{actorId}/{areaId}")
	public ResponseEntity<?> addRelatedActorToArea(@PathVariable(value = "actorId") Long actorId, @PathVariable(value = "areaId") Long areaId){
		try {
			this.service.addActorToAreaRelation(actorId, areaId);
			return new ResponseEntity<String>("Succesfully added relationship", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Failed to add relationship", HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping("/add/area2documents/byid/{areaId}")
	public ResponseEntity<?> addIncludedDocuments(@PathVariable(value = "areaId") Long areaId, @RequestBody List<Long> documentIds){
		try {
			this.service.addAreaToDocumentRelation(areaId, documentIds);
			return new ResponseEntity<String>("Succesfully added relationships", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Failed to add relationships", HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping("/add/actor2permission/byid/{actorId}")
	public ResponseEntity<?> addLicensedByRelation(@PathVariable(value="actorId") Long actorId, @RequestBody List<Long> permissionIds){
		try {
			this.service.addActorToMultiplePermissionRelations(actorId, permissionIds);
			return new ResponseEntity<String>("Succesfully added relationships", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Failed to add relationships", HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping("/add/permission2document/byid/{permissionId}/{documentId}")
	public ResponseEntity<?> addDerivedFromRelation(@PathVariable(value="permissionId") Long permissionId, @PathVariable(value="documentId") Long documentId){
		try {
			this.service.addPermissionToDocumentRelation(permissionId, documentId);
			return new ResponseEntity<String>("Succesfully added relationship", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Failed to add relationship", HttpStatus.CONFLICT);
		}
	}
}
