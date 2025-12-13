import React from 'react';
import TwoLevelPieChart from './PieChart';
import CustomShapeBarChart from './Barchart';



const Dashboard = () => {

    return (
        <div>
            <h2 className='text-3xl font-bold text-gray-600 my-5'>Welcome to your dashboard</h2>
            <p className='text-gray-500 mb-10'>View your Returnable vs Non-returnable items distribution
                and Top 5 most requested assets in chart.
            </p>
            <div className='flex flex-col-reverse lg:flex-row justify-center gap-7 items-center'>
                <CustomShapeBarChart />
                <TwoLevelPieChart />
            </div>
        </div>
    );
};

export default Dashboard;