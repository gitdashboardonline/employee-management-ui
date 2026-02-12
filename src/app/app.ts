import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Employees } from './employees/employees';
import { Attendance } from './attendance/attendance';
import { AttendanceDialog } from './attendance-dialog/attendance-dialog';

@Component({
  selector: 'app-root',
  imports: [Employees, Attendance],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('employee-management');
}
