import React, { useEffect, useRef } from "react";
import {
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const CustomPayPalButton = ({ amount }) => {
  const { options, isPending } = usePayPalScriptReducer();
  const paypalRef = useRef();

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: 10,
          },
        },
      ],
    });
  };

  useEffect(() => {
    if (window.paypal && paypalRef.current && !isPending) {
      window.paypal
        .Buttons({
          createOrder,
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              console.log("Payment successful", details);
            });
          },
          onError: (error) => {
            console.error("Payment error", error);
          },
        })
        .render(paypalRef.current);
    }
  }, [isPending]);

  return (
    <div
      ref={paypalRef}
      className="w-64 mx-auto"
      style={{ minHeight: "200px" }}
    >
      {isPending && <div>Loading PayPal...</div>}
    </div>
  );
};

const PayPalButton = ({ amount }) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "ASSWcVA1jhjj72JfXQxLLLUdGfy7H9esBcPLBFf0bRb3IFu7Slu-Hl4xy2Mk9Ldu-5ysGkMfHkeZNnPH",
      }}
    >
      <CustomPayPalButton amount={amount} />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
