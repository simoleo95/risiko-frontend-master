import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedineBonusComponent } from './pedine-bonus.component';

describe('PedineBonusComponent', () => {
  let component: PedineBonusComponent;
  let fixture: ComponentFixture<PedineBonusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedineBonusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedineBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
