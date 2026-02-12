import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceDialog } from './attendance-dialog';

describe('AttendanceDialog', () => {
  let component: AttendanceDialog;
  let fixture: ComponentFixture<AttendanceDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
