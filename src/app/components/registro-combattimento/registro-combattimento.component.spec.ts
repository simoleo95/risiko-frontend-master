import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCombattimentoComponent } from './registro-combattimento.component';

describe('RegistroCombattimentoComponent', () => {
  let component: RegistroCombattimentoComponent;
  let fixture: ComponentFixture<RegistroCombattimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroCombattimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroCombattimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
