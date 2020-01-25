import { TestBed } from '@angular/core/testing';

import { RegistroCombattimentoService } from './registro-combattimento.service';

describe('RegistroCombattimentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistroCombattimentoService = TestBed.get(RegistroCombattimentoService);
    expect(service).toBeTruthy();
  });
});
