import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: ViewFooterComponent;
  let fixture: ComponentFixture<ViewFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFooterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
