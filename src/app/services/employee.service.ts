import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl;  
  //private baseUrl = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get<Employee[]>(`${this.baseUrl}/employees`);
  }

  addEmployee(data: Employee) {
    return this.http.post(`${this.baseUrl}/employees`, data);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.baseUrl}/employees/${id}`);
  }

  markAttendance(data: any) {
    return this.http.post(`${this.baseUrl}/attendance`, data);
  }

  getAttendance(empId: number) {
    return this.http.get(`${this.baseUrl}/attendance/${empId}`);
  }
}
