import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import {
  FaultyObjectsTableDataSource,
  FaultyObjectsTableItem,
} from './faulty-objects-table-datasource';

@Component({
  selector: 'app-faulty-objects-table',
  templateUrl: './faulty-objects-table.component.html',
  styleUrls: ['./faulty-objects-table.component.css'],
})
export class FaultyObjectsTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<FaultyObjectsTableItem>;
  dataSource: FaultyObjectsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title', 'url', 'type'];

  constructor(private dataService: DataService) {
    this.dataSource = new FaultyObjectsTableDataSource(this.dataService);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  saveData(id: number, newUrl: string) {
    console.log(`Update item: ${id}, set url to: ${newUrl}`);
  }
}
