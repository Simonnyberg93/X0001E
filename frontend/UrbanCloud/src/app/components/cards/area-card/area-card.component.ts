import { Component, Input, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-area-card',
  templateUrl: './area-card.component.html',
  styleUrls: ['./area-card.component.css'],
})
export class AreaCardComponent implements OnInit {
  @Input() area: any = new Object();

  constructor(private routeService: RouteService) {}

  ngOnInit(): void {}

  routeToAreapage() {
    console.log(
      `Area: ${this.area}, AreaId: ${this.area.areaId}, ID: ${this.area.id}`
    );
    this.routeService.openAreaPage(this.area.id);
  }
}
