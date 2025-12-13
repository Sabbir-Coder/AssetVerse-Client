import React from 'react';
import TwoLevelPieChart from './PieChart';


const Dashboard = () => {
    
    return (
        <div>
            <h2>Welcome to your dashboard</h2>
            <div className='flex justify-center items-center'>
                <TwoLevelPieChart />
            </div>
        </div>
    );
};

export default Dashboard;