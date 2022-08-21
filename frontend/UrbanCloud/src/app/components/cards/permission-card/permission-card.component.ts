import { Component, Input, OnInit } from '@angular/core';
import { PermissionDTO } from 'src/app/models/PermissionDTO';
import { RouteService } from 'src/app/services/route.service';

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
    licensedByActor: {
      id: 0,
      title: '',
      description: '',
      siteUrl: '',
      imageUrl: '',
      relatedAreas: [],
      relatedActors: [],
      permissions: [],
    },
    laws: [],
  };
  @Input() showSmallCard: boolean = false;

  constructor(private routeService: RouteService) {}

  ngOnInit(): void {}

  routeToPermissionPage() {
    this.routeService.openPermissionPage(this.permission.id.toString());
  }
}
