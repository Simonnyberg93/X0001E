import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-actor-page',
  templateUrl: './actor-page.component.html',
  styleUrls: ['./actor-page.component.css'],
})
export class ActorPageComponent implements OnInit {
  actorId: string = '';
  actorObj: any = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.actorId = String(routeParams.get('actorId'));
    if (this.actorId && this.actorId.length > 0) {
      // fetch data from db
      this.dataService.fetchActorById(this.actorId).subscribe({
        next: (value) => {
          this.actorObj = value;
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      this.errorMessage = 'Ops, something went wrong ...';
    }
  }
}
