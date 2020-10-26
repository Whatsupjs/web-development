import React, { Component } from 'react';
import MainContainer from './MainContainer';
import moment from 'moment';

class Projects extends Component {
    constructor() {
        super();
        this.state={
            projects:[]
        }
    }

    componentDidMount(){
        fetch("https://calm-temple-53110.herokuapp.com/projects")
        .then(response => response.json())
        .then(data => this.setState({ projects: data}))
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        return(
            <MainContainer sidebar="Projects">
                <h1 className="page-header">Projects</h1>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.projects.map((project, index) => {
                            let startDate = moment(project.ProjectStartDate).utc().format('LL');
                            let endDate = "";

                            if(project.ProjectEndDate == null){
                                endDate = "n/a";
                            } else {
                                endDate = moment(project.ProjectEndDate).utc().format('LL');
                            }

                            return(
                                <tr>
                                    <td key={index}>{project.ProjectName}</td>
                                    <td key={index}>{project.ProjectDescription}</td>
                                    <td key={index}>{startDate}</td>
                                    <td key={index}>{endDate}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </MainContainer>
        );
    }
}
export default Projects;