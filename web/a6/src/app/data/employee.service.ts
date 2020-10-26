import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee } from './employee';
import { EmployeeRaw } from './employeeRaw';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('https://calm-temple-53110.herokuapp.com/employees')
  }

  // Assignment 6 Code

  saveEmployee(employee: EmployeeRaw){
    return this.http.put<any>("https://calm-temple-53110.herokuapp.com/employee/" + employee._id, employee);
  }

  getEmployee(id){
    return this.http.get<EmployeeRaw[]>("https://calm-temple-53110.herokuapp.com/employee-raw/" + id);
  }  

}
