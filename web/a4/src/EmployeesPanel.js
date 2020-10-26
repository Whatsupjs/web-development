import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EmployeesPanel extends Component{
    constructor(){
        super();
        this.state={
            employees:[]
        }
    }

    componentDidMount(){
        fetch("https://calm-temple-53110.herokuapp.com/employees")
        .then(response => response.json())
        .then(data => this.setState({ employees: data}))
        .catch((err) => {
            console.log(err);
        });
    }
    render(){
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Employees</h3>
                </div>
                <div className="panel-body">
                  <div className="table-responsive overview-table">
                    <table className="table table-striped table-bordered">
                      <tbody>
                        {this.state.employees.map((employee, index) => {
                            return(
                                <tr>
                                    <td key={index}>{employee.FirstName} {employee.LastName}</td>
                                    <td key={index}>{employee.Position.PositionName} </td>
                                </tr>
                            )
                        })}
                      </tbody>
                    </table>
                  </div>
                  <Link to='/employees' className="btn btn-primary form-control">View All Employee Data</Link>
                </div>
              </div>
        )
    }
}
export default EmployeesPanel;