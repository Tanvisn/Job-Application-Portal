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
import Menu from '../common/Menu';
import LogoutLink from '../common/LogoutLink';

class RecruiterNavbar extends Component {
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
                    <strong>
                        <Link to="/recruiter" className="navbar-text mr-3">Profile</Link>
                    </strong>
                </NavItem>
                <NavItem>
                    <strong>
                    <Link to="/recalljobs" className="navbar-text mr-3">All Jobs</Link>
                    </strong>
                </NavItem>
                <NavItem>
                    <strong>
                    <Link to="/recacceptedjobs" className="navbar-text mr-3">Employees</Link>
                    </strong>
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

export default connect(mapStateToProps, null)(RecruiterNavbar);