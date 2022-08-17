package com.urbancloud.InformationApplication.repository;


import java.util.List;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.urbancloud.InformationApplication.models.Actor;


@Repository
public interface ActorRepository extends Neo4jRepository<Actor, Long> {
	
	Actor getActorByTitle(String title);

	@Query("MATCH(actor:Actor) WHERE actor.title <> 'notEq' RETURN actor")
	List<Actor> fetchAll();
	
	@Query("MATCH (actor1:Actor) MATCH (actor2:Actor) WHERE id(actor1) = $firstNodeId AND id(actor2) = $secondNodeId MERGE (actor1)-[:RELATED_TO]-(actor2);")
	void addRelatedActor(@Param("firstNodeId") Long firstNodeId, @Param("secondNodeId") Long secondNodeId);
	
	@Query("MATCH (actor:Actor) MATCH (area:Area) WHERE id(actor) = $actorId AND id(area) = $areaId MERGE (area)-[:ACTIVE_IN]->(actor);")
	void addRelatedArea(@Param("actorId") Long actorId, @Param("areaId") Long areaId);

	@Query("MATCH (a:Actor) MATCH (d:Document) WHERE id(a) = $actorId AND id(d) = $documentId MERGE (a)-[:INCLUDES]->(d);")
	void addRelatedDocument(@Param("actorId") Long actorId, @Param("documentId") Long documentId);
	
	@Query("MATCH (a:Actor) MATCH (p:Permission) WHERE id(a) = $actorId AND id(p) = $permissionId MERGE (a)-[:LICENSED_BY]-(p);")
	void addRelatedPermission(@Param("actorId") Long actorId, @Param("permissionId") Long permissionId);

	@Query("CALL db.index.fulltext.queryNodes(\"actorSearch\", $searchStr) YIELD node, score RETURN node LIMIT $limit;")
	List<Actor> fulltextSearch(@Param("searchStr") String searchStr, @Param("limit") int limit);

}
