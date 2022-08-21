package com.urbancloud.InformationApplication.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.urbancloud.InformationApplication.models.SearchWordTracker;

@Repository
public interface SearchWordTrackerRepository extends Neo4jRepository<SearchWordTracker, Long> {
	
	@Query("MATCH (n: SearchWordTracker) RETURN n ORDER BY n.count LIMIT 10;")
	List<SearchWordTracker> findTopSearch();

	@Query("MATCH (n: SearchWordTracker) WHERE n.word = $searchStr RETURN n;")
	Optional<SearchWordTracker> findByWord(@Param("searchStr") String searchStr);

}
