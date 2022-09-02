package com.urbancloud.InformationApplication.repository;

import java.util.List;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.urbancloud.InformationApplication.models.Actor;
import com.urbancloud.InformationApplication.models.Area;
import com.urbancloud.InformationApplication.models.Document;
import com.urbancloud.InformationApplication.models.NodeDTO;
import com.urbancloud.InformationApplication.models.Permission;

@Repository
public interface NodeRepo extends Neo4jRepository<NodeDTO, Long> {

	@Query("CALL db.index.fulltext.queryNodes(\"titlesAndDescriptions\", $searchStr) YIELD node, score RETURN node LIMIT 50;")
	List<NodeDTO> fulltextSearch(String searchStr);

	@Query("CALL db.index.fulltext.queryNodes(\"actorSearch\", $searchStr) YIELD node, score RETURN node LIMIT 10;")
	List<Actor> fulltextSearchForActors(String searchStr);
	
	@Query("CALL db.index.fulltext.queryNodes(\"areaSearch\", $searchStr) YIELD node, score RETURN node LIMIT 10;")
	List<Area> fulltextSearchForAreas(String searchStr);
	
	@Query("CALL db.index.fulltext.queryNodes(\"documentSearch\", $searchStr) YIELD node, score RETURN node LIMIT 10;")
	List<Document> fulltextSearchForDocuments(String searchStr);
	
	@Query("CALL db.index.fulltext.queryNodes(\"permissionSearch\", $searchStr) YIELD node, score RETURN node LIMIT 10;")
	List<Permission> fulltextSearchForPermissions(String searchStr);

	@Query("MATCH (node) WHERE node.title IN $searchStrings RETURN node;")
	List<NodeDTO> findAllByTitle(@Param("searchStrings") List<String> searchStrings);

	
}
