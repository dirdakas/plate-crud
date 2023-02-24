import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { createPlate, updatePlate } from '../../../../state';
import { EditItemModalComponent } from './edit-item-modal.component';

describe('EditItemModalComponent', () => {
  let component: EditItemModalComponent;
  let fixture: ComponentFixture<EditItemModalComponent>;
  let store: MockStore<unknown>;
  let mockedDialogRef = {
    close(value: boolean) {
      console.log(value);
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditItemModalComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: mockedDialogRef },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            item: {
              plate: 'aaa123',
              name: 'name',
              lastName: 'lastName',
              id: 0,
            },
            currPlates: ['aaa111'],
          },
        },
        provideMockStore(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    mockedDialogRef = TestBed.inject(MatDialogRef);
    fixture = TestBed.createComponent(EditItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill in data for edit', () => {
    expect(component.plateForm.value).toEqual({
      plate: 'aaa123',
      name: 'name',
      lastName: 'lastName',
    });
  });

  describe('form validation', () => {
    it('should set error for each field as for required rule', () => {
      component.plateForm.controls['plate'].setValue('');
      component.plateForm.controls['name'].setValue('');
      component.plateForm.controls['lastName'].setValue('');

      expect(component.plateForm.valid).toBe(false);
      expect(component.plateForm.controls['plate'].hasError('required')).toBe(
        true
      );
      expect(component.plateForm.controls['name'].hasError('required')).toBe(
        true
      );
      expect(
        component.plateForm.controls['lastName'].hasError('required')
      ).toBe(true);
    });

    it('should set error for each field as for minLength rule', () => {
      component.plateForm.controls['plate'].setValue('a');
      component.plateForm.controls['name'].setValue('a');
      component.plateForm.controls['lastName'].setValue('a');

      expect(component.plateForm.valid).toBe(false);
      expect(component.plateForm.controls['plate'].hasError('minlength')).toBe(
        true
      );
      expect(component.plateForm.controls['name'].hasError('minlength')).toBe(
        true
      );
      expect(
        component.plateForm.controls['lastName'].hasError('minlength')
      ).toBe(true);
    });

    it('should set error for plate as for maxLength rule', () => {
      component.plateForm.controls['plate'].setValue('aaaaaaaaa');

      expect(component.plateForm.valid).toBe(false);
      expect(component.plateForm.controls['plate'].hasError('maxlength')).toBe(
        true
      );
    });

    it('should set error for plate if not uniq', () => {
      component.plateForm.controls['plate'].setValue('aaa111');

      expect(component.plateForm.valid).toBe(false);
      expect(component.plateForm.controls['plate'].hasError('notUniq')).toBe(
        true
      );
    });

    it('should set error for plate if incorrect pattern', () => {
      component.plateForm.controls['plate'].setValue('aaaaaa');

      expect(component.plateForm.valid).toBe(false);
      expect(component.plateForm.controls['plate'].hasError('pattern')).toBe(
        true
      );
    });

    it('should set error for name and lastName if contains not only letters', () => {
      component.plateForm.controls['name'].setValue('asd123');
      component.plateForm.controls['lastName'].setValue('asd123');

      expect(component.plateForm.valid).toBe(false);
      expect(component.plateForm.controls['name'].hasError('notLetters')).toBe(
        true
      );
      expect(
        component.plateForm.controls['lastName'].hasError('notLetters')
      ).toBe(true);
    });
  });

  describe('createNewPlate', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
      spyOn(component.plateForm, 'markAllAsTouched');
    });

    it('should mark form as touched to show errors', () => {
      component.plateForm.controls['plate'].setValue('');

      component.createNewPlate();

      expect(store.dispatch).not.toHaveBeenCalled();
      expect(component.plateForm.markAllAsTouched).toHaveBeenCalled();
    });

    it('should dispatch create event and close modal', () => {
      spyOn(mockedDialogRef, 'close');

      component.createNewPlate();

      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        createPlate({
          payload: {
            name: 'name',
            lastName: 'lastName',
            plate: 'AAA123',
          },
        })
      );
      expect(mockedDialogRef.close).toHaveBeenCalled();
      expect(component.plateForm.markAllAsTouched).not.toHaveBeenCalled();
    });
  });

  describe('updatePlate', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
      spyOn(component.plateForm, 'markAllAsTouched');
    });

    it('should mark form as touched to show errors', () => {
      component.plateForm.controls['plate'].setValue('');

      component.updatePlate();

      expect(store.dispatch).not.toHaveBeenCalled();
      expect(component.plateForm.markAllAsTouched).toHaveBeenCalled();
    });

    it('should dispatch update event and close modal', () => {
      spyOn(mockedDialogRef, 'close');

      component.updatePlate();

      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        updatePlate({
          payload: {
            name: 'name',
            lastName: 'lastName',
            id: 0,
            plate: 'AAA123',
          },
        })
      );
      expect(mockedDialogRef.close).toHaveBeenCalled();
      expect(component.plateForm.markAllAsTouched).not.toHaveBeenCalled();
    });
  });
});
