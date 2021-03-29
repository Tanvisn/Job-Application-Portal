import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    Container,
    NavbarBrand
} from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from '../common/Menu';
import LogoutLink from '../common/LogoutLink';

class JobApplicantNavbar extends Component {
    state = {
        isOpen: false,
        my_name: '',
        currUser: []
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        console.log('Component did mount in Navbar')
        const { isAuthenticated, user } = this.props.auth;
        axios.get('http://localhost:5000/api/auth/user')
            .then((res) => {
                this.setState({ currUser: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })

        console.log(this.state.currUser);
        console.log(user);

        for (let i = 0, max = this.state.currUser.length; i < max; i += 1) {
            //task_names.push(tasks[i].name);
            console.log(this.state.currUser[i]._id);
            if (user.id === this.state.currUser[i]._id) {
                this.setState({ my_name: this.state.currUser[i].name });
            }
        }

        console.log('Current user:');
    }

    render() {

        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (

            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                    </span>
                </NavItem>
               
                <NavItem>
                    <Link to="/jobapp" className="navbar-text mr-3"><strong>Profile</strong></Link>
                </NavItem>
                <NavItem>
                    <Link to="/appalljobs" className="navbar-text mr-3"><strong>Jobs</strong></Link>
                </NavItem>
                <NavItem>
                    <Link to="/appmyapplication" className="navbar-text mr-3"><strong>Applications</strong></Link>
                </NavItem>

                <NavItem>
                    <LogoutLink />
                </NavItem>

            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <Menu />
                </NavItem>
            </Fragment>
        )

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
                                {isAuthenticated ? authLinks : guestLinks}
                            </Nav>
                        </Collapse>
                    </Container>

                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(JobApplicantNavbar);