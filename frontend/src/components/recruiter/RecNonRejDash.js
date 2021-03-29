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
    baseURL: 'http://localhost:5000/api/apply/getjobapps'
})

const api_sort = axios.create({
    baseURL: 'http://localhost:5000/api/apply/getsortjobs'
})

const api_download = axios.create({
    baseURL: 'http://localhost:5000/api/appro/download'
})

const api_stage = axios.create({
    baseURL: 'http://localhost:5000/api/apply/updateStage'
})

const api_stage_app = axios.create({
    baseURL: 'http://localhost:5000/api/apply/updateStageApp'
})

class RecNonRejDash extends Component {

    state = {
        back: false,
        jobs: [],
        arr: [],
        mode: 0,
        edit: 0,
        tasks: [],
        myprofile: []
    }

    changeSort = (e) => {
        if (e.target.value === 'Name') {
            this.setState({ mode: 1 });
            console.log('Mode of sort')
            console.log(this.state.mode);
        }

        if (e.target.value === 'Date of Application') {
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

   
    getData = () => {
        const { isAuthenticated, user } = this.props.auth;

        axios.get('http://localhost:5000/api/appro')
            .then((response) => {
                this.setState({ tasks: response.data });
                console.log('Get request success!!!');
                console.log(user.email);

                for (let i = 0, max = this.state.tasks.length; i < max; i += 1) {
                    //task_names.push(tasks[i].name);
                    console.log(this.state.tasks[i].email);
                    if (user.email === this.state.tasks[i].email) {
                        this.setState({ myprofile: this.state.tasks[i] });
                    }
                }

                console.log('It is my profile:');
                console.log(this.state.myprofile);

            })
            .catch(function (error) {
                console.log(error);
            })


    }

    onClickSort = () => 
    {
        api_sort.post("/", {job_id: this.props.location.state.id, edit: this.state.edit, mode: this.state.mode})
            .then(res => {
                console.log('Getting all jobs:');
                console.log(res);
                this.setState({ jobs: res.data.data });
                console.log(this.state.jobs);

                this.setState({ arr: [] });

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
        api.post('/', { job_id: this.props.location.state.id })

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

                for (let i = 0, max = this.state.arr.length; i < max; i += 1) 
                {
                    //task_names.push(tasks[i].name);
                    //console.log(this.state.arr[i].deadline);
                    var curr_stage = this.state.arr[i].stage_apply;
                
                    var array = [... this.state.arr];
                    if (curr_stage === 'rejected') 
                    {
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
    }

    // deleteJob = (person) => {
    //     const id = person._id;
    //     this.setState({ reload: !this.state.reload })
    //     api_user.delete(`/${id}`, { id })
    //         .then(res => {
    //             console.log(res);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })

    //     var array = [... this.state.arr];
    //     var index = array.indexOf(person);
    //     console.log('INDEX = ')
    //     console.log(index);
    //     if (index !== -1) {
    //         array.splice(index, 1);
    //         this.setState({ arr: array });
    //     }

    // }


    renderTableData() {
        return this.state.arr.map((person, id) => {
            const { name, skills, date_apply, inst_name, start_year, end_year, sop, rating } = person //destructuring
            return (
                <tr key={id}>
                    <td>{person.name}</td>
                    <td>{person.skills}</td>
                    <td><Moment format="D MMM YYYY hh:mm" withTitle>{person.date_apply}</Moment></td>
                    <td>{person.inst_name}</td>
                    <td>{person.start_year}</td>
                    <td>{person.end_year}</td>
                    <td>{person.sop}</td>
                    <td>{person.rating}</td>
                    <td>{person.stage_apply}</td>
                    
                    <td><button className="btn btn-primary btn-md mb-3" onClick={() => this.onShortlist(person)}>Shortlist</button></td>
                    <td><button className="btn btn-success btn-md mb-3" onClick={() => this.onAccept(person)}>Accept</button></td>
                    <td><button className="btn btn-danger btn-md mb-3" onClick={() => this.onReject(person)}>Reject</button></td>
                </tr>
            )
        })
    }

    //Updating state in recruiter all applications table
    onShortlist = (person) => {

        var array = [... this.state.arr];
        var index = array.indexOf(person);
        console.log('INDEX = ')
        console.log(index);
        if (index !== -1) {
            array[index].stage_apply = 'shortlisted';
            this.setState({ arr: array });
        }
        
        api_stage.post('/', {id: person._id, stage_apply: 'shortlisted'})
        .then(res => {
            console.log(res);
            console.log('Short listed successfully!!!')
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    onAccept = (person) => {
        var array = [... this.state.arr];
        var index = array.indexOf(person);
        console.log('INDEX = ')
        console.log(index);
        if (index !== -1) {
            array[index].stage_apply = 'accepted';
            this.setState({ arr: array });
        }
        api_stage.post('/', {id: person._id, stage_apply: 'accepted'})
        .then(res => {
            console.log(res);
            console.log('Accepted successfully!!!')
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    onReject = (person) => {

        var array = [... this.state.arr];
        var index = array.indexOf(person);
        console.log('INDEX = ')
        console.log(index);
        if (index !== -1) {
            array.splice(index, 1);
            console.log('Spliced = ')
            console.log(this.state.arr[index])
            this.setState({ arr: array });
        }
        api_stage.post('/', {id: person._id, stage_apply: 'rejected'})
        .then(res => {
            console.log(res);
            console.log('Short listed successfully!!!')
        })
        .catch(function (error) {
            console.log(error);
        })
    }

   
    render() {
        if (this.state.back) {
            return <Redirect to="/recalljobs" />
        }
        return (
            <div>
                <RecruiterNavbar />
                <Container>
                    <div>
                        <button className="btn btn-dark btn-md mb-3" onClick={() => this.setState({ back: !this.state.back })}>
                            Back to List
                        </button>
                    </div>

                </Container>

                <Container>
                    <div>
                        <label for="inputState" class="form-label" >
                            <strong>Sort by -</strong></label>
                        <div>
                            <select className="ml-3" id="inputState" class="form-select" onChange={this.changeSort}>
                                <option selected>Choose...</option>
                                <option>Name</option>
                                <option>Date of Application</option>
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
                                    <th><strong><tr>Name</tr></strong></th>
                                    <th> <strong><tr>Skills</tr></strong></th>
                                    <th> <strong><tr>Date of Application</tr></strong></th>
                                    <th> <strong><tr>Institute</tr></strong></th>
                                    <th> <strong><tr>Start year</tr></strong></th>
                                    <th> <strong><tr>End year</tr></strong></th>
                                    <th><strong><tr>SOP</tr></strong></th>
                                    <th> <strong><tr>Rating</tr></strong></th>
                                    <th> <strong><tr>Current Status</tr></strong></th>
                                    
                                    <th> <strong><tr>Shortlist</tr></strong></th>
                                    <th> <strong><tr>Accept</tr></strong></th>
                                    <th> <strong><tr>Reject</tr></strong></th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.renderTableData()}
                            </tbody>
                        </Table>
                    </div>
                


            </div>
        )
    }
}

export default RecNonRejDash;