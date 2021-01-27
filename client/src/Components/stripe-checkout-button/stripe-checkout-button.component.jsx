import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100; //stripe needs price in cents;
  const publishableKey =
    "pk_test_51HvCHVIaLMh7cFcgADJrwO9kaC0WpaCNTUgwtOBOIgyvn6RXym3Izpcs9yJc0xw2etWSWkh6OswbCirKfCnjx2If00hLwu4Qkl";

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token: token,
      },
    })
      .then((res) => {
        toast.success("Payment was successful");
      })
      .catch((error) => {
        toast.error(
          "There was an issue with your payment! Please make sure you're using the provided credit card"
        );
      });
  };

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            margin: "5rem",
            zIndex: 1,
          },
          duration: 5000,
        }}
      />
      <StripeCheckout
        label="Checkout"
        name="Clothing Store"
        billingAddress
        shippingAddress
        image="https://sendeyo.com/up/d/f3eb2117da"
        description={`Your Total is $${price}`}
        amount={priceForStripe}
        panelLabel="Checkout"
        token={onToken}
        stripeKey={publishableKey}
      />
    </>
  );
};

export default StripeCheckoutButton;
