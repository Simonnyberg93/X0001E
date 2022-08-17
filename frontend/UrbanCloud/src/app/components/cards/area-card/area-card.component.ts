import { Component, Input, OnInit } from '@angular/core';
import { AreaDTO } from 'src/app/models/AreaDTO';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-area-card',
  templateUrl: './area-card.component.html',
  styleUrls: ['./area-card.component.css'],
})
export class AreaCardComponent implements OnInit {
  @Input() area: AreaDTO = {
    id: 0,
    title: '',
    description: '',
    siteUrl: '',
    relatedActors: [],
    includes: [],
    relatedPermissions: [],
  };
  @Input() showSmallCard: boolean = false;
  constructor(private routeService: RouteService) {}

  ngOnInit(): void {}

  routeToAreapage() {
    this.routeService.openAreaPage(this.area.id.toString());
  }
}
