CREATE CONSTRAINT ON (n:NodeDTO) assert n.neo4jImportId IS UNIQUE;
CREATE CONSTRAINT IF NOT EXISTS ON (n:Area) assert n.neo4jImportId IS UNIQUE;
CREATE CONSTRAINT IF NOT EXISTS ON (n:Actor) assert n.neo4jImportId IS UNIQUE;
CREATE CONSTRAINT IF NOT EXISTS ON (n:Document) assert n.neo4jImportId IS UNIQUE;
CREATE CONSTRAINT IF NOT EXISTS ON (n:Permission) assert n.neo4jImportId IS UNIQUE;
CREATE CONSTRAINT IF NOT EXISTS ON (n:SearchWordTracker) assert n.neo4jImportId IS UNIQUE;
