package com.urbancloud.InformationApplication.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.urbancloud.InformationApplication.models.Actor;

@Repository
public interface ActorRepository extends Neo4jRepository<Actor, Long> {
	
	Actor getActorByTitle(String title);

	@Query("MATCH (a:Area) WHERE id(a)=$areaId MATCH (a)-[:ACTIVE_IN]-(b) RETURN b LIMIT 5;")
	List<Actor> fetchByActiveInRelation(@Param("areaId") Long areaId);
	
	@Query("MATCH (a:Actor) WHERE id(a)=$actorId MATCH (a)-[:RELATED_TO]-(b) RETURN b LIMIT 5;")
	List<Actor> fetchByRelatedToRelation(@Param("actorId") Long actorId);
	
	@Query("MATCH(actor:Actor) WHERE actor.title <> 'notEq' RETURN actor")
	List<Actor> fetchAll();
	
	@Query("MATCH (n: Actor) WHERE n.title IN $listOfTitles RETURN n;")
	List<Actor> findMultipleByTitle(@Param("listOfTitles") List<String> listOfTitles);
	
	@Query("MATCH (actor1:Actor) MATCH (actor2:Actor) WHERE id(actor1) = $firstNodeId AND id(actor2) = $secondNodeId MERGE (actor1)-[:RELATED_TO]-(actor2);")
	void addRelatedActor(@Param("firstNodeId") Long firstNodeId, @Param("secondNodeId") Long secondNodeId);
	
	@Query("MATCH (actor:Actor) MATCH (area:Area) WHERE id(actor) = $actorId AND id(area) = $areaId MERGE (area)-[:ACTIVE_IN]-(actor);")
	void addRelatedArea(@Param("actorId") Long actorId, @Param("areaId") Long areaId);

	@Query("MATCH (a:Actor) MATCH (d:Document) WHERE id(a) = $actorId AND id(d) = $documentId MERGE (a)-[:INCLUDES]-(d);")
	void addRelatedDocument(@Param("actorId") Long actorId, @Param("documentId") Long documentId);
	
	@Query("MATCH (a:Actor) MATCH (p:Permission) WHERE id(a) = $actorId AND id(p) = $permissionId MERGE (a)-[:LICENSED_BY]-(p);")
	void addRelatedPermission(@Param("actorId") Long actorId, @Param("permissionId") Long permissionId);

	@Query("MATCH p=shortestPath((x)-[*..6]-(a:Actor)) WHERE id(x)=$ident RETURN a LIMIT 3;")
	List<Actor> fetchByShortestPathToPermission(@Param("ident") Long ident);

	@Query("MATCH (p:Permission) WHERE id(p)=$permissionId MATCH (p)-[:LICENSED_BY]-(a) RETURN a;")
	Actor fetchByLicensedByRelationToPermission(@Param("permissionId") Long permissionId);

	@Query("MATCH (n) WHERE id(n)=$id SET n.validUrl=$validUrl RETURN n.title;")
	Optional<Object> updateValidUrlAttribute(@Param("id") Long id, @Param("validUrl") boolean validUrl);


	
}
