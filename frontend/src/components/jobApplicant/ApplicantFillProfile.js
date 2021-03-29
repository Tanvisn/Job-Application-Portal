import React, { Component, Fragment } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavbarBrand

} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { proregister } from '../../actions/approActions';
import { clearErrors } from '../../actions/errorActions';
import { Redirect } from 'react-router-dom';
import Autocomplete from './Autocomplete';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/appro'
})

class ApplicantFillProfile extends Component {
    state = {
        modal: true,
        name: '',
        email: '',
        inst_name: '',
        msg: null,
        start_year: '',
        end_year: '',
        skills: '',
        profileImage: '',
        showForm: false,
        approfiles: [],
        myprofile: [],
        tasks: [],
        selectedFile: null,
        selectedFileCV: null
    }

    static propTypes = {
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
        //approfiles: PropTypes.object.isRequired,
        //getAppProfile: PropTypes.func.isRequired
    };

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

    onChangeFile = e => {
        //this.setState({ fileName: e.target.files[0]});
        console.log(e.target.files[0]);
        this.setState({ selectedFile: e.target.files[0] })
        console.log('Selected file is:')
        console.log(this.state.selectedFile);
    }

    fileChangedHandler = event => {
        this.setState({ selectedFile: event.target.files[0] })
    }

    fileChangedHandlerCV = event => {
        this.setState({ selectedFileCV: event.target.files[0] })
    }

    uploadHandler = () => {
        console.log(this.state.selectedFile)
    }

    hideComponent = () => {
        this.setState({ showForm: !this.state.showForm });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { isAuthenticated, user } = this.props.auth;

        const { inst_name, start_year, end_year, skills} = this.state;

        const my_name = user.name;
        const my_email = user.email;

         const formData = new FormData();
         formData.append("name", my_name);
         formData.append("email", my_email);
         formData.append("inst_name", inst_name);
         formData.append("start_year", start_year);
         formData.append("end_year", end_year);
         formData.append("skills", skills);
         formData.append("profileImage", this.state.selectedFile, this.state.selectedFile.name);
         formData.append("mycv", this.state.selectedFileCV, this.state.selectedFileCV.name);

        console.log(formData);
        api.post('/', formData)
        .then(res => {
            console.log(res);
            this.setState({ showForm: true });
        })
        .catch(function (error) {
            console.log(error);
        })

        

    };

    render() {

        if (this.state.showForm) {
            return <Redirect to="/jobapp" />
        }

        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (

            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                    </span>
                </NavItem>

            </Fragment>
        );

        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">
                            Job Application Portal
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {authLinks}
                            </Nav>
                        </Collapse>
                    </Container>

                </Navbar>
                <Container>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                    <Form onSubmit={this.onSubmit} encType="multipart/form-data">
                        <FormGroup>
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
                                onChange={this.onChange} />
                            <Label for="start_year">Start year</Label>
                            <Input
                                type="number"
                                name="start_year"
                                id="start_year"
                                placeholder="Start year"
                                className='mb-3'
                                onChange={this.onChange} />
                            <Label for="end_year">End year</Label>
                            <Input
                                type="number"
                                name="end_year"
                                id="end_year"
                                placeholder="End year"
                                className='mb-3'
                                onChange={this.onChange} />
                            <Label for="skills">Skills</Label>
                            <Input
                                type="text"
                                name="skills"
                                id="skills"
                                placeholder="Skills"
                                className='mb-3'
                                onChange={this.onChange} />

                            {/* <div>
                                <Autocomplete
                                    options={[
                                        "Papaya",
                                        "Persimmon",
                                        "Paw Paw",
                                        "Prickly Pear",
                                        "Peach",
                                        "Pomegranate",
                                        "Pineapple"
                                    ]}
                                />
                            </div> */}
                            <Label for="profileImage">Profile Image</Label>
                            <Input
                                type="file"
                                id="profileImage"
                                name="profileImage"
                                onChange={this.fileChangedHandler} />
                             <Label for="mycv">CV/Resume</Label>
                            <Input
                                type="file"
                                id="mycv"
                                name="mycv"
                                onChange={this.fileChangedHandlerCV} />
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

export default connect(mapStateToProps, { proregister, clearErrors })(ApplicantFillProfile);