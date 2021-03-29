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
import { proregister } from '../../actions/recproActions';
import { clearErrors } from '../../actions/errorActions';
import { Redirect } from 'react-router-dom';

class RecruitmentFillProfile extends Component {
    state = {
        modal: true,
        name: '',
        email: '',
        contact: '',
        bio: '',
        approfiles: [],
        myprofile: [],
        tasks: [],
        content: '',
        wordCount: 0,
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

    onSubmit = (e) => {
        e.preventDefault();

        const { isAuthenticated, user } = this.props.auth;

        const { contact, bio } = this.state;

        const my_name = user.name;
        const my_email = user.email;

        // Create new User
        const newRecPro = {
            name: my_name,
            email: my_email,
            contact,
            bio: this.state.content
        };

        console.log(newRecPro);

        this.props.proregister(newRecPro);

        this.setState({ showForm: true });

    };

    render() {

        if (this.state.showForm) {
            return <Redirect to="/recruiter" />
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
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="contact">Contact</Label>
                            <Input
                                type="number"
                                name="contact"
                                id="contact"
                                placeholder="Contact"
                                className='mb-3'
                                onChange={this.onChange} />
                            <Label for="bio">Bio</Label>
                            <Input
                                type="textarea"
                                name="bio"
                                id="bio"
                                placeholder="Please enter your bio here..."
                                className='mb-3'
                                onChange={this.twocalls} />
                            {this.state.exceed ? <strong><p>Bio exceeded 250 word limit, please reduce the content</p></strong> : null}
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
    recprofiles: state.recprofiles
})

export default connect(mapStateToProps, { proregister, clearErrors })(RecruitmentFillProfile);