import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
    Container,
    ListGroup, ListGroupItem
} from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { proregister } from '../../actions/recproActions';
import { clearErrors } from '../../actions/errorActions';
import { Redirect } from 'react-router-dom';
import RecruiterNavbar from './RecruiterNavbar';

class Recruiter extends Component {
    state = {
        modal: true,
        name: '',
        email: '',
        inst_name: '',
        msg: null,
        start_year: '',
        end_year: '',
        skills: '',
        showForm: false,
        approfiles: [],
        myprofile: [],
        tasks: [],
        currUser: [],
        check_email: ''
    }

    static propTypes = {
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    };

    getMyuser = () => {
        console.log('I AM IN GET MY USER!!!');
        const { isAuthenticated, user } = this.props.auth;
        axios.get('http://localhost:5000/api/auth/user')
        .then((res) => {
            this.setState({ currUser: res.data });
        })
        .catch(function (error) {
            console.log(error);
        })

        axios.get('http://localhost:5000/api/recpro')
        .then((response) => {
            this.setState({ approfiles: response.data[2] });
            this.setState({ tasks: response.data });
            console.log('Get request success!!!');
            console.log(this.state.approfiles);
            console.log(user.email);

            for (let i = 0, max = this.state.currUser.length; i < max; i += 1) {
                //task_names.push(tasks[i].name);
                console.log(this.state.currUser[i]._id);
                if (user.id === this.state.currUser[i]._id) {
                    this.setState({ check_email: this.state.currUser[i].email });
                }
            }

            console.log(this.state.currUser);


            for (let i = 0, max = this.state.tasks.length; i < max; i += 1) {
                //task_names.push(tasks[i].name);
                console.log(this.state.tasks[i].email);
                if (this.state.check_email === this.state.tasks[i].email) {
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

    componentDidMount() {
        const { isAuthenticated, user } = this.props.auth;

        axios.get('http://localhost:5000/api/recpro')
        .then((response) => {
            //this.setState({ approfiles: response.data[2] });
            this.setState({ tasks: response.data });
            console.log('Get request success!!!');
            //console.log(this.state.approfiles);
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

    componentDidUpdate (prevProps) {
        if (prevProps.location.key !== this.props.location.key) {
            this.getMyuser();
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    hideComponent = () => {
        this.setState({ showForm: !this.state.showForm });
    }

    render() {

        if (this.state.showForm) {
            return <Redirect to="/receditprof" />
        }

        return (
            <div>
                <RecruiterNavbar />
                <Container>
                    <div>
                        <button className="btn btn-dark btn-md mb-3" onClick={() => this.hideComponent()}>
                            Edit Profile
                        </button>
                    </div>

                    <Container>
                        <strong> <Label>Name:</Label></strong>
                       
                        <div>{this.state.myprofile.name}</div>
                        <hr />
                        <strong><Label>Email:</Label></strong>
                        
                        <div>{this.state.myprofile.email}</div>
                        <hr />
                        <strong><Label>Contact:</Label></strong>
                        
                        <div>{this.state.myprofile.contact}</div>
                        <hr />
                        <strong><Label>Bio:</Label></strong>
                        
                        <div>{this.state.myprofile.bio}</div>
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

export default connect(mapStateToProps, { proregister, clearErrors })(Recruiter);