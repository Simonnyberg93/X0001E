import { ActorDTO } from './ActorDTO';
import { DocumentDTO } from './DocumentDTO';

export class PermissionDTO {
  id: number;
  title: string;
  description: string;
  licensedByActor: Array<ActorDTO>;
  laws: Array<DocumentDTO>;

  constructor(
    id: number,
    title: string,
    description: string,
    licensedByActor: Array<ActorDTO>,
    laws: Array<DocumentDTO>
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.licensedByActor = licensedByActor;
    this.laws = laws;
  }
}
