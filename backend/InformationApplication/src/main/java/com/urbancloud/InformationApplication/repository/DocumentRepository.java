package com.urbancloud.InformationApplication.repository;

import java.util.List;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.urbancloud.InformationApplication.models.Document;

@Repository
public interface DocumentRepository extends Neo4jRepository<Document, Long> {

	@Query("MATCH(document:Document) WHERE document.title <> 'notEq' RETURN document")
	List<Document> fetchAll();
	
	@Query("CALL db.index.fulltext.queryNodes(\"documentSearch\", $searchStr) YIELD node, score RETURN node LIMIT $limit;")
	List<Document> fulltextSearch(@Param("searchStr") String searchStr, @Param("limit") int limit);

	@Query("MATCH (n:Document) WHERE n.source = $source RETURN n;")
	List<Document> findBySource(@Param("source") String source);
}
