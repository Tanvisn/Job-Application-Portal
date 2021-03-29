import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import LoginForm from './components/common/LoginForm';
import RegisterForm from './components/common/RegisterForm';
import JobApplicant from './components/jobApplicant/JobApplicant';
import Recruiter from './components/recruiter/Recruiter';
import ApplicantFillProfile from './components/jobApplicant/ApplicantFillProfile';
import ApplicantEditProfile from './components/jobApplicant/ApplicantEditForm';
import RecruitmentFillProfile from './components/recruiter/RecruitmentFillProfile';
import RecruitmentEditProfile from './components/recruiter/RecrutmentEditForm';
import RecruiterAllJobsDash from './components/recruiter/RecruiterAllJobsDash';
import RecCreateJob from './components/recruiter/RecCreateJobForm';
import RecNonRejDash from './components/recruiter/RecNonRejDash';
import RecEditJobList from './components/recruiter/RecEditJobList';
import ApplicantAllJobs from './components/jobApplicant/ApplicantAllJobs';
import AppMyApplication from './components/jobApplicant/AppMyApplication';
import RecAcceptedDash from './components/recruiter/RecAcceptedDash';

import { Provider } from 'react-redux';
import store from './store';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className="App">
           
            <Switch>
              <Route exact path="/" component={LoginForm} />
              <Route exact path="/register" component={RegisterForm} />
              <Route exact path="/jobapp" component={JobApplicant} />
              <Route exact path="/appfillprof" component={ApplicantFillProfile} />
              <Route exact path="/appeditprof" component={ApplicantEditProfile} />
              <Route exact path="/appalljobs" component={ApplicantAllJobs} />
              <Route exact path="/appmyapplication" component={AppMyApplication} />
        
              <Route exact path="/recruiter" component={Recruiter} />
              <Route exact path="/recfillprof" component={RecruitmentFillProfile} />
              <Route exact path="/receditprof" component={RecruitmentEditProfile} />
              <Route exact path="/recalljobs" component={RecruiterAllJobsDash} />
              <Route exact path="/recnonrejjobs" component={RecNonRejDash} />
              <Route exact path="/reccreatejob" component={RecCreateJob} />
              <Route exact path="/receditjoblist" component={RecEditJobList} />
              <Route exact path="/recacceptedjobs" component={RecAcceptedDash} />
              
            </Switch>
           
          </div>
        </Provider>
      </BrowserRouter>
    );
  }

}

export default App;
