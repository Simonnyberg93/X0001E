package com.urbancloud.InformationApplication.repository;

import java.util.List;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.urbancloud.InformationApplication.models.Document;

@Repository
public interface DocumentRepository extends Neo4jRepository<Document, Long> {

	@Query("MATCH(a:Area) WHERE id(a)=$areaId MATCH (a)-[:INCLUDES]-(b) RETURN b LIMIT 5;")
	List<Document> fetchByIncludesRelation(@Param("areaId") Long areaId);
	
	@Query("MATCH(document:Document) WHERE document.title <> 'notEq' RETURN document")
	List<Document> fetchAll();
	
	@Query("MATCH (n:Document) WHERE n.source = $source RETURN n;")
	List<Document> findBySource(@Param("source") String source);

	@Query("MATCH (n: Document) WHERE n.title IN $listOfTitles RETURN n;")
	List<Document> findByTitle(List<String> listOfTitles);

	@Query("MATCH (p:Permission) WHERE id(p)=$permissionId MATCH (p)-[:DERIVES_FROM]-(d) RETURN d;")
	List<Document> fetchDocumentsByDerivesFromRelation(@Param("permissionId") Long permissionId);
}
