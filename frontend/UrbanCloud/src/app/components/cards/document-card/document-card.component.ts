import { Component, Input, OnInit } from '@angular/core';
import { DocumentDTO } from 'src/app/models/DocumentDTO';

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

  constructor() {}

  ngOnInit(): void {}

  routeToDocumentpage() {
    alert('Not yet implemented!');
  }
}
