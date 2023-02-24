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

import { IPlateDetails, TableColumnsEnum } from '../../models';
import {
  deletePlate,
  getPlateList,
  initiatePlateList,
  isLoading,
  PlateListState,
} from '../../state';
import { ConfirmationModalComponent } from '../../components';
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
    TableColumnsEnum.id,
    TableColumnsEnum.plateNumber,
    TableColumnsEnum.name,
    TableColumnsEnum.lastName,
    TableColumnsEnum.actions,
  ];
  dataSource = new MatTableDataSource<IPlateDetails>();
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
        tap(list => (this.dataSource.data = [...list]))
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
    this.dialog
      .open(EditItemModalComponent, {
        data: {
          currPlates: this.getAllPlates(),
        },
      })
      .afterClosed()
      .subscribe();
  }

  editItem(item: IPlateDetails): void {
    this.dialog
      .open(EditItemModalComponent, {
        data: {
          item,
          currPlates: this.getAllPlates(item.plate),
        },
      })
      .afterClosed()
      .subscribe();
  }

  deleteItem(item: IPlateDetails): void {
    this.dialog
      .open(ConfirmationModalComponent, {
        data: {
          description: `Are you sure want to remove plate: "${item.plate}"`,
        },
      })
      .afterClosed()
      .pipe(
        filter(confirmed => !!confirmed),
        tap(() => this.store$.dispatch(deletePlate({ payload: item })))
      )
      .subscribe();
  }

  private getAllPlates(notToInclude = ''): string[] {
    return [
      ...this.dataSource.data.reduce((res: string[], curr: IPlateDetails) => {
        return curr.plate === notToInclude ? res : [...res, curr.plate];
      }, []),
    ];
  }
}
