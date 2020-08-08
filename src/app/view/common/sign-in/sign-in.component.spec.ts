import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: ViewSignInComponent;
  let fixture: ComponentFixture<ViewSignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSignInComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
