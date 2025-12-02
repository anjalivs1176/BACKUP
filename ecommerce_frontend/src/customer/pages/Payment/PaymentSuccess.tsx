import React from "react";
import { useSearchParams, useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const { paymentOrderId } = useParams();
  const [query] = useSearchParams();

  const paymentId = query.get("razorpay_payment_id");
  const linkId = query.get("razorpay_payment_link_id");
  const status = query.get("razorpay_payment_link_status");

  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>

      <p className="mt-4 text-gray-700">
        Payment ID: <strong>{paymentId}</strong>
      </p>

      <p className="text-gray-700">
        Payment Link ID: <strong>{linkId}</strong>
      </p>

      <p className="text-gray-700">
        Status: <strong>{status}</strong>
      </p>

      <p className="mt-6 text-lg">
        Your order has been placed successfully!
      </p>
    </div>
  );
};

export default PaymentSuccess;
