import React from 'react';

const LoanDetails = (props) => {
    return (
        <div className="m-md-5">
            <div className="max-width-form m-auto">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6 col-xs-12 mb-3">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h4 className="font-weight-normal m-0">Principal</h4>
                                    <hr/>
                                    <h4 className="font-weight-normal">{props.loanDetails.principal.currency} {props.loanDetails.principal.amount}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xs-12 mb-3">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h4 className="font-weight-normal">Rate of Interest</h4>
                                    <hr/>
                                    <h4 className="font-weight-normal">{props.loanDetails.interestRate}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xs-12 mb-3">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h4 className="font-weight-normal">Monthly Installment</h4>
                                    <hr/>
                                    <h4 className="font-weight-normal">{props.loanDetails.monthlyPayment.currency} {props.loanDetails.monthlyPayment.amount}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xs-12 mb-3">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h4 className="font-weight-normal">No of Payments</h4>
                                    <hr/>
                                    <h4 className="font-weight-normal">{props.loanDetails.numPayments}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary pl-4 pr-4" onClick={props.displayForm}>
                            <h5 className="font-weight-normal m-0">Return To Form</h5>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanDetails;