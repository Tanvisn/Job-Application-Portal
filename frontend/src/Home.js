import React, { Component } from 'react';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import AppNavbar from './components/AppNavbar';
import LoginModal from './components/auth/LoginModal';
import RegisterModal from './components/auth/RegisterModal';
import LoginForm from './LoginForm';
import About from './About';
import Menu from './Menu';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

class Home extends Component {

  state = {
    showHideLogin: false,
    showHideRegister: false,
  }

  componentDidMount() {
    store.dispatch(loadUser());
  }

  hideComponent = (name) => {
    if(name === 'showHideLogin') {
      this.setState({ showHideLogin: !this.state.showHideLogin });
    }
    if(name === 'showHideRegister') 
    {
      this.setState({ showHideRegister: !this.state.showHideRegister });
    } 
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Container>
            <div className="mb-3">New to the portal?</div>
            <div>
              <button className="btn btn-dark btn-md mb-3" onClick={() => this.hideComponent("showHideRegister")}>
                Proceed to Register
          </button>
            </div>
            {this.state.showHideRegister ? <RegisterModal /> : null}
            <hr />
            <div className="mb-3">Already Registered?</div>
            <div>
              <button className="btn btn-dark btn-md mb-3" onClick={() => this.hideComponent("showHideLogin")}>
                Proceed to Login
              </button>
            </div>
            {this.state.showHideLogin ? <LoginForm /> : null}
          </Container>
        </div>
      </Provider>

    );
  }

}

export default Home;
