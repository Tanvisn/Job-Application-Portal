import React, { Component } from 'react';
import Moment from 'react-moment';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Label,
    Input
} from 'reactstrap';
import Modal from 'react-modal';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearErrors } from '../../actions/errorActions';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Redirect } from 'react-router-dom';
import RecruiterNavbar from './RecruiterNavbar';

const api_update = axios.create({
    baseURL: 'http://localhost:5000/api/receditjob'
})

const api = axios.create({
    baseURL: 'http://localhost:5000/api/recruiterdash'
})

const api_user = axios.create({
    baseURL: 'http://localhost:5000/api/recruiterdash/del'
})

const api_setStatus = axios.create({
    baseURL: 'http://localhost:5000/api/apply/setStatus'
})

var my_max_applications;
var my_max_positions;
var my_deadline;
var id;
var my_person;
var myid;

Modal.setAppElement('#root');

class RecruiterAllJobsDash extends Component {
    state = {
        msg: null,
        showForm: false,
        jobs: [],
        arr: [],
        check_email: '',
        nonrej: false,
        reload: false,
        showAlert: false,
        edit: false,
        id: '',
        currPersons: [],
        max_applications: 0,
        max_positions: 0,
        deadline: ''

    }

    static propTypes = {
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    };

    componentDidMount() {
        const { isAuthenticated, user } = this.props.auth;
        console.log(user.email);

        api.post('/alljobs', { email_of_rec: user.email })

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

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    hideComponent = () => {
        this.setState({ showForm: !this.state.showForm });
    }

    jobData = () => {
        const { isAuthenticated, user } = this.props.auth;
        console.log(user.email);

        api.post('/alljobs', { email_of_rec: user.email })

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

    setting = (person) => {
        this.setState({ edit: !this.state.edit });
        console.log('Person is');
        console.log(person);
        my_max_applications = person.max_applications;
        my_max_positions = person.max_positions;
        my_deadline = person.deadline;
        id = person._id;
        my_person = person;
        // this.setState({ max_applications: person.max_applications });
        // this.setState({ max_positions: person.max_positions });
        // this.setState({ deadline: person.deadline });
        console.log('Details:');
        console.log(my_max_applications);
        console.log(my_max_positions);
        console.log(my_deadline);

    }

    updateJob = () => {
        this.setState({ edit: !this.state.edit });
        var array = [... this.state.arr];
        var index = array.indexOf(my_person);
        console.log('Max application in arr:-');
        console.log(array[index].max_applications);
        if (this.state.max_applications === '') {
            var new_app = my_max_applications;
        }
        else {
            var new_app = this.state.max_applications;
        }
        if (this.state.max_positions === '') {
            var new_pos = my_max_positions;
        }
        else {
            var new_pos = this.state.max_positions;
        }
        if (this.state.deadline === '') {
            var new_date = my_deadline;
        }
        else {
            var new_date = this.state.deadline;
        }

        array[index].max_applications = new_app;
        array[index].max_positions = new_pos;
        array[index].deadline = new_date;
        
        this.setState({ arr: array });
        
        console.log('My Id is:-')
        console.log(id);
        api_update.post(`/${id}`, { max_applications: new_app, max_positions: new_pos, deadline: new_date})
        .then(res => {
            console.log(res);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    nonRej = (person) => {
        myid = person._id;
        this.setState({ nonrej: !this.state.nonrej });
    }

    twodelete = (person) => {
        this.appStatusDelete(person);
        this.deleteJob(person);
    }

    appStatusDelete = (person) => {
        const id = person._id;
        api_setStatus.post('/', { id: id })
        .then(res => {
            console.log(res);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    deleteJob = (person) => {
        const id = person._id;
        this.setState({ reload: !this.state.reload })
        // api_user.delete(`/${id}`, { id })
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })

            api_user.post(`/${id}`, { id })
            .then(res => {
                console.log(res);
            })
            .catch(function (error) {
                console.log(error);
            })

        var array = [... this.state.arr];
        var index = array.indexOf(person);
        console.log('INDEX = ')
        console.log(index);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ arr: array });
        }

    }

    render() {

        if (this.state.showForm) {
            return <Redirect to="/reccreatejob" />
        }

        if (this.state.nonrej) {
            return  <Redirect to={{
                pathname: '/recnonrejjobs',
                state: { id: myid }
            }}
            />
    
        }

        // if (this.state.edit) {
        //     return <Redirect to="/receditjoblist" />
        // }

        return (
            <div>
                <RecruiterNavbar />
                <Container>
                    <Modal isOpen={this.state.edit}>
                        <h2>Modal Title</h2>
                        <p>Modal body</p>
                        <Container>
                            <Label for="max_applications">Maximum Number of Applications</Label>
                            <Input
                                type="number"
                                name="max_applications"
                                id="max_applications"
                                placeholder="Max Number of Applications"
                                className='mb-3'
                                defaultValue={my_max_applications || ''}
                                onChange={this.onChange} />
                            <Label for="max_positions">Maximum Number of Positions</Label>
                            <Input
                                type="number"
                                name="max_positions"
                                id="max_positions"
                                placeholder="Max Number of Positions"
                                className='mb-3'
                                defaultValue={my_max_positions || ''}
                                onChange={this.onChange} />
                            <Label for="deadline">Deadline for Application</Label>
                            <Input
                                type="text"
                                name="deadline"
                                id="deadline"
                                placeholder="YYYY-MM-DD HH:MM"
                                className='mb-3'
                                defaultValue={my_deadline || ''}
                                onChange={this.onChange} />
                            <button className="btn btn-dark btn-md mb-3 mt-3" onClick={() => this.updateJob()}>
                                Save Changes
                            </button>
                        </Container>

                    </Modal>
                </Container>

                <Container>
                    <div>
                        <button className="btn btn-dark btn-md mb-3" onClick={() => this.hideComponent()}>
                            Add a Job
                        </button>
                    </div>

                    <Container>
                        <ListGroup>
                            <TransitionGroup className="Job List">
                                {this.state.arr.map((person, _id) => (
                                    <CSSTransition key={_id} timeout={500} classNames="fade">
                                        <ListGroupItem className="mb-3 border">
                                            <div>
                                                Job Title: {person.title_job}
                                            </div>
                                            <div>
                                                Date of posting:
                                                <Moment format="D MMM YYYY" withTitle>
                                                    {person.date_post}
                                                </Moment>
                                            </div>
                                            <div>
                                                Maximum applications: {person.max_applications}
                                            </div>
                                            <div>
                                                Maximum positions: {person.max_positions}
                                            </div>
                                            <div>
                                                Deadline:
                                                <Moment format="D MMM YYYY hh:mm" withTitle>
                                                    {person.deadline}
                                                </Moment>
                                            </div>

                                            <div>
                                                <button className="btn btn-dark btn-md mb-3 mr-3 mt-3" onClick={() => this.nonRej(person)}>
                                                    Get Details
                                            </button>
                                                <button className="btn btn-dark btn-md mb-3 mr-3 mt-3" onClick={() => this.twodelete(person)}>
                                                    Delete
                                            </button>
                                                <button className="btn btn-dark btn-md mb-3 mt-3" onClick={() => this.setting(person)}>
                                                    Edit
                                            </button>
                                            </div>

                                        </ListGroupItem>
                                    </CSSTransition>
                                )
                                )}
                            </TransitionGroup>
                        </ListGroup>
                    </Container>
                </Container>
            </div>
        );

    }
}


const mapStateToProps = state => ({
    error: state.error,
    auth: state.auth,
    recprofiles: state.recprofiles
})

export default connect(mapStateToProps, { clearErrors })(RecruiterAllJobsDash);