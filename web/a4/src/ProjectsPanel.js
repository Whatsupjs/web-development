import React, { Component } from 'react';
import moment from 'moment'; //npm install --save moment
import { Link } from 'react-router-dom';


class ProjectsPanel extends Component{
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
            <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Projects</h3>
                </div>
                <div className="panel-body">
                  <div className="table-responsive overview-table">
                    <table className="table table-striped table-bordered">
                      <tbody>
                        {this.state.projects.map((project, index) => {
                            let days = moment().diff(moment(project.ProjectStartDate), 'days');

                            return(
                                <tr>
                                    <td key={index}>{project.ProjectName}</td>
                                    <td key={index}>Active {days} days</td>
                                </tr>
                            );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <Link to='/projects' className="btn btn-primary form-control">View All Project Data</Link>
                </div>
              </div>
        )
    }
}

export default ProjectsPanel;


