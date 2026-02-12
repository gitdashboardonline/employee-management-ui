import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AttendanceModel } from '../models/attandance.model';
import { MatDialog } from '@angular/material/dialog';
import { AttendanceDialog } from '../attendance-dialog/attendance-dialog';
import { ToastRef, ToastrService } from 'ngx-toastr';
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
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
  ) {}
  ngOnInit(): void {
    this.getEmployees();
  }
  form: Employee = {
    employee_id: '',
    full_name: '',
    email: '',
    department: '',
  };
  errorMessage: string = '';

  openAttendanceModal() {}
  addEmployee(empForm: NgForm) {
    // If form invalid → show errors
    if (empForm.invalid) {
      empForm.control.markAllAsTouched();
      return;
    }

    // Create new employee object
    const newEmployee: Employee = {
      ...this.form,
      id: Date.now(), // temporary ID
    };

    //this.employees.push(newEmployee);

    console.log('Employee Added:', newEmployee);
    this.addEmployeeData(newEmployee);
    // Reset form
    empForm.resetForm();

    // Reset model explicitly (important in template-driven forms)
    this.form = {
      employee_id: '',
      full_name: '',
      email: '',
      department: '',
    };

    this.errorMessage = '';
  }
  addEmployeeData(data: Employee) {
    this.EmployeeService.addEmployee(data).subscribe(
      () => {
        console.log('added');
      },
      (error) => {
        this.errorMessage = error;
        console.log(error);
        this.toastr.error('Failed to add employees due to' + error.error.detail, 'Error');
      },
      () => {
        this.getEmployees();
        this.toastr.success('Employees Added successfully!', 'Success');
      },
    );
  }

  markAttendance() {
    this.EmployeeService.markAttendance(this.attendance).subscribe(
      () => {
        console.log('marked');
      },
      (error) => {
        this.toastr.error('Failed to mark attendance due to ' + error.error.detail, 'Error');
      },
      () => {
        this.toastr.success('Attendance marked successfully!', 'Success');
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
        this.toastr.success('Employee deleted successfully!', 'Success');
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
      this.cd.detectChanges();
    });
  }
}
