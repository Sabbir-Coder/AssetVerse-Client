import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const PaymentHistory = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch payment history
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  console.log(payments);
  

  if (loading || isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 bg-background-light dark:bg-background-dark ">
      <h2 className="text-2xl font-semibold mb-6">Payment History</h2>
      {payments.length === 0 ? (
        <p className="text-gray-500">No payments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Transaction ID</th>
                <th className="px-4 py-2 border">Package Name</th>
                <th className="px-4 py-2 border">Amount (USD)</th>
                <th className="px-4 py-2 border">Payment Date</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.transactionId} className="text-center">
                  <td className="px-4 py-2 border">{payment.transactionId}</td>
                  <td className="px-4 py-2 border">{payment.packageName}</td>
                  <td className="px-4 py-2 border">${payment.amount}</td>
                  <td className="px-4 py-2 border">
                    {new Date(payment.paymentDate).toLocaleString()}
                  </td>
                  <td
                    className={`px-4 py-2 border font-semibold ${
                      payment.status === "completed"
                        ? "text-green-600"
                        : payment.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
