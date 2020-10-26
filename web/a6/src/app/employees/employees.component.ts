import { Component, OnInit } from '@angular/core';
import { Employee } from '../data/employee';
import { EmployeeService } from '../data/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {

  employees: Employee[];
  getEmployeesSub: any;
  loadingError: boolean = false;
  filteredEmployees: Employee[];

  constructor(private emp: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.getEmployeesSub = this.emp.getEmployees().subscribe(data => {
      this.employees = data;
      this.filteredEmployees = data;
    },
    function(emp) {
      this.loadingError = true;
    })
  }

  routeEmployee(id: string) {
    this.router.navigate(['/employee/', id]);
  }

  onEmployeeSearchKeyUP(event: any){

    let searchtext: string = event.target.value.toLowerCase();

    this.filteredEmployees = this.employees.filter( empl => 
      ((empl.FirstName.toLowerCase().includes(searchtext)) || (empl.LastName.toLowerCase().includes(searchtext))
      || (empl.Position["PositionName"].toLowerCase().includes(searchtext)))
    );
  }

  ngOnDestory(){
    if(this.getEmployeesSub != "undefined") this.getEmployeesSub.unsubscribe();
  }
}
