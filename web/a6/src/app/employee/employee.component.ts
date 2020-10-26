import { Component, OnInit } from '@angular/core';
import { EmployeeRaw } from '../data/EmployeeRaw';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../data/employee.service';
import { PositionService } from '../data/position.service';
import { Position } from '../data/position';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  paramSubscription: any;
  employeeSubscription: any;
  getPositionsSubscription: any;
  saveEmployeeSubscription: any;
  employee: EmployeeRaw;
  positions: Position[];
  successMessage = false;
  failMessage = false;

  constructor(private emp: EmployeeService, private route: ActivatedRoute, private pos: PositionService) { }

  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe(params => {
      this.employeeSubscription = this.emp.getEmployee(params['id']).subscribe(data => {
        this.employee = data[0];
      }),

      this.getPositionsSubscription = this.pos.getPositions().subscribe(data => {
        this.positions = data;
      });
    });
  }

  onSubmit(){
    this.saveEmployeeSubscription = this.emp.saveEmployee(this.employee).subscribe(() => {
      this.successMessage = true;

      setTimeout(() => {
        this.successMessage = false;
      }, 2500)
    },
    (err) => {
      this.failMessage = true;
      console.log(err);

      setTimeout(() => {
        this.failMessage = false;
      }, 2500);
    });
  }

  ngOnDestroy(){
    if(this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
    
    if(this.employeeSubscription) {
      this.employeeSubscription.unsubscribe();
    }

    if(this.getPositionsSubscription) {
      this.getPositionsSubscription.unsubscribe();
    }

    if(this.saveEmployeeSubscription) {
      this.saveEmployeeSubscription.unsubscribe();
    }
  }
}
