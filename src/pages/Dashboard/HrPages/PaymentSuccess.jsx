import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";


const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const [loading, setLoading] = useState(true);
    const [transactionId, setTransactionId] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const sessionId = searchParams.get("session_id");

        if (!sessionId) {
            setError("Invalid payment session");
            setLoading(false);
            return;
        }

        const confirmPayment = async () => {
            try {
                const res = await axiosSecure.post("/confirm-payment", {
                    sessionId,
                });

                setTransactionId(res.data.transactionId);
            } catch (err) {
                console.error(err);
                setError("Payment verification failed");
            } finally {
                setLoading(false);
            }
        };

        confirmPayment();
    }, [searchParams, axiosSecure]);

    if (loading) {
        return <LoadingSpinner />
    }

    if (error) {
        return (
            <div className="text-center mt-10">
                <h2 className="text-xl font-semibold text-red-600">Payment Error</h2>
                <p className="mt-2">{error}</p>
                <button
                    onClick={() => navigate("/dashboard")}
                    className="mt-4 px-4 py-2 bg-gray-700 text-white rounded"
                >
                    Go to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold text-green-600 text-center">
                Payment Successful
            </h2>

            <p className="mt-4 text-center">
                Your subscription has been updated successfully.
            </p>

            <div className="mt-6 text-center">
                <p className="font-medium">Transaction ID</p>
                <p className="mt-1 text-blue-600 font-mono">{transactionId}</p>
            </div>

            <button
                onClick={() => navigate("/dashboard")}
                className="w-full mt-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                Go to Dashboard
            </button>
        </div>
    );
};

export default PaymentSuccess;
