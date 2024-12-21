import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPopDialogComponent } from './add-edit-pop-dialog.component';

describe('AddEditPopDialogComponent', () => {
  let component: AddEditPopDialogComponent;
  let fixture: ComponentFixture<AddEditPopDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditPopDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPopDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
