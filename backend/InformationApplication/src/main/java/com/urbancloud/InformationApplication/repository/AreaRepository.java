package com.urbancloud.InformationApplication.repository;

import java.util.List;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.urbancloud.InformationApplication.models.Area;

@Repository
public interface AreaRepository extends Neo4jRepository<Area, Long> {

	@Query("MATCH(area:Area) WHERE area.title <> 'notEq' RETURN area")
	List<Area> fetchAll();

	@Query("MATCH (area:Area) MATCH (document:Document) WHERE id(area) = $areaId AND id(document) = $documentId MERGE (area)-[:INCLUDES]->(document);")
	void addIncludedDocument(@Param("areaId") Long areaId, @Param("documentId") Long documentId);
	
	@Query("MATCH (a:Area) MATCH (p: Permission) WHERE id(a) = $areaId AND id(p) = $permissionId MERGE (p)-[:RELATES_TO]->(a)")
	void addRelatedPermissions(@Param("areaId") Long areaId, @Param("permissionId") Long permissionId);
	
	@Query("CALL db.index.fulltext.queryNodes(\"areaSearch\", $searchStr) YIELD node, score RETURN node LIMIT $limit;")
	List<Area> fulltextSearch(@Param("searchStr") String searchStr, @Param("limit") int limit);

	@Query("MATCH p=shortestPath( (a:Area {title: $areaTitle})-[*..6]-(b:Area)) RETURN b limit 3;")
	List<Area> findNeighboringAreas(@Param("areaTitle") String areaTitle);

}
