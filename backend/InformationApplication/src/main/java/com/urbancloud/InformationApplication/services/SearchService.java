package com.urbancloud.InformationApplication.services;

import java.util.List;

import com.urbancloud.InformationApplication.models.Actor;
import com.urbancloud.InformationApplication.models.Area;
import com.urbancloud.InformationApplication.models.Document;
import com.urbancloud.InformationApplication.models.Permission;

public interface SearchService {

	public List<Actor> fulltextSearchForActors(String searchStr) throws Exception;
	
	public List<Area> fulltextSearchForAreas(String searchStr) throws Exception;

	public List<Document> fulltextSearchForDocuments(String searchStr) throws Exception;

	public List<Permission> fulltextSearchForPermissions(String searchStr) throws Exception;

	public List<String> fetchMostSearchedWords() throws Exception;

	void saveSearchWord(String searchStr);
	
}
