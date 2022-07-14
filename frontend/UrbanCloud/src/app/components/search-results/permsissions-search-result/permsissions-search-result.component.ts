import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-permsissions-search-result',
  templateUrl: './permsissions-search-result.component.html',
  styleUrls: ['./permsissions-search-result.component.css'],
})
export class PermsissionsSearchResultComponent implements OnInit {
  @Input() permissions: any[] = [];

  viewPermissionsHighIdx: number = 2;
  viewMorePermissions: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleViewPermissions() {
    if (!this.viewMorePermissions) {
      this.viewPermissionsHighIdx = -1;
      this.viewMorePermissions = !this.viewMorePermissions;
    } else {
      this.viewPermissionsHighIdx = 2;
      this.viewMorePermissions = !this.viewMorePermissions;
    }
  }
}
