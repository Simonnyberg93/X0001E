import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-area-page',
  templateUrl: './area-page.component.html',
  styleUrls: ['./area-page.component.css'],
})
export class AreaPageComponent implements OnInit {
  areaId: string = '';
  areaObj: any = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.areaId = String(routeParams.get('areaId'));
    if (this.areaId && this.areaId.length > 0) {
      // fetch data from db
      this.dataService.fetchAreaById(this.areaId).subscribe({
        next: (value) => {
          this.areaObj = value;
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      this.errorMessage = 'Ops something went wrong..';
    }
  }
}
