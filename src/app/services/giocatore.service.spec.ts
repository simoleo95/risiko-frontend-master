import { TestBed } from '@angular/core/testing';

import { GiocatoreService } from './giocatore.service';

describe('GiocatoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GiocatoreService = TestBed.get(GiocatoreService);
    expect(service).toBeTruthy();
  });
});
