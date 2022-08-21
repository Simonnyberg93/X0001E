package com.urbancloud.InformationApplication.repository;

import java.util.List;


import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.urbancloud.InformationApplication.models.Permission;

@Repository
public interface PermissionRepository extends Neo4jRepository<Permission, Long> {
	
	@Query("MATCH p=shortestPath( (x)-[*..6]-(b:Permission)) WHERE id(x)=$ident RETURN b limit 3;")
	List<Permission> fetchByShortestPathToArea(@Param("ident") Long ident);

	@Query("MATCH(permission:Permission) WHERE permission.title <> 'notEq' RETURN permission")
	List<Permission> fetchAll();
	
	@Query("MATCH (p:Permission) MATCH (d:Document) WHERE id(p) = $permissionId AND id(d) = documentId MERGE (d)-[:DERIVES_FROM]-(p);")
	void addPermissionToDocumentRelation(@Param("permissionId") Long permissionId, @Param("documentId") Long documentId);
	
	@Query("CALL db.index.fulltext.queryNodes(\"permissionSearch\", $searchStr) YIELD node, score RETURN node LIMIT $limit;")
	List<Permission> fulltextSearch(@Param("searchStr") String searchStr, @Param("limit") int limit);

	@Query("MATCH (a:Actor) WHERE id(a)=$actorId MATCH (a)-[:LICENSED_BY]-(b) RETURN b;")
	List<Permission> fetchPermissionsByLicensedByRelation(@Param("actorId") Long actorId);
	
}
