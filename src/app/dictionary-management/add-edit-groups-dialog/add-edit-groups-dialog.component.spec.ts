import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditGroupsDialogComponent } from './add-edit-groups-dialog.component';

describe('AddEditGroupsDialogComponent', () => {
  let component: AddEditGroupsDialogComponent;
  let fixture: ComponentFixture<AddEditGroupsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditGroupsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditGroupsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
