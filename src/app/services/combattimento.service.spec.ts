import { TestBed } from '@angular/core/testing';

import { CombattimentoService } from './combattimento.service';

describe('CombattimentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CombattimentoService = TestBed.get(CombattimentoService);
    expect(service).toBeTruthy();
  });
});
