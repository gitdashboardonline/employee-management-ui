import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { AttendanceModel } from '../models/attandance.model';
@Component({
  selector: 'app-attendance-dialog',
  imports: [CommonModule, MatDialogModule, MatTableModule],
  standalone: true,
  templateUrl: './attendance-dialog.html',
  styleUrl: './attendance-dialog.css',
})
export class AttendanceDialog {
  displayedColumns: string[] = ['attendance_date', 'status'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: AttendanceModel[]) {}
}
