import { TestBed } from '@angular/core/testing';

import { NationAssignService } from './nation-assign.service';

describe('NationAssignService', () => {
  let service: NationAssignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NationAssignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
