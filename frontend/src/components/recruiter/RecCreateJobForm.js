// Recruiter create job listing
import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
    Container,
    
} from 'reactstrap';

import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { proregister } from '../../actions/approActions';
import { clearErrors } from '../../actions/errorActions';
import { Redirect } from 'react-router-dom';
import RecruiterNavbar from './RecruiterNavbar';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/reccreatejob'
})


class RecCreateJob extends Component {
    state = {
        modal: true,
        msg: null,
        updated: false,
        myprofile: [],
        tasks: [],
        name_of_rec: '',
        email_of_rec: '',
        title_job: '', 
        max_applications: 0, 
        max_positions: 0, 
        deadline: '', 
        job_type: '', 
        req_skills: '', 
        duration: 0, 
        salary_monthly: 0, 
        rating: 0,
        job_num: 0
    }

    static propTypes = {
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    };

    componentDidMount() {
        const { isAuthenticated, user } = this.props.auth;
        const user_id = user.id;
        console.log(user_id);
        console.log('Name: ')
        console.log(user.name);
        console.log('Email Id: ')
        console.log(user.email);
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            //Check for register errors
            if (error.id === 'APPRO_REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    hideComponent = () => {
        this.setState({ showForm: !this.state.showForm });
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const { isAuthenticated, user } = this.props.auth;

        if(this.state.job_type === 'Full Time' || this.state.job_type === 'Full time' || this.state.job_type === 'Full-time' || this.state.job_type === 'full time')
        {
            this.setState({ job_num: 1});
        }

        

        const { title_job, max_applications, max_positions, deadline, job_type, req_skills, duration, salary_monthly, rating } = this.state;
        //console.log({ title_job, name_of_rec, email_of_rec, max_applications, max_positions, deadline, job_type, req_skills, duration, salary_monthly, rating });
        
        const myid = this.state.title_job + '_' + this.state.name_of_rec + '_' + this.state.salary_monthly + '_' + this.state.duration + '_' + this.state.job_type; 
        
        api.post('/', { title_job, name_of_rec: user.name, email_of_rec: user.email, max_applications, max_positions, deadline, job_type, req_skills, duration, salary_monthly, rating })
        .then(res => {
            console.log(res);
            console.log('Added to Job Listing!!!')
        })
        .catch(function (error) {
            console.log(error);
        })

        this.setState({updated: true});

    };


    render() {

        if (this.state.updated) {
            return <Redirect to="/recalljobs" />
        }

        const { isAuthenticated, user } = this.props.auth;

        return (
            <div>
                <RecruiterNavbar />
                <Container>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="title_job">Institute Name</Label>
                            <Input
                                type="text"
                                name="title_job"
                                id="title_job"
                                placeholder="Job Title"
                                className='mb-3'
                                onChange={this.onChange} />
                            <Label for="name_of_rec">Name of Recruiter</Label>
                            <Input
                                type="text"
                                name="name_of_rec"
                                id="name_of_rec"
                                placeholder="Name"
                                className='mb-3'
                                defaultValue={user.name || ''}
                                disabled="disabled"
                                onChange={this.onChange} />
                            <Label for="email_of_rec">Email of Recruiter</Label>
                            <Input
                                type="email"
                                name="email_of_rec"
                                id="email_of_rec"
                                placeholder="Email"
                                className='mb-3'
                                defaultValue={user.email || ''}
                                disabled="disabled"
                                onChange={this.onChange} />
                            <Label for="max_applications">Maximum Number of Applications</Label>
                            <Input
                                type="number"
                                name="max_applications"
                                id="max_applications"
                                placeholder="Max Number of Applications"
                                className='mb-3'
                                onChange={this.onChange} />
                            <Label for="max_positions">Maximum Number of Positions</Label>
                            <Input
                                type="number"
                                name="max_positions"
                                id="max_positions"
                                placeholder="Max Number of Positions"
                                className='mb-3'
                                onChange={this.onChange} />
                            <Label for="deadline">Deadline for Application</Label>
                            <Input
                                type="text"
                                name="deadline"
                                id="deadline"
                                placeholder="YYYY-MM-DD HH:MM"
                                className='mb-3'
                                onChange={this.onChange} />
                            <Label for="job_type">Type of Job</Label>
                            <Input
                                type="text"
                                name="job_type"
                                id="job_type"
                                placeholder="Full Time/ Part Time/ Work from Home"
                                className='mb-3'
                                onChange={this.onChange} />
                            <Label for="req_skills">Required Skills</Label>
                            <Input
                                type="text"
                                name="req_skills"
                                id="req_skills"
                                placeholder="Languages"
                                className='mb-3'
                                onChange={this.onChange} />
                            <Label for="duration">Duration</Label>
                            <Input
                                type="number"
                                name="duration"
                                id="duration"
                                placeholder="0(Indefinite) - 6 Months"
                                className='mb-3'
                                onChange={this.onChange} />
                            <Label for="salary_monthly">Monthly Salary</Label>
                            <Input
                                type="number"
                                name="salary_monthly"
                                id="salary_monthly"
                                placeholder="Monthly Salary"
                                className='mb-3'
                                onChange={this.onChange} />
                            <Label for="rating">Rating</Label>
                            <Input
                                type="number"
                                name="rating"
                                id="rating"
                                placeholder="Rating(0-5)"
                                className='mb-3'
                                onChange={this.onChange} />
                            <Button
                                color="dark"
                                style={{ marginTop: '2rem' }}
                                block >
                                Save Job Listing
                                </Button>
                        </FormGroup>
                    </Form>

                </Container>

            </div>
        );
    }

}
const mapStateToProps = state => ({
    error: state.error,
    auth: state.auth,
    approfiles: state.approfiles
})

export default connect(mapStateToProps, { proregister, clearErrors })(RecCreateJob);