import { Component, Input, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-small-area-card',
  templateUrl: './small-area-card.component.html',
  styleUrls: ['./small-area-card.component.css'],
})
export class SmallAreaCardComponent implements OnInit {
  @Input() area: any = new Object();
  constructor(private routeService: RouteService) {}

  ngOnInit(): void {}

  routeToAreaPage() {
    this.routeService.openAreaPage(this.area.id);
  }
}
