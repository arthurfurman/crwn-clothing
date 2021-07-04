import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51J9PlcE0B15y0UCwYSzAwQeOlAlJpms1JugdzMAssSMIbOlRMcJLUfVj8OYbVGKhLRrcUbFCCdv1lYcL9PWWOdgE008qt9jaAH";

  // this is where the payment should be sent to the backend to be handled
  const onToken = token => {
    console.log(token)
    alert("Payment Successful")
  }

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
