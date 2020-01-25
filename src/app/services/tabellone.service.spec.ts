import { TestBed } from '@angular/core/testing';

import { TabelloneService } from './tabellone.service';

describe('TabelloneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TabelloneService = TestBed.get(TabelloneService);
    expect(service).toBeTruthy();
  });
});
