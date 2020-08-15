import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { SendComponent } from './send.component';

describe('SendComponent', () => {
  let component: SendComponent;
  let fixture: ComponentFixture<SendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SendComponent],
      imports: [MatSnackBarModule, MatDialogModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
