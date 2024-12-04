import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryManagementComponent } from './dictionary-management.component';

describe('DictionaryManagementComponent', () => {
  let component: DictionaryManagementComponent;
  let fixture: ComponentFixture<DictionaryManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DictionaryManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictionaryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
