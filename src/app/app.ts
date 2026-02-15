import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 
import { Employees } from './employees/employees'; 
import { AttendanceDialog } from './attendance-dialog/attendance-dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [Employees, CommonModule, MatIconModule],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('employee-management');
}
