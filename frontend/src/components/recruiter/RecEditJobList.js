import React, { Component } from 'react';
import Moment from 'react-moment';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
    Container,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearErrors } from '../../actions/errorActions';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Redirect } from 'react-router-dom';
import RecruiterNavbar from './RecruiterNavbar';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/reccreatejob'
})


class RecEditJobList extends Component {

    state = {
        back: false
    }
    render() {
        if (this.state.back) {
            return <Redirect to="/recalljobs" />
        }
        return (
            <div>
                <RecruiterNavbar />
                <Container>
                    <div>
                        <button className="btn btn-dark btn-md mb-3" onClick={() => this.setState({back: !this.state.back})}>
                            Back to List
                        </button>
                    </div>

                    <h1>Edit Job Listing</h1>
                </Container>
            </div>
        )
    }
}

export default RecEditJobList;