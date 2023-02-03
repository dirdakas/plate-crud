import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil, Observable, tap, filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { ITableItem, TableColumnsEnum } from 'src/app/models';
import {
  deletePlate,
  getPlateList,
  initiatePlateList,
  isLoading,
  PlateListState,
} from 'src/app/state';
import { ConfirmationModalComponent } from 'src/app/components';
import { EditItemModalComponent } from './components';

@Component({
  selector: 'app-plate-list',
  templateUrl: './plate-list.component.html',
  styleUrls: ['./plate-list.component.scss'],
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

  constructor(
    private store$: Store<PlateListState>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(initiatePlateList());

    this.store$
      .pipe(
        select(getPlateList),
        takeUntil(this.destroy$),
        tap(list => (this.dataSource.data = list))
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
    console.log('addItem');
    this.dialog
      .open(EditItemModalComponent)
      .afterClosed()
      .pipe(
        tap(() => {
          console.log('create new item');
          // @TODO: add action
        })
      )
      .subscribe();
  }

  editItem(item: ITableItem): void {
    // @TODO: add edit modal
    // @TODO: add edit func
    console.log('editItem', item);
    this.dialog
      .open(EditItemModalComponent, {
        data: item,
      })
      .afterClosed()
      .pipe(
        tap(() => {
          console.log('edit item');
          // @TODO: edit action
        })
      )
      .subscribe();
  }

  deleteItem(item: ITableItem): void {
    // @TODO: add removal
    console.log('deleteItem', item);
    this.dialog
      .open(ConfirmationModalComponent, {
        data: {
          description: `Are you sure want to remove plate: "${item.plate}"`,
        },
      })
      .afterClosed()
      .pipe(
        filter(confirmed => !!confirmed),
        tap(() => this.store$.dispatch(deletePlate(item)))
      )
      .subscribe();
  }
}
