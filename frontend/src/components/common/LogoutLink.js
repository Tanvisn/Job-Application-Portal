import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'reactstrap';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';

export class LogoutLink extends Component {

    static propTypes = {
        logout: PropTypes.func.isRequired
    };

    render() {
        return (
            <Fragment>
                <NavLink href="/" onClick={this.props.logout}><strong>Logout</strong></NavLink>
            </Fragment>
           
        )
    }
}

export default connect(null, {logout})(LogoutLink);