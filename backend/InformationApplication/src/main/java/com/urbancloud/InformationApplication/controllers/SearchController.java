package com.urbancloud.InformationApplication.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.urbancloud.InformationApplication.models.Actor;
import com.urbancloud.InformationApplication.models.Area;
import com.urbancloud.InformationApplication.models.Document;
import com.urbancloud.InformationApplication.models.Permission;
import com.urbancloud.InformationApplication.services.SearchService;

@CrossOrigin
@RestController
@RequestMapping("/api/neo4j/search")
public class SearchController {
	
	@Autowired
	SearchService service;
	
	@GetMapping("/fetch/mostsearchedwords")
	public ResponseEntity<?> getMostSearchedWords() {
		try {
			List<String> words = this.service.fetchMostSearchedWords();
			return new ResponseEntity<List<String>>(words, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Failed to fetch search words", HttpStatus.CONFLICT);
		}
			
	}
	
	@GetMapping("/actors/{searchStr}")
	public ResponseEntity<?> fulltextSearchForActors(@PathVariable(value = "searchStr") String searchStr) {
		try {
			List<Actor> result = this.service.fulltextSearchForActors(searchStr);
			System.out.println("Sucess: " + result);
			this.service.saveSearchWord(searchStr);
			return new ResponseEntity<List<Actor>>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Failed to search", HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/areas/{searchStr}")
	public ResponseEntity<?> fulltextSearchForAreas(@PathVariable(value = "searchStr") String searchStr) {
		try {
			List<Area> result = this.service.fulltextSearchForAreas(searchStr);
			return new ResponseEntity<List<Area>>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Failed to search", HttpStatus.CONFLICT);
		}
	}	

	@GetMapping("/documents/{searchStr}")
	public ResponseEntity<?> fulltextSearchForDocuments(@PathVariable(value = "searchStr") String searchStr) {
		try {
			List<Document> result = this.service.fulltextSearchForDocuments(searchStr);
			return new ResponseEntity<List<Document>>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Failed to search", HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/permissions/{searchStr}")
	public ResponseEntity<?> fulltextSearchForPermissions(@PathVariable(value = "searchStr") String searchStr) {
		try {
			List<Permission> result = this.service.fulltextSearchForPermissions(searchStr);
			return new ResponseEntity<List<Permission>>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Failed to search", HttpStatus.CONFLICT);
		}
	}

}
