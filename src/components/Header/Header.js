import React from 'react';
import './Header.css';

const Header = (props) => {
    return (
        <div className="p-2 bg-primary text-light d-flex align-items-center justify-content-center h-60px">
            <div className="burger mr-2 cursor-pointer" onClick={props.extendSidebar}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
            <h2 className="font-weight-normal m-0">Loan Amount Details</h2>
        </div>
    );
};

export default Header;