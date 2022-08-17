import { Component, Input, OnInit } from '@angular/core';
import { ActorDTO } from 'src/app/models/ActorDTO';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-actor-card',
  templateUrl: './actor-card.component.html',
  styleUrls: ['./actor-card.component.css'],
})
export class ActorCardComponent implements OnInit {
  @Input() actor: ActorDTO = {
    id: 0,
    title: '',
    description: '',
    siteUrl: '',
    imageUrl: '',
    relatedAreas: [],
    relatedActors: [],
    permissions: [],
  };
  @Input() showSmallCard: boolean = false;

  constructor(private routeService: RouteService) {}

  ngOnInit(): void {}

  cutAllExceptHostName(url: string): string {
    console.log(`URL: ${url}`);
    console.log(`Actor: ${JSON.stringify(this.actor)}`);
    let result = url
      .replace('www.', '')
      .replace('http://', '')
      .replace('https://', '')
      .replace('.se', '')
      .replace('.com', '');
    return result;
  }

  routeToActorpage() {
    this.routeService.openActorPage(this.actor.id.toString());
  }
}
