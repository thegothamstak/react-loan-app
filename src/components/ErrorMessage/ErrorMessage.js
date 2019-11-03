import React from 'react';

const ErrorMessage = (props) => {
    return (
        <div>
            <div className="mt-5 text-center">
                <div className="alert alert-danger">
                    <h5 className="font-weight-normal m-0">{props.errorMessage}</h5>
                </div>
                <div>
                    <button className="btn btn-primary pl-4 pr-4" onClick={props.displayForm}>
                        <h5 className="font-weight-normal m-0">Return To Form</h5>
                    </button>
                </div>
            </div>
        </div>
    )
};

export default ErrorMessage;