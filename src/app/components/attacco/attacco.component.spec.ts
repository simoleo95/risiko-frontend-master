import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttaccoComponent } from './attacco.component';

describe('AttaccoComponent', () => {
  let component: AttaccoComponent;
  let fixture: ComponentFixture<AttaccoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttaccoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttaccoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
