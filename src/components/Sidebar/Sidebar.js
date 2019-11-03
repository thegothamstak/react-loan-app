import React from 'react';
import './Sidebar.css';

const Sidebar = (props) => {
    let cacheAmountDisplay = null;
    if(props.cacheAmountList) {
        cacheAmountDisplay = (
            <div>
                {
                    Object.keys(props.cacheAmountList).map((key, index) => {
                        return (
                            <div className="pb-3 pr-3 pl-3" key={key}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-around">
                                            <div className="text-center">
                                                <h4 className="font-weight-normal m-0">Amount</h4>
                                                <hr className="mt-1 mb-2"/>
                                                <h5 className="font-weight-normal">USD {props.cacheAmountList[key].amount}</h5>
                                            </div>
                                            <div className="text-center">
                                                <h4 className="font-weight-normal m-0">Duration</h4>
                                                <hr className="mt-1 mb-2"/>
                                                <h5 className="font-weight-normal">{props.cacheAmountList[key].duration} mos</h5>
                                            </div>
                                        </div>
                                        <div className="form-group text-center mt-2 mb-0">
                                            <button className="btn btn-primary btn-block font-weight-bold" onClick={props.getLoanDetails.bind(this, props.cacheAmountList[key].amount, props.cacheAmountList[key].duration)}>
                                                Show
                                            </button>
                                            <button className="btn btn-danger btn-block font-weight-bold" onClick={props.deleteCacheAmount.bind(this, key)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }

    return (
        <div id="sidebarMenu" className="sidebar">
            <div className="h-100 d-flex flex-column">
                <div className="p-2 d-flex align-items-center justify-content-center h-60px text-light bg-secondary">
                    <h3 className="font-weight-normal m-0">Previously Searched</h3>
                    <h4 className="collapse-sidebar">
                        <div onClick={props.collapseSidebar} className="close">&times;</div>
                    </h4>
                </div>
                <div className="flex-grow-1 overflow-auto pt-3">
                    {cacheAmountDisplay}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;