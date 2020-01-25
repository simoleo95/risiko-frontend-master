import { TestBed } from '@angular/core/testing';

import { FullResponceService } from './full-responce.service';

describe('FullResponceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FullResponceService = TestBed.get(FullResponceService);
    expect(service).toBeTruthy();
  });
});
