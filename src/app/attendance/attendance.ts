import { Component } from '@angular/core';
import { ApiService } from '../services/employee.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Employee } from '../models/employee.model';
import { AttendanceModel } from '../models/attandance.model';

@Component({
  selector: 'app-attendance',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './attendance.html',
  styleUrl: './attendance.css',
})
export class Attendance {
  markAttendance() {
    this.attanceservice.markAttendance(this.attendance).subscribe(() => {
      console.log('marked');
    });
  }

 
  employees: Employee[] = [];
  constructor(private attanceservice: ApiService) {
    this.attanceservice.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }
  attendance: AttendanceModel = {
    id: 0,
    employee_id: '',
    attendance_date: new Date('2026-02-12'),
    status: '',
  };
}
