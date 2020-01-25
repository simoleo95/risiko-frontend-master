import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelloneListComponent } from './tabellone-list.component';

describe('TabelloneListComponent', () => {
  let component: TabelloneListComponent;
  let fixture: ComponentFixture<TabelloneListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelloneListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelloneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
