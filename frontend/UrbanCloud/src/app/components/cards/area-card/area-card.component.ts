import { Component, Input, OnInit } from '@angular/core';
import { AreaDTO } from 'src/app/models/AreaDTO';
import { DocumentDTO } from 'src/app/models/DocumentDTO';
import { DataService } from 'src/app/services/data.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-area-card',
  templateUrl: './area-card.component.html',
  styleUrls: ['./area-card.component.css'],
})
export class AreaCardComponent implements OnInit {
  @Input() area: AreaDTO = {
    id: -1,
    title: '',
    description: '',
    siteUrl: '',
    relatedActors: [],
    includes: [],
  };
  @Input() showSmallCard: boolean = false;
  constructor(
    private routeService: RouteService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    // fetch include objects
    this.dataService.fetchDocumentsByIncludeRelation(this.area.id).subscribe({
      next: (value: Array<DocumentDTO>) =>
        (this.area.includes = value.slice(0, 3)),
      error: (err) => console.error(err),
    });
  }

  routeToAreapage() {
    this.routeService.openAreaPage(this.area.id.toString());
  }
}
