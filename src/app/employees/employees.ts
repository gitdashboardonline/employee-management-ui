import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AttendanceModel } from '../models/attandance.model';
import { MatDialog } from '@angular/material/dialog';
import { AttendanceDialog } from '../attendance-dialog/attendance-dialog';
declare var bootstrap: any;
@Component({
  selector: 'app-employees',
  imports: [FormsModule, CommonModule],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees implements OnInit {
  /**
   *
   */
  loading: boolean = false;
  constructor(
    private EmployeeService: ApiService,
    private dialog: MatDialog,
  ) {
    this.getEmployees();
  }
  ngOnInit(): void {
    this.EmployeeService.getEmployees().subscribe((next) => {
      this.employees = next;
      console.log('data', this.employees);
    });
  }
  form: Employee = {
    employee_id: '',
    full_name: '',
    email: '',
    department: '',
  };
  errorMessage: string = '';

  openAttendanceModal() {}
  addEmployee(data: Employee) {
    this.EmployeeService.addEmployee(data).subscribe(
      () => {
        console.log('added');
      },
      (error) => {
        this.errorMessage = error;
      },
      () => {
        this.getEmployees();
      },
    );
  }
  attendance: AttendanceModel = {
    id: 0,
    employee_id: '',
    attendance_date: new Date('2026-02-12'),
    status: '',
  };
  result: any;
  getattandanceById(empid: number) {
    this.EmployeeService.getAttendance(empid).subscribe(
      (data) => {
        console.log('view', data);
        this.result = data;
      },
      (error) => {},
      () => {
        this.dialog.open(AttendanceDialog, {
          width: '600px',
          data: this.result,
        });
      },
    );
  }

  openModal() {
    const modalElement = document.getElementById('employeeModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  deleteEmployee(id: number) {
    this.EmployeeService.deleteEmployee(id).subscribe(
      () => {
        console.log('deleted');
      },
      (error) => {},
      () => {
        this.getEmployees();
      },
    );
  }
  employees: Employee[] = [];
  getEmployees() {
    this.EmployeeService.getEmployees().subscribe((next) => {
      this.employees = next;
      console.log('data', this.employees);
    });
  }
}
