import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
    Container
} from 'reactstrap';

import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { proregister } from '../../actions/approActions';
import { clearErrors } from '../../actions/errorActions';
import { Redirect } from 'react-router-dom';
import JobApplicantNavbar from './JobApplicantNavbar';
import Autocomplete from './Autocomplete';

var my_email;

const api = axios.create({
    baseURL: 'http://localhost:5000/api/appro/edit'
})

const api_user = axios.create({
    baseURL: 'http://localhost:5000/api/auth/edit'
})

const api_applicant = axios.create({
    baseURL: 'http://localhost:5000/api/apply/updateStage/updateEmail'
})

class ApplicantEditProfile extends Component {
    state = {
        modal: true,
        name: '',
        email: '',
        inst_name: '',
        msg: null,
        start_year: '',
        end_year: '',
        skills: '',
        updated: false,
        approfiles: [],
        myprofile: [],
        tasks: [],
    }

    static propTypes = {
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    };

    componentDidMount() {
        const { isAuthenticated, user } = this.props.auth;
        axios.get('http://localhost:5000/api/appro')
            .then((response) => {
                this.setState({ approfiles: response.data[2] });
                this.setState({ tasks: response.data });
                console.log('Get request success!!!');
                console.log(this.state.approfiles);
                console.log(user.email);
                //console.log('The id of user in user db is:-');
                console.log(user);
                const id = user.id;
                console.log(id);
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

    fileChangedHandler = event => {
        this.setState({ selectedFile: event.target.files[0] })
    }

    uploadHandler = () => {
        console.log(this.state.selectedFile)
    }

    updateUser = async () => {
        const { name, email } = this.state;

        const { isAuthenticated, user } = this.props.auth;

        const user_id = user.id;
        console.log(user_id);

        const id = this.state.myprofile._id;

        if (this.state.name === '') {
            var my_name = this.state.myprofile.name;
        }
        else {
            var my_name = this.state.name;
        }
        if (this.state.email === '') {
            my_email = this.state.myprofile.email;
        }
        else {
            my_email = this.state.email;
        }



        api_user.post(`/${user_id}`, { name: my_name, email: my_email })
            .then(res => {
                console.log(res);
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    onSubmit = async (e) => {
        e.preventDefault();

        const { name, email, inst_name, start_year, end_year, skills } = this.state;

        const { isAuthenticated, user } = this.props.auth;

        const user_id = user.id;
        console.log(user_id);

        const id = this.state.myprofile._id;

        if (this.state.name === '') {
            var my_name = this.state.myprofile.name;
        }
        else {
            var my_name = this.state.name;
        }
        if (this.state.email === '') {
             my_email = this.state.myprofile.email;
        }
        else {
             my_email = this.state.email;
        }
        if (this.state.inst_name === '') {
            var my_inst_name = this.state.myprofile.inst_name;
        }
        else {
            var my_inst_name = this.state.inst_name;
        }
        if (this.state.start_year === '') {
            var my_start_year = this.state.myprofile.start_year;
        }
        else {
            var my_start_year = this.state.start_year;
        }
        if (this.state.end_year === '') {
            var my_end_year = this.state.myprofile.end_year;
        }
        else {
            var my_end_year = this.state.end_year;
        }

        if (this.state.skills === '') {
            var my_skills = this.state.myprofile.skills;
        }
        else {
            var my_skills = this.state.skills;
        }

        api_user.post(`/${user_id}`, { name: my_name, email: my_email })
            .then(res => {
                console.log(res);
                console.log('User updated!!!');
            })
            .catch(function (error) {
                console.log(error);
            })

        const formData = new FormData();
        formData.append("name", my_name);
        formData.append("email", my_email);
        formData.append("inst_name", my_inst_name);
        formData.append("start_year", my_start_year);
        formData.append("end_year", my_end_year);
        formData.append("skills", my_skills);

        api.post(`/${id}`, formData)

            .then(res => {
                console.log(res);
                console.log('Applicant profile updated!!!')
            })
            .catch(function (error) {
                console.log(error);
            })

       this.setState({ updated: true });

    };


    render() {

        if (this.state.updated) {
            return <Redirect to="/jobapp" />
        }
        return (
            <div>
                <JobApplicantNavbar />
                <Container>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name"
                                className='mb-3'
                                defaultValue={this.state.myprofile.name || ''}
                                onChange={this.onChange} />
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                className='mb-3'
                                defaultValue={this.state.myprofile.email || ''}
                                onChange={this.onChange} />
                            <div>
                                <Label>Education:</Label>
                            </div>
                            <Label for="inst_name">Institute Name</Label>
                            <Input
                                type="text"
                                name="inst_name"
                                id="inst_name"
                                placeholder="Institute Name"
                                className='mb-3'
                                defaultValue={this.state.myprofile.inst_name || ''}
                                onChange={this.onChange} />
                            <Label for="start_year">Start year</Label>
                            <Input
                                type="text"
                                name="start_year"
                                id="start_year"
                                placeholder="Start year"
                                className='mb-3'
                                defaultValue={this.state.myprofile.start_year || ''}
                                onChange={this.onChange} />
                            <Label for="end_year">End year</Label>
                            <Input
                                type="text"
                                name="end_year"
                                id="end_year"
                                placeholder="End year"
                                className='mb-3'
                                defaultValue={this.state.myprofile.end_year || ''}
                                onChange={this.onChange} />
                            <Label for="skills">Skills</Label>
                            <Input
                                type="text"
                                name="skills"
                                id="skills"
                                placeholder="Skills"
                                className='mb-3'
                                defaultValue={this.state.myprofile.skills || ''}
                                onChange={this.onChange} />
                            <div>
                                {/* <Autocomplete
                                    options={[
                                        "Papaya",
                                        "Persimmon",
                                        "Paw Paw",
                                        "Prickly Pear",
                                        "Peach",
                                        "Pomegranate",
                                        "Pineapple"
                                    ]}
                                /> */}
                            </div>
                            <Button
                                color="dark"
                                style={{ marginTop: '2rem' }}
                                block >
                                Save Profile
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

export default connect(mapStateToProps, { proregister, clearErrors })(ApplicantEditProfile);