import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert,
    Container
} from 'reactstrap';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { Redirect } from 'react-router-dom';
import AppNavbar from './AppNavbar';

class LoginForm extends Component {
    state = {
        modal: false,
        email: '',
        password: '',
        msg: null,
        user_type: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            //Check for register errors
            if (error.id === 'LOGIN_FAIL') {
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

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { error, isAuthenticated } = this.props;
        const { email, password, user_type } = this.state;


        const user = { email, password, user_type }

        //Attempt to Login
        this.props.login(user);

    };

    render() {
        const { user } = this.props.auth;
        
        if (this.props.isAuthenticated && user.user_type === 'Job Applicant') {
            return <Redirect to="/jobapp" />
        }
        if (this.props.isAuthenticated && user.user_type === 'Recruiter') {
            return <Redirect to="/recruiter" />
        }
        return (
            <div>
                <AppNavbar />
                <Container>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
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

                            <Button
                                color="dark"
                                style={{ marginTop: '2rem' }}
                                block >
                                Login
                        </Button>

                        </FormGroup>
                    </Form>

                </Container>

            </div >
        );
    }

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    auth: state.auth
})

export default connect(mapStateToProps, { login, clearErrors })(LoginForm);