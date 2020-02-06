import { TestBed } from '@angular/core/testing';

import { SpostaPedineService } from './sposta-pedine.service';

describe('SpostaPedineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpostaPedineService = TestBed.get(SpostaPedineService);
    expect(service).toBeTruthy();
  });
});
