import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';

export interface NodeObject {
  id: number;
  title: string;
  siteUrl: string;
  label: string;
}
@Component({
  selector: 'app-faulty-objects-table',
  templateUrl: './faulty-objects-table.component.html',
  styleUrls: ['./faulty-objects-table.component.css'],
})
export class FaultyObjectsTableComponent {
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title', 'siteUrl', 'label', 'save'];
  data: NodeObject[] = [];
  dataSource = new MatTableDataSource(this.data);
  service: DataService;

  constructor(private dataService: DataService) {
    this.service = dataService;
    this.loadData();
  }

  loadData() {
    this.service.findNodesWithFaultyUrl().subscribe({
      next: (value: Array<any>) => {
        value.forEach((obj) => {
          this.data.push({
            id: obj.id,
            title: obj.title,
            siteUrl: obj.siteUrl,
            label: obj.label,
          });
        });
        this.dataSource = new MatTableDataSource(this.data);
      },
      error: (err) => console.error(err),
    });
  }

  saveData(id: number, newUrl: string) {
    console.log(`Update item: ${id}, set url to: ${newUrl}`);
    this.dataService.updateUrl(id, newUrl).subscribe({
      next: (value: string) => {
        console.log(`Response: ${value}`);
        this.data = [];
        this.loadData();
      },
      error: (err) => console.error(err),
    });
  }
}
