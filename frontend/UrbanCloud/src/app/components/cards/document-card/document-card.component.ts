import { Component, Input, OnInit } from '@angular/core';
import { DocumentDTO } from 'src/app/models/DocumentDTO';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrls: ['./document-card.component.css'],
})
export class DocumentCardComponent implements OnInit {
  @Input() document: DocumentDTO = {
    id: 0,
    title: '',
    source: '',
    description: '',
    siteUrl: '',
    areas: [],
    relatedPermissions: [],
  };
  @Input() showSmallCard: boolean = false;

  constructor(private routeService: RouteService) {}

  ngOnInit(): void {}

  routeToDocumentpage() {
    this.routeService.openDocumentPage(this.document.id.toString());
  }
}
