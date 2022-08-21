import { Component, Input, OnInit } from '@angular/core';
import { ActorDTO } from 'src/app/models/ActorDTO';
import { AreaDTO } from 'src/app/models/AreaDTO';
import { DocumentDTO } from 'src/app/models/DocumentDTO';
import { PermissionDTO } from 'src/app/models/PermissionDTO';

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.css'],
})
export class SearchSectionComponent implements OnInit {
  @Input() actors: Array<ActorDTO> = [];
  @Input() areas: Array<AreaDTO> = [];
  @Input() documents: Array<DocumentDTO> = [];
  @Input() permissions: Array<PermissionDTO> = [];

  actorSectionHeader: string = 'Aktörer';
  areaSectionHeader: string = 'Områden';
  documentSectionHeader: string = 'Dokument';

  @Input() notSearchResult: boolean = false;

  viewMoreDocuments: boolean = false;
  viewDocumentsHighIdx: number = 4;

  viewMoreActors: boolean = false;
  viewActorsHighIdx: number = 4;

  viewMoreAreas: boolean = false;
  viewAreasHighIdx: number = 4;

  viewMorePermissions: boolean = false;
  viewPermissionsHighIdx: number = 4;

  constructor() {}

  ngOnInit(): void {
    if (this.notSearchResult) {
      this.actorSectionHeader = 'Aktörer kopplat till din yrkesroll';
      this.areaSectionHeader = 'Intressanta områden att utforska';
      this.documentSectionHeader =
        'Dokument kopplat till dina angivna intressen';
    }
  }

  toggleViewActors() {
    if (!this.viewMoreActors) {
      this.viewActorsHighIdx = -1;
      this.viewMoreActors = !this.viewMoreActors;
    } else {
      this.viewActorsHighIdx = 4;
      this.viewMoreActors = !this.viewMoreActors;
    }
  }

  toggleViewAreas() {
    if (!this.viewMoreAreas) {
      this.viewAreasHighIdx = -1;
      this.viewMoreAreas = !this.viewMoreAreas;
    } else {
      this.viewAreasHighIdx = 4;
      this.viewMoreAreas = !this.viewMoreAreas;
    }
  }

  toggleViewDocuments() {
    if (!this.viewMoreDocuments) {
      this.viewDocumentsHighIdx = -1;
      this.viewMoreDocuments = !this.viewMoreDocuments;
    } else {
      this.viewDocumentsHighIdx = 4;
      this.viewMoreDocuments = !this.viewMoreDocuments;
    }
  }

  toggleViewPermissions() {
    if (!this.viewMorePermissions) {
      this.viewPermissionsHighIdx = -1;
      this.viewMorePermissions = !this.viewMorePermissions;
    } else {
      this.viewPermissionsHighIdx = 4;
      this.viewMorePermissions = !this.viewMorePermissions;
    }
  }
}
