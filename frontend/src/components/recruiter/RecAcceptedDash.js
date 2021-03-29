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
import RecruiterNavbar from './RecruiterNavbar';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/reccreatejob'
})

const api_mypost = axios.create({
    baseURL: 'http://localhost:5000/api/recruiterdash'
})

const api_sort = axios.create({
    baseURL: 'http://localhost:5000/api/apply/getsortjobs/all'
})

class RecAcceptedDash extends Component {

    state = {
        applications: [],
        myapplications: [],
        jobs: [],
        arr: [],
        detailsTitle: [],
        detailsType: [],
        detailsName: [],
        detailsRate: [],
        myDetails: 0,
        mode: 0,
        edit: 0,
        temp: []
    }

    changeSort = (e) => {
        if (e.target.value === 'Name') {
            this.setState({ mode: 1 });
            console.log('Mode of sort')
            console.log(this.state.mode);
        }

        if (e.target.value === 'Job Title') {
            this.setState({ mode: 2 });
            console.log('Mode of sort')
            console.log(this.state.mode);
        }

        if (e.target.value === 'Rating') {
            this.setState({ mode: 3 });
            console.log('Mode of sort')
            console.log(this.state.mode);
        }


    }

    changeOrder = (e) => {
        if (e.target.value === 'Ascending') {
            this.setState({ edit: 1 });
            console.log('Order')
            console.log(this.state.edit);
        }

        if (e.target.value === 'Descending') {
            this.setState({ edit: -1 });
            console.log('Order')
            console.log(this.state.edit);
        }
    }

    applicationSort = () => {
        const { isAuthenticated, user } = this.props.auth;
        console.log(user.email);

        axios.post('http://localhost:5000/api/apply/getsortjobs/all', { edit: this.state.edit, mode: this.state.mode})
        .then(res => {
            console.log('Getting all applications:');
            console.log(res);
            this.setState({ applications: res.data.data });
            console.log('#######################')
            console.log('SORTED ALL JOBS:-')
            console.log(this.state.applications);

            this.setState({ arr: [] });

            this.setState(prevState => ({
                arr: [...prevState.arr, ...this.state.applications]
            }));

            console.log('#######################')
            console.log('SORTED ALL JOBS:-')
            console.log('The array is:-')
            console.log(this.state.arr);
        })

        .catch(function (error) {
            console.log(error);
        })
    }

    recDashSort = () => {

        const { isAuthenticated, user } = this.props.auth;
        console.log(user.email);

        api_mypost.post("/alljobs/sort", {email_of_rec: user.email, edit: this.state.edit, mode: 1})
        .then(res => {
            console.log('Getting all jobs:');
            console.log(res);
            this.setState({ jobs: res.data.data });
            console.log('#######################')
            console.log('SORTED ALL JOBS:-')
            console.log(this.state.jobs);

            this.setState({ arr: [] });

            this.setState(prevState => ({
                arr: [...prevState.arr, ...this.state.jobs]
            }));

            console.log('#######################')
            console.log('SORTED ALL JOBS:-')
            console.log('The array is:-')
            console.log(this.state.arr);

        })
        .catch(function (error) {
            console.log(error);
        })
    }

    onClickSort = () => {

        if(this.state.mode === 2)
        {
            this.recDashSort();
        }

        else
        {
            this.applicationSort();
        }
       
    }

    getAllapplications = () => {
        const { isAuthenticated, user } = this.props.auth;

        axios.get('http://localhost:5000/api/apply')
            .then((response) => {
                this.setState({ applications: response.data });
                console.log('All Applications')
                console.log(this.state.applications);
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    getAcceptedApplicantsTitle = () => {
        var k = 0;
        for (let j = 0, max = this.state.arr.length; j < max; j += 1) {
            for (let i = 0, max = this.state.applications.length; i < max; i += 1) {
                if (this.state.arr[j]._id === this.state.applications[i].job_id) {
                    if (this.state.applications[i].stage_apply === 'accepted') {
                        this.state.detailsTitle[k] = this.state.arr[j].title_job;
                        k += 1;
                    }
                }
            }
        }
    }

    getAcceptedApplicantsName = () => {
        var k = 0;
        for (let j = 0, max = this.state.jobs.length; j < max; j += 1) {
            for (let i = 0, max = this.state.applications.length; i < max; i += 1) {
                if (this.state.jobs[j]._id === this.state.applications[i].job_id) {
                    if (this.state.applications[i].stage_apply === 'accepted') {
                        this.state.detailsName[k] = this.state.applications[i].name;
                        console.log('#######################')
                        console.log(this.state.detailsName[k])
                        k += 1;
                       
                    }
                }
            }
        }
    }

    getAcceptedApplicantsType = () => {
        var k = 0;
        for (let j = 0, max = this.state.jobs.length; j < max; j += 1) {
            for (let i = 0, max = this.state.applications.length; i < max; i += 1) {
                if (this.state.jobs[j]._id === this.state.applications[i].job_id) {
                    if (this.state.applications[i].stage_apply === 'accepted') {
                        this.state.detailsType[k] = this.state.jobs[j].job_type;
                        k += 1;
                    }
                }
            }
        }
    }

    getAcceptedApplicantsRating = () => {
        var k = 0;
        for (let j = 0, max = this.state.jobs.length; j < max; j += 1) {
            for (let i = 0, max = this.state.applications.length; i < max; i += 1) {
                if (this.state.jobs[j]._id === this.state.applications[i].job_id) {
                    if (this.state.applications[i].stage_apply === 'accepted') {
                        this.state.detailsRate[k] = this.state.applications[i].rating;
                        k += 1;
                    }
                }
            }
        }
    }

    renderTableDataTitle() {
        this.getAcceptedApplicantsTitle();
        return this.state.detailsTitle.map((person, id) => {
            return (
                <p key={id}>
                    {person}
                </p>
            )
        })
    }

    renderTableDataName() {
        this.getAcceptedApplicantsName();
        return this.state.detailsName.map((person, id) => {
            return (
                <p key={id}>
                    {person}
                </p>
            )
        })
    }

    renderTableDataType() {
        this.getAcceptedApplicantsType();
        return this.state.detailsType.map((person, id) => {
            return (
                <p key={id}>
                    {person}
                </p>
            )
        })
    }

    renderTableDataRating() {
        this.getAcceptedApplicantsRating();
        return this.state.detailsRate.map((person, id) => {
            return (
                <p key={id}>
                    {person}
                </p>
            )
        })
    }


    getMyPostedJobs = () => {
        const { isAuthenticated, user } = this.props.auth;
        console.log(user.email);

        api_mypost.post('/alljobs', { email_of_rec: user.email })

            .then(res => {
                console.log('Getting all jobs:');
                console.log(res);
                this.setState({ jobs: res.data.data });
                console.log(this.state.jobs);

                this.setState(prevState => ({
                    arr: [...prevState.arr, ...this.state.jobs]
                }));

                console.log('The array is:-')
                console.log(this.state.arr);

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidMount() {
        this.getAllapplications();
        this.getMyPostedJobs();
    }


    render() {
        return (
            <div>
                <RecruiterNavbar />

                <Container>
                    <div>
                        <label for="inputState" class="form-label" >
                            <strong>Sort by -</strong></label>
                        <div>
                            <select className="ml-3" id="inputState" class="form-select" onChange={this.changeSort}>
                                <option selected>Choose...</option>
                                <option>Name</option>
                                <option>Job Title</option>
                                <option>Rating</option>
                            </select>
                        </div>
                        <label className="ml-3" for="inputState2" class="form-label" >
                            <strong>Sort as -</strong></label>
                        <div>
                            <select id="inputState2" class="form-select" onChange={this.changeOrder}>
                                <option selected>Choose...</option>
                                <option>Ascending</option>
                                <option>Descending</option>
                            </select>
                        </div>

                        <div>
                            <button className="btn btn-dark btn-md mb-3 mr-3 mt-3" onClick={this.onClickSort}>
                                Sort
                            </button>
                        </div>

                    </div>
                </Container>

                <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
                    <Table bordered hover>
                        <thead>
                            <tr>

                                <th> <strong><tr>Name of Applicant</tr></strong></th>
                                <th> <strong><tr>Job Type</tr></strong></th>
                                <th><strong><tr>Title</tr></strong></th>
                                <th> <strong><tr>Rating</tr></strong></th>
                            </tr>
                        </thead>

                        <tbody>
                            <td>{this.renderTableDataName()}</td>
                            <td>{this.renderTableDataType()}</td>
                            <td>{this.renderTableDataTitle()}</td>
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

export default connect(mapStateToProps, null)(RecAcceptedDash);
