import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const MyEmployeeList = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: employees=[], isLoading, isError, } = useQuery({
        queryKey: ['employees', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/hr/employee-assets?hrEmail=${user?.email}`);
            return response.data;
        }
    })


    console.log(employees);



    if (isLoading) {
        return <LoadingSpinner />
    }
    if (isError) {
        return <div>Error loading employees</div>
    }

    return (
        <div>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Join Date</th>
                        <th>Asset Count</th>
                        <th>Employee Count</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees && employees.length > 0 ? (
                        employees.map((employee, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={employee.employeePhoto} alt={employee.employeeName} />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{employee.employeeName}</td>
                                <td>{employee.employeeEmail}</td>
                                <td>{employee.assignedDate || '-'}</td>
                                <td className="text-center">{employee.totalAssets}</td>
                                <td className="text-center">1</td> {/* Employee count if needed */}
                                <td>
                                    <button className='btn bg-red-600 text-white'>Remove</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">No employees found</td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    );
};

export default MyEmployeeList;