import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

/* -------------------- Angular Material -------------------- */
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

/* -------------------- Third Party -------------------- */
import { ToastrService } from 'ngx-toastr';

/* -------------------- Services & Models -------------------- */
import { ApiService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { AttendanceModel } from '../models/attandance.model';
import { AttendanceDialog } from '../attendance-dialog/attendance-dialog';
import { finalize } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatProgressBarModule,
  ],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees implements OnInit {
  /* ==========================================================
      PROPERTIES
  ========================================================== */

  // Loading flag for UI spinner handling
  loading: boolean = true;

  // Columns displayed in Material table
  displayedColumns: string[] = [
    'employee_id',
    'full_name',
    'email',
    'department',
    'actions',
    'attendance',
  ];

  // Material table data source
  dataSource = new MatTableDataSource<Employee>();

  // Material paginator reference
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Stores employees fetched from API
  employees: Employee[] = [];

  // Form model for employee creation
  form: Employee = {
    employee_id: '',
    full_name: '',
    email: '',
    department: '',
  };

  // Attendance form model
  attendance: AttendanceModel = {
    id: 0,
    employee_id: '',
    attendance_date: new Date(),
    status: '',
  };

  errorMessage: string = '';

  /* ==========================================================
      CONSTRUCTOR
  ========================================================== */

  constructor(
    private employeeService: ApiService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
  ) {}

  /* ==========================================================
      LIFECYCLE HOOK
  ========================================================== */

  ngOnInit(): void {
    this.loadEmployees();
  }

  /* ==========================================================
      EMPLOYEE OPERATIONS
  ========================================================== */

  /**
   * Handles employee form submission
   */
  addEmployee(empForm: NgForm): void {
    if (empForm.invalid) {
      empForm.control.markAllAsTouched();
      return;
    }
    this.loading = true;

    const newEmployee: Employee = {
      ...this.form,
      id: Date.now(), // Temporary ID (backend should ideally generate this)
    };

    this.saveEmployee(newEmployee);

    // Reset form & model
    empForm.resetForm();
    this.resetEmployeeForm();
  }

  /**
   * Calls API to save employee
   */
  private saveEmployee(employee: Employee): void {
    this.employeeService.addEmployee(employee).subscribe({
      next: () => {
        this.toastr.success('Employee added successfully!', 'Success');
      },
      error: (error) => {
        this.toastr.error('Failed to add employee: ' + error?.error?.detail, 'Error');
      },
      complete: () => {
        this.loadEmployees();
      },
    });
  }

  /**
   * Deletes employee by ID
   */
  deleteEmployee(id: number): void {
    this.loading = true;
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.toastr.success('Employee deleted successfully!', 'Success');
      },
      error: () => {
        this.toastr.error('Failed to delete employee', 'Error');
      },
      complete: () => {
        this.loadEmployees();
      },
    });
  }

  /**
   * Fetch all employees from backend
   */
  loadEmployees(): void {
    this.loading = true;

    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.cd.detectChanges();
      },
      error: () => {
        this.toastr.error('Failed to fetch employees', 'Error');
      },
      complete: () => {
        this.loading = false;
        this.dataSource.data = this.employees;
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      },
    });
  }

  /* ==========================================================
      ATTENDANCE OPERATIONS
  ========================================================== */

  /**
   * Marks attendance for selected employee
   */
  markAttendance(form: NgForm): void {
    if (form.invalid) return;
    this.loading = true;

    this.employeeService.markAttendance(this.attendance).subscribe({
      next: () => {
        this.toastr.success('Attendance marked successfully!', 'Success');
        form.resetForm();
      },
      error: (error) => {
        this.toastr.error('Failed to mark attendance: ' + error?.error?.detail, 'Error');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  /**
   * Fetch attendance by employee ID
   * Opens dialog to display attendance data
   */
  viewAttendance(empId: number): void {
    this.loading = true;
    this.employeeService
      .getAttendance(empId)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cd.detectChanges();
        }),
      )
      .subscribe({
        next: (data) => {
          this.dialog.open(AttendanceDialog, {
            width: '600px',
            data: data,
          });
        },
        error: () => {
          this.toastr.error('Failed to fetch attendance', 'Error');
        },
      });
  }

  /* ==========================================================
      UI HELPERS
  ========================================================== */

  /**
   * Opens Bootstrap modal for employee creation
   */
  openModal(): void {
    const modalElement = document.getElementById('employeeModal');
    if (!modalElement) return;

    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  /**
   * Resets employee form model
   */
  private resetEmployeeForm(): void {
    this.form = {
      employee_id: '',
      full_name: '',
      email: '',
      department: '',
    };
  }
}
