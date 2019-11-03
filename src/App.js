import React, {Component} from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import LoanAmountForm from './components/LoanAmountForm/LoanAmountForm';
import LoanDetails from './components/LoanDetails/LoanDetails';
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

import Axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //  Values
            loanAmount: 500,
            loanDuration: 6,
            loanDetails: null,
            errorMessage: 'Something went wrong. Please try again.',
            cacheAmountList: JSON.parse(localStorage.getItem('loan-amount-cache')),

            //  Flags
            displayFlag: 0
        };
    };

    getLoanDetails = (loanAmount, loanDuration) => {
        if(loanAmount && loanDuration) {
            //  Pre loader
            this.setState({displayFlag: 1});

            if(localStorage.getItem('loan-amount-cache')) {
                if(this.state.cacheAmountList[loanAmount + '-' + loanDuration]) {
                    console.log('From cache');
                    this.setState({loanDetails: this.state.cacheAmountList[loanAmount + '-' + loanDuration].data});
                    this.setState({displayFlag: 2});
                    return;
                }
            }

            let url = 'https://ftl-frontend-test.herokuapp.com/interest?amount='+loanAmount+'&numMonths='+loanDuration;
            Axios.get(url).then(response => {
                if(response.data.status) {
                    this.setState({errorMessage: 'Invalid Request'});
                    this.setState({displayFlag: 3});
                }
                else {
                    //  Cache response
                    let loanAmountCache = {};
                    if(localStorage.getItem('loan-amount-cache')) {
                        loanAmountCache = JSON.parse(localStorage.getItem('loan-amount-cache'));
                    }
                    loanAmountCache[loanAmount + '-' + loanDuration] = {
                        'amount': loanAmount,
                        'duration': loanDuration,
                        'data': response.data
                    };
                    localStorage.setItem('loan-amount-cache', JSON.stringify(loanAmountCache));
                    this.setState({cacheAmountList: JSON.parse(localStorage.getItem('loan-amount-cache'))});
                    this.setState({loanDetails: response.data});
                    this.setState({displayFlag: 2});
                }
            }).catch(error => {
                this.setState({errorMessage: error.message});
                this.setState({displayFlag: 3});
            });
        }
        else {

        }
    };

    deleteCacheAmount = (objKey) => {
        let cacheAmountList = JSON.parse(localStorage.getItem('loan-amount-cache'));
        delete cacheAmountList[objKey];
        localStorage.setItem('loan-amount-cache', JSON.stringify(cacheAmountList));
        this.setState({cacheAmountList: JSON.parse(localStorage.getItem('loan-amount-cache'))});
    };

    changeLoanAmount = (e) => {
        this.setState({loanAmount: e.target.value});
    };

    changeLoanDuration = (e) => {
        this.setState({loanDuration: e.target.value});
    };

    displayForm = () => {
        this.setState({displayFlag: 0});
    };

    extendSidebar = () => {
        let sidebar = document.getElementById('sidebarMenu');
        sidebar.classList.toggle('show-sidebar');
        sidebar.classList.toggle('hide-sidebar');
    };

    collapseSidebar = () => {
        let sidebar = document.getElementById('sidebarMenu');
        sidebar.classList.toggle('hide-sidebar');
        sidebar.classList.toggle('show-sidebar');
    };

    render() {
        let displayContent = null;
        if(this.state.displayFlag === 0) {
            displayContent = (
                <LoanAmountForm
                    getLoanDetails={this.getLoanDetails}
                    changeLoanAmount={(event) => this.changeLoanAmount(event)}
                    changeLoanDuration={(event) => this.changeLoanDuration(event)}
                    loanAmount={this.state.loanAmount}
                    loanDuration={this.state.loanDuration}>
                </LoanAmountForm>
            );
        }
        else if(this.state.displayFlag === 1) {
            displayContent = (
                <div>
                    <div className="text-center mt-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            );
        }
        else if(this.state.displayFlag === 2) {
            displayContent = (
                <LoanDetails
                    loanDetails={this.state.loanDetails}
                    displayForm={this.displayForm}>
                </LoanDetails>
            );
        }
        else if(this.state.displayFlag === 3) {
            displayContent = (
                <ErrorMessage
                    errorMessage={this.state.errorMessage}
                    displayForm={this.displayForm}>
                </ErrorMessage>
            );
        }

        return(
            <div>
                <Sidebar
                    cacheAmountList={this.state.cacheAmountList}
                    getLoanDetails={this.getLoanDetails}
                    deleteCacheAmount={this.deleteCacheAmount}
                    collapseSidebar={this.collapseSidebar}
                >
                </Sidebar>
                <div className="content">
                    <Header
                        extendSidebar={this.extendSidebar}
                    >
                    </Header>
                    <div className="container-fluid">
                        {displayContent}
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
