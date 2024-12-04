import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCulturesDialogComponent } from './add-edit-cultures-dialog.component';

describe('AddEditCulturesDialogComponent', () => {
  let component: AddEditCulturesDialogComponent;
  let fixture: ComponentFixture<AddEditCulturesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditCulturesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCulturesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
