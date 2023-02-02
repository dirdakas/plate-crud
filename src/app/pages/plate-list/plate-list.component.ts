import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil, Observable, tap } from 'rxjs';

import { ITableItem, TableColumnsEnum } from 'src/app/models';
import { getPlateList, initiatePlateList, isLoading, PlateListState } from 'src/app/state';

@Component({
  selector: 'app-plate-list',
  templateUrl: './plate-list.component.html',
  styleUrls: ['./plate-list.component.scss']
})
export class PlateListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  displayedColumns: string[] = [
    TableColumnsEnum.index,
    TableColumnsEnum.plateNumber,
    TableColumnsEnum.name,
    TableColumnsEnum.lastName,
    TableColumnsEnum.actions,
  ];
  dataSource = new MatTableDataSource<ITableItem>();
  pageSizeOptions = [5, 10, 20];
  isLoading$: Observable<boolean> = this.store$.pipe(select(isLoading));
  tableColumnsEnum = TableColumnsEnum;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private store$: Store<PlateListState>) {}

  ngOnInit(): void {
    this.store$.dispatch(initiatePlateList());

    this.store$
      .pipe(
        select(getPlateList),
        takeUntil(this.destroy$),
        tap(list => this.dataSource.data = list)
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addItem(): void {
    // @TODO: add create modal
    // @TODO: add create func
    console.log('addItem')
  }

  editItem(item: ITableItem): void {
    // @TODO: add edit modal
    // @TODO: add edit func
    console.log('editItem', item);
  }

  deleteItem(item: ITableItem): void {
    // @TODO: add confirmation
    // @TODO: add removal
    console.log('deleteItem', item)
  }
}
