import { DeclareFunctionStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-acter-card',
  templateUrl: './acter-card.component.html',
  styleUrls: ['./acter-card.component.css'],
})
export class ActerCardComponent implements OnInit {
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
