package com.urbancloud.InformationApplication.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.urbancloud.InformationApplication.models.Actor;
import com.urbancloud.InformationApplication.models.Area;
import com.urbancloud.InformationApplication.models.Document;
import com.urbancloud.InformationApplication.models.NodeDTO;
import com.urbancloud.InformationApplication.models.Permission;
import com.urbancloud.InformationApplication.models.SearchWordTracker;
import com.urbancloud.InformationApplication.repository.ActorRepository;
import com.urbancloud.InformationApplication.repository.AreaRepository;
import com.urbancloud.InformationApplication.repository.DocumentRepository;
import com.urbancloud.InformationApplication.repository.NodeRepo;
import com.urbancloud.InformationApplication.repository.PermissionRepository;
import com.urbancloud.InformationApplication.repository.SearchWordTrackerRepository;

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
	
	@Autowired
	NodeRepo nodeRepo;
	
	@Autowired
	SearchWordTrackerRepository searchWordRepository;
	
	@Override
	public void saveSearchWord(String searchStr) {
		if (searchStr != null && searchStr.length() > 0) {
			searchStr = searchStr.replaceAll("~", "").toLowerCase().trim();
			Optional<SearchWordTracker> word = this.searchWordRepository.findByWord(searchStr);
			if (word.isPresent()) {
				SearchWordTracker w = word.get();
				w.setCount(w.getCount() + 1);
				this.searchWordRepository.save(w);
			} else {
				this.searchWordRepository.save(new SearchWordTracker(searchStr, 1));
			}
		}
	}

	@Override
	public List<Actor> fulltextSearchForActors(String searchStr) throws Exception {
		List<Actor> result = this.nodeRepo.fulltextSearchForActors(searchStr);
		return result;
	}

	@Override
	public List<Area> fulltextSearchForAreas(String searchStr) throws Exception {
		return this.nodeRepo.fulltextSearchForAreas(searchStr);
	}

	@Override
	public List<Document> fulltextSearchForDocuments(String searchStr) throws Exception {
		return this.nodeRepo.fulltextSearchForDocuments(searchStr);
	}

	@Override
	public List<Permission> fulltextSearchForPermissions(String searchStr) throws Exception {
		return this.nodeRepo.fulltextSearchForPermissions(searchStr);
	}

	@Override
	public List<String> fetchMostSearchedWords() throws Exception {
		List<SearchWordTracker> result = this.searchWordRepository.findTopSearch();
		List<String> words = new ArrayList<String>();
		for (SearchWordTracker wt : result) {
			words.add(wt.getWord());
		}
		return words;
	}

	@Override
	public List<NodeDTO> fulltextSearch(String searchStr) throws Exception {
		return this.nodeRepo.fulltextSearch(searchStr);
	}

	@Override
	public List<NodeDTO> findNodesByTitles(List<String> searchStrings) throws Exception {
		return this.nodeRepo.findAllByTitle(searchStrings);
	}

}
