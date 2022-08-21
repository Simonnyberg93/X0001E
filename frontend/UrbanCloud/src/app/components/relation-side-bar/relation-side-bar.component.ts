import { Component, Input, OnInit } from '@angular/core';
import { ActorDTO } from 'src/app/models/ActorDTO';
import { AreaDTO } from 'src/app/models/AreaDTO';

@Component({
  selector: 'app-relation-side-bar',
  templateUrl: './relation-side-bar.component.html',
  styleUrls: ['./relation-side-bar.component.css'],
})
export class RelationSideBarComponent implements OnInit {
  @Input() actorSectionTitle: string = '';
  @Input() areaSectionTitle: string = '';
  @Input() relatedAreasObj: Array<AreaDTO> = [];
  @Input() relatedActorsObj: Array<ActorDTO> = [];

  constructor() {}

  ngOnInit(): void {}
}
