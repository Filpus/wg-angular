import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationAssignComponent } from './nation-assign.component';

describe('NationAssigneeManagementComponent', () => {
  let component: NationAssignComponent;
  let fixture: ComponentFixture<NationAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NationAssignComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NationAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
