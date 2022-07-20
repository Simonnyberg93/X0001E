import { Component, Input, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-actor-card',
  templateUrl: './actor-card.component.html',
  styleUrls: ['./actor-card.component.css'],
})
export class ActorCardComponent implements OnInit {
  @Input() actor: any = new Object();

  constructor(private routeService: RouteService) {}

  ngOnInit(): void {}

  cutAllExceptHostName(url: string): string {
    let result = url
      .replace('www.', '')
      .replace('http://', '')
      .replace('https://', '')
      .replace('.se', '')
      .replace('.com', '');
    return result;
  }

  routeToActorpage() {
    this.routeService.openActorPage(this.actor.id);
  }
}
