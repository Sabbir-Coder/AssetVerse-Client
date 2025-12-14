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
                                <td>
                                    <button
                                        className="btn bg-red-600 text-white"
                                        onClick={() => confirmAndRemoveEmployee(employee)}
                                        disabled={removeEmployeeMutation.isLoading}
                                    >
                                        Remove
                                    </button>
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