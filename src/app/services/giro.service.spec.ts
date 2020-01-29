import { TestBed } from '@angular/core/testing';

import { GiroService } from './giro.service';

describe('GiroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GiroService = TestBed.get(GiroService);
    expect(service).toBeTruthy();
  });
});
