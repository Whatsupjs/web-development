import { Component, OnInit } from '@angular/core';
import { Employee } from '../data/employee';
import { EmployeeService } from '../data/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];
  getEmployeesSub: any;
  loadingError: boolean = false;

  constructor(private emp: EmployeeService) { }

  ngOnInit() {
    this.getEmployeesSub = this.emp.getEmployees().subscribe(data => {
      this.employees = data
    },
    function(emp) {
      this.loadingError = true;
    })
  }

  ngOnDestory(){
    if(this.getEmployeesSub != "undefined") this.getEmployeesSub.unsubscribe();
  }

}
