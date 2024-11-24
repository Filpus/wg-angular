import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationManagementComponent } from './population-management.component';

describe('PopulationManagementComponent', () => {
  let component: PopulationManagementComponent;
  let fixture: ComponentFixture<PopulationManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopulationManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopulationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
