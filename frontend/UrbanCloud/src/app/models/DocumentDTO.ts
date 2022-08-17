import { AreaDTO } from './AreaDTO';
import { PermissionDTO } from './PermissionDTO';

export class DocumentDTO {
  id: number;
  title: string;
  source: string;
  description: string;
  siteUrl: string;
  areas: Array<AreaDTO>;
  relatedPermissions: Array<PermissionDTO>;

  constructor(
    id: number,
    title: string,
    source: string,
    description: string,
    siteUrl: string,
    areas: Array<AreaDTO>,
    relatedPermissions: Array<PermissionDTO>
  ) {
    this.id = id;
    this.title = title;
    this.source = source;
    this.description = description;
    this.siteUrl = siteUrl;
    this.areas = areas;
    this.relatedPermissions = relatedPermissions;
  }
}
