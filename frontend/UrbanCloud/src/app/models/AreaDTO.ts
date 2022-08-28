import { ActorDTO } from './ActorDTO';
import { DocumentDTO } from './DocumentDTO';
import { PermissionDTO } from './PermissionDTO';

export class AreaDTO {
  id: number;
  title: string;
  description: string;
  siteUrl: string;
  relatedActors: Array<ActorDTO>;
  includes: Array<DocumentDTO>;

  constructor(
    id: number,
    title: string,
    description: string,
    siteUrl: string,
    relatedActors: Array<ActorDTO>,
    includes: Array<DocumentDTO>
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.siteUrl = siteUrl;
    this.relatedActors = relatedActors;
    this.includes = includes;
  }
}
