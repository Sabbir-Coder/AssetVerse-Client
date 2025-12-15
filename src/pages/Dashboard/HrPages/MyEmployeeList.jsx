import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import Swal from 'sweetalert2';

const MyEmployeeList = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: employees = [], isLoading, isError, } = useQuery({
        queryKey: ['employees', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/hr/employee-assets?hrEmail=${user?.email}`);
            return response.data;
        }
    })

    const queryClient = useQueryClient();

    const confirmAndRemoveEmployee = (employee) => {
        Swal.fire({
            title: "Remove employee?",
            text: `Remove ${employee.employeeName} from your company?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, remove",
        }).then((result) => {
            if (result.isConfirmed) {
                removeEmployeeMutation.mutate(employee.employeeEmail);
            }
        });
    };

    const removeEmployeeMutation = useMutation({
        mutationFn: (employeeEmail) =>
            axiosSecure.delete("/hr/remove-employee", {
                data: { hrEmail: user.email, employeeEmail },
            }),

        onMutate: async (employeeEmail) => {
            await queryClient.cancelQueries(["employees", user.email]);

            const previousEmployees = queryClient.getQueryData([
                "employees",
                user.email,
            ]);

            queryClient.setQueryData(["employees", user.email], (old = []) =>
                old.filter((emp) => emp.employeeEmail !== employeeEmail)
            );

            return { previousEmployees };
        },

        onSuccess: () => {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Employee removed",
                showConfirmButton: false,
                timer: 2000,
            });
        },

        onError: (err, _, context) => {
            queryClient.setQueryData(
                ["employees", user.email],
                context.previousEmployees
            );

            Swal.fire({
                icon: "error",
                title: "Removal failed",
                text: "Something went wrong. Please try again.",
            });
        },

        onSettled: () => {
            queryClient.invalidateQueries(["employees", user.email]);
        },
    });





    if (isLoading) {
        return <LoadingSpinner />
    }
    if (isError) {
        return <div>Error loading employees</div>
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">My Employees</h2>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto rounded-lg shadow border border-gray-200 bg-white">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Asset Count</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {employees && employees.length > 0 ? (
                            employees.map((employee, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-full object-cover border border-gray-200" src={employee.employeePhoto} alt={employee.employeeName} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{employee.employeeName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.employeeEmail}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.assignedDate || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {employee.totalAssets} Asset{employee.totalAssets !== 1 && 's'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm transition-colors shadow-sm"
                                            onClick={() => confirmAndRemoveEmployee(employee)}
                                            disabled={removeEmployeeMutation.isLoading}
                                        >
                                            {removeEmployeeMutation.isLoading ? 'Removing...' : 'Remove'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                    No employees found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {employees && employees.length > 0 ? (
                    employees.map((employee, index) => (
                        <div key={index} className="bg-white p-5 rounded-lg shadow border border-gray-200">
                            <div className="flex items-center space-x-4 mb-4">
                                <img
                                    src={employee.employeePhoto}
                                    alt={employee.employeeName}
                                    className="h-12 w-12 rounded-full object-cover border border-gray-200"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{employee.employeeName}</h3>
                                    <p className="text-sm text-gray-500">Joined: {employee.assignedDate || '-'}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                                    <span className="text-gray-500">Email</span>
                                    <span className="text-gray-900 font-medium truncate ml-4 block">{employee.employeeEmail}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                                    <span className="text-gray-500">Assets Held</span>
                                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
                                        {employee.totalAssets}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <button
                                    className="w-full text-white bg-red-600 hover:bg-red-700 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
                                    onClick={() => confirmAndRemoveEmployee(employee)}
                                    disabled={removeEmployeeMutation.isLoading}
                                >
                                    {removeEmployeeMutation.isLoading ? 'Removing...' : 'Remove from Company'}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow border border-gray-200">
                        No employees found
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyEmployeeList;