package com.urbancloud.InformationApplication.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.urbancloud.InformationApplication.models.Actor;
import com.urbancloud.InformationApplication.models.Area;
import com.urbancloud.InformationApplication.models.Document;
import com.urbancloud.InformationApplication.models.Permission;
import com.urbancloud.InformationApplication.repository.ActorRepository;
import com.urbancloud.InformationApplication.repository.AreaRepository;
import com.urbancloud.InformationApplication.repository.DocumentRepository;
import com.urbancloud.InformationApplication.repository.PermissionRepository;

@Service
public class SearchServiceImpl implements SearchService {

	@Autowired
	ActorRepository actorRepo;
	
	@Autowired
	AreaRepository areaRepo;
	
	@Autowired
	PermissionRepository permRepo;
	
	@Autowired
	DocumentRepository documentRepo;

	@Override
	public List<Actor> fulltextSearchForActors(String searchStr) throws Exception {
		List<Actor> firstResult = this.actorRepo.fulltextSearch(searchStr, 10);
		if (firstResult.size() < 3) {
			
		}
		return this.actorRepo.fulltextSearch(searchStr, 10);
	}

	@Override
	public List<Area> fulltextSearchForAreas(String searchStr) throws Exception {
		return this.areaRepo.fulltextSearch(searchStr, 10);
	}

	@Override
	public List<Document> fulltextSearchForDocuments(String searchStr) throws Exception {
		return this.documentRepo.fulltextSearch(searchStr, 10);
	}

	@Override
	public List<Permission> fulltextSearchForPermissions(String searchStr) throws Exception {
		return this.permRepo.fulltextSearch(searchStr, 10);
	}

}
