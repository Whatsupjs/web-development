import React, { Component } from 'react';
import MainContainer from './MainContainer';
import moment from 'moment';

class Employees extends Component {
    constructor() {
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

    render() {
        return(
            <MainContainer sidebar="Employees">
                <h1 className="page-header">Employees</h1>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Name &amp; Posistion</th>
                            <th>Address</th>
                            <th>Phone Num</th>
                            <th>Hire Date</th>
                            <th>Salary Bonus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employees.map((employee, index) => {
                            let HireDate = moment(employee.HireDate).utc().format('LL');
                            let Address = employee.AddressStreet + ", " + employee.AddressState + " " + employee.AddressCity + ", " + employee.AddressZip;

                            return(
                                <tr>
                                    <td key={index}>{employee.FirstName} {employee.LastName} - {employee.Position.PositionName} </td>
                                    <td key={index}>{Address}</td>
                                    <td key={index}>{employee.PhoneNum} ex: {employee.Extension}</td>
                                    <td key={index}>{HireDate}</td>
                                    <td key={index}>$ {employee.SalaryBonus}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </MainContainer>
        );
    }
}
export default Employees;