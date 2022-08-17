package com.urbancloud.InformationApplication.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.urbancloud.InformationApplication.models.Document;
import com.urbancloud.InformationApplication.models.Permission;
import com.urbancloud.InformationApplication.repository.ActorRepository;
import com.urbancloud.InformationApplication.repository.AreaRepository;
import com.urbancloud.InformationApplication.repository.DocumentRepository;
import com.urbancloud.InformationApplication.repository.PermissionRepository;

@Service
public class RelationshipServiceImpl implements RelationshipService {

	@Autowired
	ActorRepository actorRepo;
	
	@Autowired
	AreaRepository areaRepo;
	
	@Autowired
	PermissionRepository permRepo;
	
	@Autowired
	DocumentRepository documentRepo;
	
	@Override
	public void addActorToActorRelation(Long idOne, Long idTwo) throws Exception {
		try {
			this.actorRepo.addRelatedActor(idOne, idTwo);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

	@Override
	public void addActorToAreaRelation(Long actorId, Long areaId) throws Exception {
		try {
			this.actorRepo.addRelatedArea(actorId, areaId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

	@Override
	public void addAreaToDocumentRelation(Long areaId, List<Long> documentIds) throws Exception {
		for (Long docId : documentIds) {
			this.areaRepo.addIncludedDocument(areaId, docId);
		}
	}

	@Override
	public void addAreaToPermissionRelations(Long areaId, List<Long> permissionIds) throws Exception {
		for (Long permId: permissionIds) {
			this.areaRepo.addRelatedPermissions(areaId, permId);
		}
		
	}

	@Override
	public void addActorToMultipleDocumentsRelations(Long actorId, List<Long> documentIds) throws Exception {
		for (Long documentId : documentIds) {
			this.actorRepo.addRelatedDocument(actorId, documentId);
		}
		
	}

	@Override
	public void addActorToMultiplePermissionRelations(Long actorId, List<Long> permissionIds) throws Exception {
		for (Long permissionId: permissionIds) {
			this.actorRepo.addRelatedPermission(actorId, permissionId);
		}
	}

	@Override
	public void addPermissionToDocumentRelation(Long permissionId, Long documentId) throws Exception {
		Optional<Permission> p = this.permRepo.findById(permissionId);
		Optional<Document> d = this.documentRepo.findById(documentId);
		if (p.isEmpty() || d.isEmpty()) {
			throw new Exception("Cannot find nodes");
		}
		Permission perm = p.get();
		Document doc = d.get();
		List<Document> documents = perm.getLaws();
		List<Permission> perms = doc.getRelatedPermissions();
		documents.add(doc);
		perms.add(perm);
		perm.setLaws(documents);
		doc.setRelatedPermissions(perms);
		this.documentRepo.save(doc);
		this.permRepo.save(perm);
	}

}
