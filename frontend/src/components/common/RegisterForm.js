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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { Redirect } from 'react-router-dom';
import AppNavbar from './AppNavbar';

class RegisterForm extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null,
        user_type: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            //Check for register errors
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        //If authenticated, close modal
        if (this.state.modal) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        this.setState({
            dropDownOpen: !this.state.dropDownOpen,
        })
    }

    handleChange = (event) => {
        this.setState({
            user_type: event.target.value
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { name, email, password, user_type } = this.state;

        // Create new User
        const newUser = {
            name,
            email,
            password,
            user_type
        };

        //Attempt to register
        this.props.register(newUser);
    };


    render() {
        if (this.props.isAuthenticated && this.state.user_type === 'Job Applicant') {
            return <Redirect to="/appfillprof" />
        }
        if (this.props.isAuthenticated && this.state.user_type === 'Recruiter') {
            return <Redirect to="/recfillprof" />
        }
        return (
            <div>
                <AppNavbar />
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
                                onChange={this.onChange} />
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                className='mb-3'
                                onChange={this.onChange} />
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                className='mb-3'
                                onChange={this.onChange} />

                            <div>
                                <label for="inputState" class="form-label" >Select User Type</label>
                                <div>
                                    <select id="inputState" class="form-select" onChange={this.handleChange}>
                                        <option selected>Choose...</option>
                                        <option>Job Applicant</option>
                                        <option>Recruiter</option>
                                    </select>
                                </div>

                            </div>

                            <Button
                                color="dark"
                                style={{ marginTop: '2rem' }}
                                block >
                                Register
                                </Button>
                        </FormGroup>
                    </Form>
                </Container>

            </div>
        );
    }

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { register, clearErrors })(RegisterForm);