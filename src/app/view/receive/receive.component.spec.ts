import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReceiveComponent } from './receive.component';

describe('ViewReceiveComponent', () => {
  let component: ViewReceiveComponent;
  let fixture: ComponentFixture<ViewReceiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewReceiveComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
