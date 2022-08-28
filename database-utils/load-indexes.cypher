CREATE FULLTEXT INDEX titlesAndDescriptions IF NOT EXISTS FOR (n:Actor|Area|Document|Permission) ON EACH [n.title, n.description];
CREATE FULLTEXT INDEX actorSearch IF NOT EXISTS FOR (n:Actor) ON EACH [n.title, n.description];
CREATE FULLTEXT INDEX areaSearch IF NOT EXISTS FOR (n:Area) ON EACH [n.title, n.description];
CREATE FULLTEXT INDEX documentSearch IF NOT EXISTS FOR (n:Document) ON EACH [n.title, n.description];
CREATE FULLTEXT INDEX permissionSearch IF NOT EXISTS FOR (n:Permission) ON EACH [n.title, n.description];