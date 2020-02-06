import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpostaPedineComponent } from './sposta-pedine.component';

describe('SpostaPedineComponent', () => {
  let component: SpostaPedineComponent;
  let fixture: ComponentFixture<SpostaPedineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpostaPedineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpostaPedineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
