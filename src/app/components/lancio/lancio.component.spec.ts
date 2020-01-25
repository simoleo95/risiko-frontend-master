import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LancioComponent } from './lancio.component';

describe('LancioComponent', () => {
  let component: LancioComponent;
  let fixture: ComponentFixture<LancioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LancioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LancioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
