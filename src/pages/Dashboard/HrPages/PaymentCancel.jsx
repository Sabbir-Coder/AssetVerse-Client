import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (

        <div className="text-center mt-10">
            <h2 className="text-xl font-semibold text-red-600">Payment Error. Please try again!</h2>
            <Link to='/dashboard/upgrade-package'><button className='mt-4 cursor-pointer px-4 py-2 bg-gray-700 text-white rounded'>Try again</button></Link>
        </div>

    );
};

export default PaymentCancel;
