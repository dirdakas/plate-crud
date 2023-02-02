import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { IPlateDetails } from 'src/app/models/plate-details.model';
import { TableColumnsEnum } from 'src/app/models/table-columns.enum';
import { ITableItem } from 'src/app/models/table-item.model';
import dataFile from 'src/assets/data.json';

@Component({
  selector: 'app-plate-list',
  templateUrl: './plate-list.component.html',
  styleUrls: ['./plate-list.component.scss']
})
export class PlateListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  displayedColumns: string[] = [TableColumnsEnum.index, TableColumnsEnum.plateNumber, TableColumnsEnum.name, TableColumnsEnum.lastName];
  dataSource = new MatTableDataSource<ITableItem>();
  pageSizeOptions = [5, 10, 20];


  ngOnInit(): void {
    this.dataSource.data = dataFile.dataList.map((item: IPlateDetails, index: number) => ({...item, index}))
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
