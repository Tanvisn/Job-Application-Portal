//Edit Recruiter Profile page
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
import { proregister } from '../../actions/recproActions';
import { clearErrors } from '../../actions/errorActions';
import { Redirect } from 'react-router-dom';
import RecruiterNavbar from './RecruiterNavbar';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/recpro/edit'
})

const api_user = axios.create({
    baseURL: 'http://localhost:5000/api/auth/edit'
})


class RecruitmentEditProfile extends Component {
    state = {
        modal: true,
        name: '',
        email: '',
        msg: null,
        updated: false,
        approfiles: [],
        myprofile: [],
        tasks: [],
        edit: 'disabled',
        content: '',
        wordCount: 0,
        bio: '',
        contact: 0,
        exceed: false
    }

    static propTypes = {
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    };

    twocalls = e => {
        this.setState({ bio: e.target.value });
        this.setFormattedContent(this.state.bio, 250);

    }

    setFormattedContent = (text, limit) => {
        console.log('Limit is');
        console.log(limit);
        let words = text.split(' ').filter(Boolean);
        console.log(words);
        console.log('Current number of words:-');
        console.log(words.length);
        if (words.length > limit) {
            this.setState({
                content: words.slice(0, limit).join(' '),
                wordCount: limit,
                exceed: true
            });
            console.log('After trimming')
            console.log(this.state.content);
            console.log(this.state.wordCount);
        } else {
            this.setState({ content: text, wordCount: words.length, exceed: false });
        }
    }

    componentDidMount() {
        const { isAuthenticated, user } = this.props.auth;
        axios.get('http://localhost:5000/api/recpro')
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
            if (error.id === 'RECPRO_REGISTER_FAIL') {
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
            var my_email = this.state.myprofile.email;
        }
        else {
            var my_email = this.state.email;
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

        const { name, email,contact, bio } = this.state;

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
            var my_email = this.state.myprofile.email;
        }
        else {
            var my_email = this.state.email;
        }
        if (this.state.contact === '' || this.state.contact === null || this.state.contact === 0) {
            var my_contact = this.state.myprofile.contact;
        }
        else {
            var my_contact = this.state.contact;
        }
        if (this.state.bio === '') {
            var my_bio = this.state.myprofile.bio;
        }
        else {
            var my_bio = this.state.content;
        }

        api_user.post(`/${user_id}`, { name: my_name, email: my_email })
        .then(res => {
            console.log(res);
            console.log('User updated!!!');
        })
        .catch(function (error) {
            console.log(error);
        })


        api.post(`/${id}`, { name: my_name, email: my_email, contact: my_contact, bio: my_bio })
       
        .then(res => {
            console.log(res);
            console.log('Recruiter profile updated!!!')
        })
        .catch(function (error) {
            console.log(error);
        })

        this.setState({ updated: true });

    };


    render() {

        if (this.state.updated) {
            return <Redirect to="/recruiter" />
        }
        return (
            <div>
                <RecruiterNavbar />
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
                             <Label for="contact">Contact</Label>
                            <Input
                                type="number"
                                name="contact"
                                id="contact"
                                placeholder="Contact"
                                className='mb-3'
                                defaultValue={this.state.myprofile.contact || ''}
                                onChange={this.onChange} />
                            <Label for="bio">Bio</Label>
                            <Input
                                type="textarea"
                                name="bio"
                                id="bio"
                                placeholder="Please enter your bio here..."
                                className='mb-3'
                                defaultValue={this.state.myprofile.bio || ''}
                                onChange={this.twocalls} />
                             {this.state.exceed ? <strong><p>Bio exceeded 250 word limit, please reduce the content.</p></strong> : null}
                            <Button
                                color="dark"
                                style={{ marginTop: '2rem' }}
                                disabled={this.state.exceed}
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

export default connect(mapStateToProps, { proregister, clearErrors })(RecruitmentEditProfile);