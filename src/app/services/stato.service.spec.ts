import { TestBed } from '@angular/core/testing';

import { StatoService } from './stato.service';

describe('StatoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatoService = TestBed.get(StatoService);
    expect(service).toBeTruthy();
  });
});
