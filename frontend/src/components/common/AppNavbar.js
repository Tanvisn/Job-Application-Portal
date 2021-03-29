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
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from './Menu';
import LogoutLink from './LogoutLink';
import JobApplicant from '../jobApplicant/JobApplicant';

class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
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
                    <LogoutLink />
                </NavItem>

                <NavItem>
                    <Link to="/jobapp" className="navbar-text mr-3">Profile</Link>
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

export default connect(mapStateToProps, null)(AppNavbar);