import { Component, Input, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-small-actor-card',
  templateUrl: './small-actor-card.component.html',
  styleUrls: ['./small-actor-card.component.css'],
})
export class SmallActorCardComponent implements OnInit {
  @Input() actor: any = new Object();

  constructor(private routeService: RouteService) {}

  ngOnInit(): void {}

  routeToActorPage() {
    this.routeService.openActorPage(this.actor.id);
  }
}
