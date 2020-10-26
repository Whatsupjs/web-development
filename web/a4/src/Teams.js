import React, { Component } from 'react';
import MainContainer from './MainContainer';

class Teams extends Component {
    constructor() {
        super();
        this.state={
            teams:[]
        }
    }

    componentDidMount(){
        fetch("https://calm-temple-53110.herokuapp.com/teams")
        .then(response => response.json())
        .then(data => this.setState({ teams: data}))
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        return(
            <MainContainer sidebar="Teams">
                <h1 className="page-header">Teams</h1>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Projects</th>
                            <th>Employees</th>
                            <th>Team Lead</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.teams.map((team, index) => {

                            return(
                                <tr>
                                    <td key={index}>{team.TeamName}</td>
                                    <td key={index}>
                                        <ul>
                                        {team.Projects.map((project, index) => {
                                            return(
                                                <li key={index}>{project.ProjectName}</li>
                                            )
                                        })}
                                        </ul>
                                    </td>
                                    <td key={index}>{team.Employees.length} Employees</td>
                                    <td key={index}>{team.TeamLead.FirstName} {team.TeamLead.LastName}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </MainContainer>
        );
    }
}
export default Teams;