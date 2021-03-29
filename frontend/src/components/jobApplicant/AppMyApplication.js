import React, { Component } from 'react';
import Moment from 'react-moment';
import {
    Container,
    Table
} from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearErrors } from '../../actions/errorActions';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Redirect } from 'react-router-dom';
import JobApplicantNavbar from './JobApplicantNavbar';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/reccreatejob'
})

class AppMyApplication extends Component {

    state = {
        applications: [],
        myapplications: [],
        jobs: [],
        arr: [],
        detailsTitle: [],
        detailsSalary: [],
        detailsName: [],
        detailsStage: [],
        detailsRate: [],
        myDetails: 0
    }

    getAllapplications = () => {
        const { isAuthenticated, user } = this.props.auth;

        axios.get('http://localhost:5000/api/apply')
            .then((response) => {
                this.setState({ applications: response.data });
                console.log('All applications:-');
                console.log(this.state.applications);
                console.log(user.email);

                for (let i = 0, max = this.state.applications.length; i < max; i += 1) {
                    //task_names.push(tasks[i].name);
                    console.log(this.state.applications[i].email);
                    if (user.email === this.state.applications[i].email) {
                        this.setState(prevState => ({
                            myapplications: [...prevState.myapplications, this.state.applications[i]]
                        }));
                    }
                }

                console.log('These are my applications:');
                console.log(this.state.myapplications);



            })
            .catch(function (error) {
                console.log(error);
            })

        this.setState({ myDetails: 1 });

    }

    getAllJobs = () => {
        api.get('/')
            .then(res => {
                console.log('Getting all jobs:');
                console.log(res);
                this.setState({ jobs: res.data });
                console.log(this.state.jobs);

                this.setState(prevState => ({
                    arr: [...prevState.arr, ...this.state.jobs]
                }));

                console.log('The array is:-')
                console.log(this.state.arr);

                var today = Date.now();
                console.log('Today:');
                console.log(today);


                for (let i = 0, max = this.state.arr.length; i < max; i += 1) {
                    //task_names.push(tasks[i].name);
                    //console.log(this.state.arr[i].deadline);
                    var curr = this.state.arr[i].deadline;
                    var newDate = new Date(curr).getTime();
                    console.log(newDate);

                    var array = [... this.state.arr];
                    if (newDate < today) {
                        array.splice(i, 1);
                        console.log('Spliced = ')
                        console.log(this.state.arr[i])
                        this.setState({ arr: array });
                    }
                }


            })
            .catch(function (error) {
                console.log(error);
            })

        this.setState({ myDetails: 2 });
    }

    getDetailsTitle = () => {
        for (let j = 0, max = this.state.myapplications.length; j < max; j += 1) {
            for (let i = 0, max = this.state.arr.length; i < max; i += 1) {
                if (this.state.arr[i]._id === this.state.myapplications[j].job_id) {
                    this.state.detailsTitle[i] = this.state.arr[i].title_job;
                }
            }
        }
    }

    getDetailsSalary = () => {
        for (let j = 0, max = this.state.myapplications.length; j < max; j += 1) {
            for (let i = 0, max = this.state.arr.length; i < max; i += 1) {
                if (this.state.arr[i]._id === this.state.myapplications[j].job_id) {
                    this.state.detailsSalary[i] = this.state.arr[i].salary_monthly;
                }
            }
        }
    }

    getDetailsName = () => {
        for (let j = 0, max = this.state.myapplications.length; j < max; j += 1) {
            for (let i = 0, max = this.state.arr.length; i < max; i += 1) {
                if (this.state.arr[i]._id === this.state.myapplications[j].job_id) {
                    this.state.detailsName[i] = this.state.arr[i].name_of_rec;
                }
            }
        }
    }

    getDetailsStage = () => {
        for (let j = 0, max1 = this.state.myapplications.length; j < max1; j += 1) {
            for (let i = 0, max = this.state.arr.length; i < max; i += 1) {
                if (this.state.arr[i]._id === this.state.myapplications[j].job_id) {
                    console.log('##########')
                    console.log(this.state.myapplications[j].stage_apply)
                    this.state.detailsStage[i] = this.state.myapplications[j].stage_apply;
                }
            }
        }
    }

    getDetailsRating = () => {
        for (let j = 0, max = this.state.myapplications.length; j < max; j += 1) {
            for (let i = 0, max = this.state.arr.length; i < max; i += 1) {
                if (this.state.arr[i]._id === this.state.myapplications[j].job_id) {
                    this.state.detailsRate[i] = this.state.arr[i].rating;
                }
            }
        }
    }

    renderTableDataTitle() {
        this.getDetailsTitle();
        return this.state.detailsTitle.map((person, id) => {
            return (
                <p key={id}>
                    {person}
                </p>
            )
        })
    }

    renderTableDataSalary() {
        this.getDetailsSalary();
        return this.state.detailsSalary.map((person, id) => {
            return (
                <p key={id}>
                    {person}
                </p>
            )
        })
    }

    renderTableDataName() {
        this.getDetailsName();
        return this.state.detailsName.map((person, id) => {
            return (
                <p key={id}>
                    {person}
                </p>
            )
        })
    }

    renderTableDataStage() {
        this.getDetailsStage();
        return this.state.detailsStage.map((person, id) => {
            return (
                <p key={id}>
                    {person}
                </p>
            )
        })
    }

    renderTableDataRating() {
        this.getDetailsRating();
        return this.state.detailsRate.map((person, id) => {
            return (
                <p key={id}>
                    {person}
                </p>
            )
        })
    }


    componentDidMount() {

        this.getAllapplications();
        this.getAllJobs();
    }

    render() {

        return (
            <div>
                <JobApplicantNavbar />

                <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th><strong><tr>Title</tr></strong></th>
                                <th> <strong><tr>Monthly Salary</tr></strong></th>
                                <th> <strong><tr>Recruiter Name</tr></strong></th>
                                <th><strong><tr>Current Stage</tr></strong></th>
                                <th> <strong><tr>Rating</tr></strong></th>
                            </tr>
                        </thead>

                        <tbody>
                            <td>{this.renderTableDataTitle()}</td>
                            <td>{this.renderTableDataSalary()}</td>
                            <td>{this.renderTableDataName()}</td>
                            <td>{this.renderTableDataStage()}</td>
                            <td>{this.renderTableDataRating()}</td>
                        </tbody>
                    </Table>
                </div>

            </div>
            
        )
    }
}

const mapStateToProps = state => ({
    error: state.error,
    auth: state.auth
})

export default connect(mapStateToProps, null)(AppMyApplication);

