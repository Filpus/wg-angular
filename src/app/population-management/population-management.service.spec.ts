import { TestBed } from '@angular/core/testing';

import { PopulationManagementService } from './population-management.service';

describe('PopulationManagementService', () => {
  let service: PopulationManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopulationManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
