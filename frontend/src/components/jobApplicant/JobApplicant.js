import React, { Component } from 'react';
import {
    Label,
    Input,
    Alert,
    Container
} from 'reactstrap';
import { Image, Col, Row } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { proregister } from '../../actions/approActions';
import { clearErrors } from '../../actions/errorActions';
import { Redirect } from 'react-router-dom';
import JobApplicantNavbar from './JobApplicantNavbar';

class JobApplicant extends Component {
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
        //approfiles: PropTypes.object.isRequired,
        //getAppProfile: PropTypes.func.isRequired
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

        axios.get('http://localhost:5000/api/appro')
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
        // axios.get('http://localhost:5000/api/auth/user')
        // .then((res) => {
        //     this.setState({ currUser: res.data });
        // })
        // .catch(function (error) {
        //     console.log(error);
        // })
        // axios.get('http://localhost:5000/api/appro')
        //     .then((response) => {
        //         this.setState({ approfiles: response.data[2] });
        //         this.setState({ tasks: response.data });
        //         console.log('Get request success!!!');
        //         console.log(this.state.approfiles);
        //         console.log(user.email);

        //         console.log('The id of user in user db is:-');
        //         console.log(user.id);

        //         for (let i = 0, max = this.state.tasks.length; i < max; i += 1) {
        //             //task_names.push(tasks[i].name);
        //             console.log(this.state.tasks[i].email);
        //             if (user.email === this.state.tasks[i].email) {
        //                 this.setState({ myprofile: this.state.tasks[i] });
        //             }
        //         }

        //         console.log('It is my profile:');
        //         console.log(this.state.myprofile);

        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })

        axios.get('http://localhost:5000/api/appro')
            .then((response) => {
                this.setState({ approfiles: response.data[2] });
                this.setState({ tasks: response.data });
                console.log('Get request success!!!');
                console.log(this.state.approfiles);
                console.log(user.email);

                // for (let i = 0, max = this.state.currUser.length; i < max; i += 1) {
                //     //task_names.push(tasks[i].name);
                //     console.log(this.state.currUser[i]._id);
                //     if (user.id === this.state.currUser[i]._id) {
                //         this.setState({ check_email: this.state.currUser[i].email });
                //     }
                // }

                //console.log(this.state.currUser);


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
            return <Redirect to="/appeditprof" />
        }

        return (
            <div>
                <JobApplicantNavbar />
                <Container>
                    <div>
                        <button className="btn btn-dark btn-md mb-3" onClick={() => this.hideComponent()}>
                            Edit Profile
                        </button>
                    </div>
                    <Row>
                        <Col>
                            <Container>
                                <Image className="my_image" src={`http://localhost:5000/${this.state.myprofile.profileImage}`} alt="Profile" roundedCircle="true" />
                            </Container>
                        </Col>
                        <Col>
                            <Container>
                                <strong><Label>Name:</Label></strong>
                                
                                <div>{this.state.myprofile.name}</div>
                                <hr />
                                <strong> <Label>Email:</Label></strong>
                               
                                <div>{this.state.myprofile.email}</div>
                                <hr />
                                <div>
                                <strong> <Label>Education:</Label></strong>
                                   
                                </div>
                                <strong> <Label>Institute Name:</Label></strong>
                               
                                <div>{this.state.myprofile.inst_name}</div>
                                <hr />
                                <strong><Label>Start-year:</Label></strong>
                                
                                <div>{this.state.myprofile.start_year}</div>
                                <hr />
                                <strong><Label>End-year:</Label></strong>
                                
                                <div>{this.state.myprofile.end_year}</div>
                                <hr />
                                <strong><Label>Skills:</Label></strong>
                                
                                <div>{this.state.myprofile.skills}</div>
                                <hr />
                            </Container>
                        </Col>

                    </Row>



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

export default connect(mapStateToProps, { proregister, clearErrors })(JobApplicant);