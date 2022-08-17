import { AreaDTO } from './AreaDTO';
import { PermissionDTO } from './PermissionDTO';

export class ActorDTO {
  id: number;
  title: string;
  description: string;
  siteUrl: string;
  imageUrl: string;
  relatedAreas: Array<AreaDTO>;
  relatedActors: Array<ActorDTO>;
  permissions: Array<PermissionDTO>;

  constructor(
    id: number,
    title: string,
    description: string,
    siteUrl: string,
    imageUrl: string,
    relatedAreas: Array<AreaDTO>,
    relatedActors: Array<ActorDTO>,
    permissions: Array<PermissionDTO>
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.siteUrl = siteUrl;
    this.imageUrl = imageUrl;
    this.relatedAreas = relatedAreas;
    this.relatedActors = relatedActors;
    this.permissions = permissions;
  }
}
