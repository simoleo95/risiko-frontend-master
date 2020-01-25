import { TestBed } from '@angular/core/testing';

import { AttaccoService } from './attacco.service';

describe('AttaccoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttaccoService = TestBed.get(AttaccoService);
    expect(service).toBeTruthy();
  });
});
