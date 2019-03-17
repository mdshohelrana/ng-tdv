import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTdvComponent } from './ng-tdv.component';

describe('NgTdvComponent', () => {
  let component: NgTdvComponent;
  let fixture: ComponentFixture<NgTdvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgTdvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgTdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
