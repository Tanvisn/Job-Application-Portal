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
    ListGroupItem,
    ModalHeader,
    ModalBody,
    Table
} from 'reactstrap';
import Modal from 'react-modal';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Redirect } from 'react-router-dom';
import JobApplicantNavbar from './JobApplicantNavbar';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/reccreatejob'
})

const api_sort = axios.create({
    baseURL: 'http://localhost:5000/api/appsortjobs'
})

const api_search = axios.create({
    baseURL: 'http://localhost:5000/api/appsearchjobs'
})

const api_filter = axios.create({
    baseURL: 'http://localhost:5000/api/appfilterjobs'
})

const api_apply = axios.create({
    baseURL: 'http://localhost:5000/api/apply'
})



var myperson;
//var fd;

Modal.setAppElement('#root');

class ApplicantAllJobs extends Component {

    static propTypes = {
        error: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired
    };

    state = {
        jobs: [],
        arr: [],
        tasks: [],
        myprofile: [],
        apply: false,
        content: '',
        wordCount: 0,
        exceed: false,
        stage: 'applied',
        sop: '',
        edit: 0,
        mode: 0,
        applied: false,
        rating: 0,
        search: '',
        showSearch: false,
        showSort: false,
        showFilter: false,
        filterType: false,
        filterSalary: false,
        filterDuration: false,
        job_type: '',
        low: 0,
        high: 0,
        duration: 0,
        applications: [],
        myapplications: [],
        isApplied: [],
        permanent: []
    }

    Search = () => {
        this.setState({ showSearch: !this.state.showSearch });
        this.setState({ showSort: false });
        this.setState({ showFilter: false });
    }

    Sort = () => {
        this.setState({ showSearch: false });
        this.setState({ showSort: !this.state.showSort });
        this.setState({ showFilter: false });
    }

    Filter = () => {
        this.setState({ showSearch: false });
        this.setState({ showSort: false });
        this.setState({ showFilter: !this.state.showFilter });
    }

    JobType = () => {
        this.setState({ filterType: !this.state.filterType });
        this.setState({ filterSalary: false });
        this.setState({ filterDuration: false });
    }

    Salary = () => {
        this.setState({ filterType: false });
        this.setState({ filterSalary: !this.state.filterSalary });
        this.setState({ filterDuration: false });
    }

    Duration = () => {
        this.setState({ filterType: false });
        this.setState({ filterSalary: false });
        this.setState({ filterDuration: !this.state.filterDuration });
    }


    twocalls = (e) => {
        this.setState({ sop: e.target.value });
        this.setFormattedContent(this.state.sop, 250);

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

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    changeSort = (e) => {
        if (e.target.value === 'Salary') {
            this.setState({ mode: 1 });
            console.log('Mode of sort')
            console.log(this.state.mode);
        }

        if (e.target.value === 'Duration') {
            this.setState({ mode: 2 });
            console.log('Mode of sort')
            console.log(this.state.mode);
        }

        if (e.target.value === 'Rating') {
            this.setState({ mode: 3 });
            console.log('Mode of sort')
            console.log(this.state.mode);
        }


    }

    changeOrder = (e) => {
        if (e.target.value === 'Ascending') {
            this.setState({ edit: 1 });
            console.log('Order')
            console.log(this.state.edit);
        }

        if (e.target.value === 'Descending') {
            this.setState({ edit: -1 });
            console.log('Order')
            console.log(this.state.edit);
        }
    }

    saveApplicant = () => {
        const { isAuthenticated, user } = this.props.auth;

        const fd = new FormData();
        fd.append("name", user.name);
        fd.append("skills", this.state.myprofile.skills);
        fd.append("start_year", this.state.myprofile.start_year);
        fd.append("end_year", this.state.myprofile.end_year);
        fd.append("sop", this.state.sop);
        fd.append("stage_apply", this.state.stage);
        fd.append("job_id", myperson._id);
        fd.append("rating", this.state.rating);

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        api_apply.post('/applicant', { name: this.state.myprofile.name, skills: this.state.myprofile.skills, inst_name: this.state.myprofile.inst_name, start_year: this.state.myprofile.start_year, end_year: this.state.myprofile.end_year, sop: this.state.sop, stage_apply: this.state.stage, job_id: myperson._id, rating: this.state.rating })
            .then(res => {
                console.log(res);
                console.log('Application done successfully!!!')
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onSubmit = (e) => {
        e.preventDefault();

        this.saveApplicant();

        this.setState({ apply: !this.state.apply });

        var array = [... this.state.isApplied];
        var index = this.state.arr.indexOf(myperson);
        console.log('INDEX = ')
        console.log(index);
        if (index !== -1) {
            this.state.isApplied[index] = 'applied';
        }


        const { isAuthenticated, user } = this.props.auth;

        console.log(user.name)
        console.log(this.state.myprofile.skills)
        console.log(this.state.myprofile.start_year)
        console.log(this.state.myprofile.end_year)
        console.log(this.state.sop)
        console.log(this.state.stage)
        console.log(myperson._id)
        console.log(this.state.rating)

        const fd = new FormData();
        fd.append("name", user.name);
        fd.append("email", user.email);
        fd.append("skills", this.state.myprofile.skills);
        fd.append("start_year", this.state.myprofile.start_year);
        fd.append("end_year", this.state.myprofile.end_year);
        fd.append("sop", this.state.sop);
        fd.append("stage_apply", this.state.stage);
        fd.append("job_id", myperson._id);
        fd.append("rating", this.state.rating);

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        api_apply.post('/', { name: this.state.myprofile.name, email: this.state.myprofile.email, skills: this.state.myprofile.skills, inst_name: this.state.myprofile.inst_name, start_year: this.state.myprofile.start_year, end_year: this.state.myprofile.end_year, sop: this.state.sop, stage_apply: this.state.stage, job_id: myperson._id, rating: this.state.rating })
            .then(res => {
                console.log(res);
                console.log('Application done successfully!!!')
            })
            .catch(function (error) {
                console.log(error);
            })


    };

    getData = () => {
        const { isAuthenticated, user } = this.props.auth;

        axios.get('http://localhost:5000/api/appro')
            .then((response) => {
                this.setState({ tasks: response.data });
                console.log('Get request success!!!');
                console.log(user.email);

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

    getAllapplications = () => {
        const { isAuthenticated, user } = this.props.auth;

        axios.get('http://localhost:5000/api/apply')
            .then((response) => {
                this.setState({ applications: response.data });
                console.log('All applications:-');
                console.log(this.state.applications);
                console.log(user.email);

                for (let i = 0, max = this.state.applications.length; i < max; i += 1) {
                    //task_names.push(tasks[i].name);
                    console.log(this.state.applications[i].email);
                    if (user.email === this.state.applications[i].email) {
                        this.setState(prevState => ({
                            myapplications: [...prevState.myapplications, this.state.applications[i]]
                        }));
                    }
                }

                console.log('These are my applications:');
                console.log(this.state.myapplications);

            })
            .catch(function (error) {
                console.log(error);
            })

    }

    openModal = (person) => {
        this.setState({ apply: !this.state.apply });
        myperson = person;
        console.log('Applying for')
        console.log(myperson.title_job);
    }

    setSearch = (e) => {
        this.setState({ search: e.target.value });
    }

    setType = (e) => {
        this.setState({ job_type: e.target.value });
    }

    setUL = (e) => {
        this.setState({ high: e.target.value });
    }

    setLL = (e) => {
        this.setState({ low: e.target.value });
    }

    changeDuration = (e) => {
        this.setState({ duration: e.target.value });
    }

    onSearch = (e) => {
        e.preventDefault();
        console.log('Searching for')
        console.log(this.state.search);
        api_search.post("/", { title_job: this.state.search })
            .then(res => {
                console.log('Getting all jobs:');
                console.log(res);
                this.setState({ jobs: res.data.data });
                console.log(this.state.jobs);

                this.setState({ arr: [] });

                this.setState(prevState => ({
                    arr: [...prevState.arr, ...this.state.jobs]
                }));

                console.log('The array is:-')
                console.log(this.state.arr);

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onFilterType = (e) => {
        e.preventDefault();
        console.log('Filtering for')
        console.log(this.state.job_type);
        api_filter.post("/", { job_type: this.state.job_type, mode: 1 })
            .then(res => {
                console.log('Getting all jobs:');
                console.log(res);
                this.setState({ jobs: res.data.data });
                console.log(this.state.jobs);

                this.setState({ arr: [] });

                this.setState(prevState => ({
                    arr: [...prevState.arr, ...this.state.jobs]
                }));

                console.log('The array is:-')
                console.log(this.state.arr);

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onFilterSalary = (e) => {
        e.preventDefault();
        console.log('Filtering for')
        console.log(this.state.low);
        console.log(this.state.high);
        api_filter.post("/", { low: this.state.low, high: this.state.high, mode: 2 })
            .then(res => {
                console.log('Getting all jobs:');
                console.log(res);
                this.setState({ jobs: res.data.data });
                console.log(this.state.jobs);

                this.setState({ arr: [] });

                this.setState(prevState => ({
                    arr: [...prevState.arr, ...this.state.jobs]
                }));

                console.log('The array is:-')
                console.log(this.state.arr);

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onFilterDuration = (e) => {
        e.preventDefault();
        console.log('Filtering for')
        console.log(this.state.duration);
        api_filter.post("/", { duration: this.state.duration, mode: 3 })
            .then(res => {
                console.log('Getting all jobs:');
                console.log(res);
                this.setState({ jobs: res.data.data });
                console.log(this.state.jobs);

                this.setState({ arr: [] });

                this.setState(prevState => ({
                    arr: [...prevState.arr, ...this.state.jobs]
                }));

                console.log('The array is:-')
                console.log(this.state.arr);

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    setApplied = () => {
        console.log('I AM SET APPLIED!!!');

        for (let i = 0, max = this.state.isApplied.length; i < max; i += 1) 
        {
            this.state.isApplied[i] = 'noapplied';
        }

        for (let i = 0, max = this.state.arr.length; i < max; i += 1) {
            for (let j = 0, max = this.state.myapplications.length; j < max; j += 1) {
                if (this.state.arr[i]._id === this.state.myapplications[j].job_id) {

                    // console.log('#############')
                    // console.log(this.state.arr[i].title_job);
                    // console.log('$$$$$$$$$$$$$$')
                    if (this.state.myapplications[j].stage_apply === 'applied' || this.state.myapplications[j].stage_apply === 'shortlisted' || this.state.myapplications[j].stage_apply === 'accepted') {
                        this.state.isApplied[i] = 'applied';
                    }

                    else {
                        this.state.isApplied[i] = 'noapplied';
                    }
                }
            }

        }

        for (let i = 0, max = this.state.isApplied.length; i < max; i += 1) {
            if (this.state.isApplied[i] != 'applied') {

                this.state.isApplied[i] = 'noapplied';
            }
        }
    }

    onClickSort = () => {
        api_sort.post("/", { edit: this.state.edit, mode: this.state.mode })
            .then(res => {
                console.log('Getting all jobs:');
                console.log(res);
                this.setState({ jobs: res.data.data });
                console.log(this.state.jobs);

                this.setState({ arr: [] });

                this.setState(prevState => ({
                    arr: [...prevState.arr, ...this.state.jobs]
                }));

                console.log('The array is:-')
                console.log(this.state.arr);

            })
            .catch(function (error) {
                console.log(error);
            })
    }


    componentDidMount() {

        this.getData();

        this.getAllapplications();

        api.get('/')
            .then(res => {
                console.log('Getting all jobs:');
                console.log(res);
                this.setState({ jobs: res.data });
                this.setState({ permanent: res.data });
                console.log(this.state.jobs);

                this.setState(prevState => ({
                    arr: [...prevState.arr, ...this.state.jobs]
                }));

                console.log('The array is:-')
                console.log(this.state.arr);

                var today = Date.now();
                console.log('Today:');
                console.log(today);


                for (let i = 0, max = this.state.arr.length; i < max; i += 1) {
                    //task_names.push(tasks[i].name);
                    //console.log(this.state.arr[i].deadline);
                    var curr = this.state.arr[i].deadline;
                    var newDate = new Date(curr).getTime();
                    console.log(newDate);

                    var array = [... this.state.arr];
                    if (newDate < today) {
                        array.splice(i, 1);
                        console.log('Spliced = ')
                        console.log(this.state.arr[i])
                        this.setState({ arr: array });
                    }


                }

            })
            .catch(function (error) {
                console.log(error);
            })


    }

    renderTableData() {
        this.setApplied();
        return this.state.arr.map((person, id) => {
            const { title_job, name_of_rec, email_of_rec, deadline, req_skills, job_type, duration, salary_monthly, rating } = person //destructuring
            return (
                <tr key={id}>
                    <td>{person.title_job}</td>
                    <td>{person.name_of_rec}</td>
                    <td>{person.email_of_rec}</td>
                    <td><Moment format="D MMM YYYY hh:mm" withTitle>{person.deadline}</Moment></td>
                    <td>{person.req_skills}</td>
                    <td>{person.job_type}</td>
                    <td>{person.duration === 0 ? <div>Indefinite</div> : <div>{person.duration} Months</div>}</td>
                    <td>{person.salary_monthly}</td>
                    <td>{person.rating}</td>
                    {console.log(this.state.isApplied[this.state.arr.indexOf(person)])}
                    <td>{this.state.isApplied[this.state.arr.indexOf(person)] === 'applied' ?
                        <button className="btn btn-success btn-md mb-3 mr-3 mt-3">Applied</button> :
                        <button className="btn btn-dark btn-md mb-3 mr-3 mt-3" onClick={() => this.openModal(person)}>Apply</button>}
                    </td>

                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <JobApplicantNavbar />
                <Container>
                    <Button
                        color="dark"
                        style={{ marginTop: '2rem', marginBottom: '1rem' }}
                        onClick={this.Search}>
                        Search
                </Button>
                    <Button
                        color="dark"
                        style={{ marginTop: '2rem', 'marginLeft': '1rem', marginBottom: '1rem' }}
                        onClick={this.Sort}>
                        Sort
                </Button>
                    <Button
                        color="dark"
                        style={{ marginTop: '2rem', 'marginLeft': '1rem', marginBottom: '1rem' }}
                        onClick={this.Filter}>
                        Filter
                </Button>
                </Container>
                <Container>
                    {this.state.showSearch ? <div>
                        <Form onSubmit={this.onSearch}>
                            <FormGroup>
                                <Label for="search">Search by a job title</Label>
                                <Input
                                    type="text"
                                    name="search"
                                    id="search"
                                    placeholder="Search for a Job title"
                                    className='mb-3'
                                    onChange={this.setSearch} />
                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block >
                                    Search
                                </Button>

                            </FormGroup>
                        </Form>
                    </div> : null}

                    {this.state.showSort ? <div>
                        <label for="inputState" class="form-label" >
                            <strong>Sort by -</strong></label>
                        <div>
                            <select className="ml-3" id="inputState" class="form-select" onChange={this.changeSort}>
                                <option selected>Choose...</option>
                                <option>Salary</option>
                                <option>Duration</option>
                                <option>Rating</option>
                            </select>
                        </div>
                        <label className="ml-3" for="inputState2" class="form-label" >
                            <strong>Sort as -</strong></label>
                        <div>
                            <select id="inputState2" class="form-select" onChange={this.changeOrder}>
                                <option selected>Choose...</option>
                                <option>Ascending</option>
                                <option>Descending</option>
                            </select>
                        </div>

                        <div>
                            <button className="btn btn-dark btn-md mb-3 mr-3 mt-3" onClick={this.onClickSort}>
                                Sort
                            </button>
                        </div>

                    </div> : null}

                    {this.state.showFilter ? <Container>
                        <Button
                            color="dark"
                            style={{ marginTop: '2rem', marginBottom: '1rem' }}
                            onClick={this.JobType}>
                            Job Type
                        </Button>
                        <Button
                            color="dark"
                            style={{ marginTop: '2rem', 'marginLeft': '1rem', marginBottom: '1rem' }}
                            onClick={this.Salary}>
                            Salary
                        </Button>
                        <Button
                            color="dark"
                            style={{ marginTop: '2rem', 'marginLeft': '1rem', marginBottom: '1rem' }}
                            onClick={this.Duration}>
                            Duration
                        </Button>

                        {this.state.filterType ? <div>
                            <Form onSubmit={this.onFilterType}>
                                <FormGroup>
                                    <Label for="filterJob">Filter by Job Type</Label>
                                    <Input
                                        type="text"
                                        name="filterJob"
                                        id="filterJob"
                                        placeholder="Full Time/ Part Time/ Work from Home"
                                        className='mb-3'
                                        onChange={this.setType} />
                                    <Button
                                        color="dark"
                                        style={{ marginTop: '2rem' }}
                                        block >
                                        Filter
                                </Button>

                                </FormGroup>
                            </Form>
                        </div> : null}

                        {this.state.filterSalary ? <div>
                            <Form onSubmit={this.onFilterSalary}>
                                <FormGroup>
                                    <Label for="ul">Please enter upper limit of salary</Label>
                                    <Input
                                        type="number"
                                        name="ul"
                                        id="ul"
                                        placeholder="Upper Limit"
                                        className='mb-3'
                                        onChange={this.setUL} />
                                    <Label for="ll">Please enter lower limit of salary</Label>
                                    <Input
                                        type="number"
                                        name="ll"
                                        id="ll"
                                        placeholder="Lower Limit"
                                        className='mb-3'
                                        onChange={this.setLL} />
                                    <Button
                                        color="dark"
                                        style={{ marginTop: '2rem' }}
                                        block >
                                        Filter
                                </Button>

                                </FormGroup>
                            </Form>
                        </div> : null}

                        {this.state.filterDuration ?
                            <div>
                                <label for="inputState" class="form-label" >
                                    Filter by duration</label>
                                <div>
                                    <select className="ml-3" id="inputState" class="form-select" onChange={this.changeDuration}>
                                        <option selected>Choose Duration...</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                    </select>
                                </div>

                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem', marginBottom: '1rem' }}
                                    onClick={this.onFilterDuration}
                                    block >
                                    Filter
                                </Button>
                            </div>
                            : null}
                    </Container> : null}
                </Container>
                <Container>
                    <Modal isOpen={this.state.apply} style={{ height: 800 }}>
                        <ModalHeader>
                            <p>Please fill up the SOP for applying</p>
                            <Button
                                color="danger"
                                style={{ marginLeft: '75rem' }}
                                onClick={() => this.setState({ apply: !this.state.apply })}>
                                X
                                </Button>
                        </ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Label for="sop">Statement of Purpose</Label>
                                    <Input
                                        type="textarea"
                                        style={{ height: 200 }}
                                        name="sop"
                                        id="sop"
                                        placeholder="Please enter your statement of purpose here..."
                                        className='mb-3'
                                        onChange={this.twocalls} />
                                    {this.state.exceed ? <strong><p>Bio exceeded 250 word limit, please reduce the content</p></strong> : null}
                                    <Button
                                        color="dark"
                                        style={{ marginTop: '2rem' }}
                                        disabled={this.state.exceed || this.state.sop === ''}
                                        block >
                                        Submit
                                </Button>

                                </FormGroup>
                            </Form>
                        </ModalBody>

                    </Modal>
                </Container>
                {/* <Container>
                    <ListGroup>
                        <TransitionGroup className="Job List">
                            {this.state.arr.map((person, _id) => (
                                <CSSTransition key={_id} timeout={500} classNames="fade">
                                    <ListGroupItem className="mb-3 border">
                                        <div>
                                            <strong> Job Title:</strong> {person.title_job}
                                        </div>
                                        <div>
                                            <strong>Name of Recruiter:</strong>{person.name_of_rec}
                                        </div>
                                        <div>
                                            <strong>Email of Recruiter:</strong>{person.email_of_rec}
                                        </div>
                                        <div>
                                            <strong> Deadline:</strong>
                                            <Moment format="D MMM YYYY hh:mm" withTitle>
                                                {person.deadline}
                                            </Moment>
                                        </div>
                                        <div>
                                            <strong>Required skill set:</strong>{person.req_skills}
                                        </div>
                                        <div>
                                            <strong>Type of Job:</strong>{person.job_type}
                                        </div>
                                        {person.duration === 0 ? <div><strong>Duration:</strong> Indefinite</div> : <div><strong>Duration:</strong> {person.duration} Months</div>}
                                        <div>
                                            <strong>Salary:</strong>{person.salary_monthly}/-
                                        </div>
                                        <div>
                                            <strong>Rating:</strong>{person.rating}
                                        </div>

                                        <div>
                                            {/* {this.state.applied ? <button className="btn btn-success btn-md mb-3 mr-3 mt-3">
                                                Applied
                            </button> :} */}
                {/* <button className="btn btn-dark btn-md mb-3 mr-3 mt-3" onClick={() => this.openModal(person)}>
                                                Apply
                                        </button>

                                        </div>

                                    </ListGroupItem>
                                </CSSTransition>
                            )
                            )}
                        </TransitionGroup>
                    </ListGroup>
                </Container> */}

                <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th><strong><tr>Title</tr></strong></th>
                                <th> <strong><tr>Recruiter Name</tr></strong></th>
                                <th> <strong><tr>Recruiter Email</tr></strong></th>
                                <th> <strong><tr>Deadline</tr></strong></th>
                                <th> <strong><tr>Required skills</tr></strong></th>
                                <th> <strong><tr>Job type</tr></strong></th>
                                <th><strong><tr>Duration</tr></strong></th>
                                <th> <strong><tr>Monthly Salary</tr></strong></th>
                                <th> <strong><tr>Rating</tr></strong></th>
                                <th> <strong><tr>Apply</tr></strong></th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                    </Table>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    error: state.error,
    auth: state.auth
})

export default connect(mapStateToProps, null)(ApplicantAllJobs);
