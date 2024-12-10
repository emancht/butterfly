import React from 'react';
import NotFound from '../assets/image/no-results.png';

const NoData = () => {
    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-4 text-center">
                    <img src={NotFound} className="w-75" alt="404"/>
                </div>
            </div>
        </div>
    );
};

export default NoData;