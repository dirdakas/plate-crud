import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmationModalComponent } from './confirmation-modal.component';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;
  let mockedDialogRef = {
    close(value: boolean) {
      console.log(value);
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockedDialogRef },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            description: 'description',
          },
        },
      ],
    }).compileComponents();

    mockedDialogRef = TestBed.inject(MatDialogRef);
    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true on confirmation', () => {
    spyOn(mockedDialogRef, 'close');

    component.confirm();

    expect(mockedDialogRef.close).toHaveBeenCalled();
    expect(mockedDialogRef.close).toHaveBeenCalledWith(true);
  });
});
