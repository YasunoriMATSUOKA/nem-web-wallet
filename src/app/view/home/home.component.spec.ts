import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: ViewHomeComponent;
  let fixture: ComponentFixture<ViewHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewHomeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
