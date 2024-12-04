import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditReligionsDialogComponent } from './add-edit-religions-dialog.component';

describe('AddEditReligionsDialogComponent', () => {
  let component: AddEditReligionsDialogComponent;
  let fixture: ComponentFixture<AddEditReligionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditReligionsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditReligionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
