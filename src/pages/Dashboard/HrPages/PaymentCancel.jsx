import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div>
            <h2>Payment is cancelled. Please try again. </h2>
            <Link to='/dashboard/upgrade-package'><button className='btn btn-primary'>Try again</button></Link>
        </div>
    );
};

export default PaymentCancel;
