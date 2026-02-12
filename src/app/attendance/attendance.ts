import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../services/employee.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Employee } from '../models/employee.model';
import { AttendanceModel } from '../models/attandance.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-attendance',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './attendance.html',
  styleUrl: './attendance.css',
})
export class Attendance implements OnInit {
  markAttendance() {
    this.attanceservice.markAttendance(this.attendance).subscribe(
      () => {
        console.log('marked');
      },
      (error) => {},
      () => {
        this.toastr.success('Attendance marked successfully!', 'Success');
      },
    );
  }

  employees: Employee[] = [];
  constructor(
    private attanceservice: ApiService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    this.attanceservice.getEmployees().subscribe((data) => {
      this.employees = data;
      setTimeout(() => {
        this.cd.detectChanges();
      });
    });
  }
  attendance: AttendanceModel = {
    id: 0,
    employee_id: '',
    attendance_date: new Date('2026-02-12'),
    status: '',
  };
}
