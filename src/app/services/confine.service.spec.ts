import { TestBed } from '@angular/core/testing';

import { ConfineService } from './confine.service';

describe('ConfineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfineService = TestBed.get(ConfineService);
    expect(service).toBeTruthy();
  });
});
