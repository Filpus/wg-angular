import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditResoursesDialogComponent } from './add-edit-resourses-dialog.component';

describe('AddEditResoursesDialogComponent', () => {
  let component: AddEditResoursesDialogComponent;
  let fixture: ComponentFixture<AddEditResoursesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditResoursesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditResoursesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
