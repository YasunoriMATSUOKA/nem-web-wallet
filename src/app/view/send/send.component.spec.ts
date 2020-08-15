import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule } from '@angular/material/dialog';

import { ViewSendComponent } from './send.component';

describe('ViewSendComponent', () => {
  let component: ViewSendComponent;
  let fixture: ComponentFixture<ViewSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSendComponent],
      imports: [MatDialogModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
