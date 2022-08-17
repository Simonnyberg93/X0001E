import { Component, Input, OnInit } from '@angular/core';
import { PermissionDTO } from 'src/app/models/PermissionDTO';

@Component({
  selector: 'app-permission-card',
  templateUrl: './permission-card.component.html',
  styleUrls: ['./permission-card.component.css'],
})
export class PermissionCardComponent implements OnInit {
  @Input() permission: PermissionDTO = {
    id: 0,
    title: '',
    description: '',
    licensedByActor: [],
    laws: [],
  };
  @Input() showSmallCard: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  routeToPermissionPage() {
    alert('Not yet implemented!');
  }
}
