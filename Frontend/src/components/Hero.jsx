import React from "react";
import backgroundImage from "../assets/Hero.jpg";
import logo from "../assets/Logo.svg";

function Hero() {
  function paymentCallback(response) {
    console.log(response);
  }

  // function makePay() {
  //   console.log("Making payment");
  //   //sample payment request
  //   var samplePaymentRequest = {
  //     merchant_code: "MX007",
  //     pay_item_id: "101007",
  //     txn_ref: "sample_txn_ref_123",
  //     site_redirect_url: "https://google.com/",
  //     amount: 10000,
  //     currency: 566, // ISO 4217 numeric code of the currency used
  //     onComplete: paymentCallback,
  //     mode: "TEST",
  //   };

  //   //call webpayCheckout to initiate the payment
  //   window.webpayCheckout(samplePaymentRequest);
  // }
  const paymentParameters = {
    merchantCode: "YOUR_MERCHANT_CODE", // Get from your Quickteller Business dashboard
    payItemID: "YOUR_PAY_ITEM_ID", // Get from your dashboard
    customerEmail: "customer@example.com",
    redirectURL: "http://localhost:3000/payment-response", // Your redirect page after payment
    text: "Pay Now",
    mode: "TEST", // Use 'LIVE' when ready for production
    transactionReference: Date.now().toString(), // Ensure a unique value per transaction
    amount: "10000", // Amount in kobo (i.e., NGN 100.00 = 10000 kobo)
    style: {
      width: "200px",
      height: "40px",
      border: "none",
      color: "#fff",
      backgroundColor: "#ff0000",
    },
    callback: (response) => {
      console.log("Payment response: ", response);
      // Optionally, send response data to your server to verify the transaction
    },
  };
  return (
    <div
      className="relative bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col justify-center items-center mx-auto px-4 md:px-10 lg:px-20 h-full text-center text-white container">
        {/* Logo */}
        <div className="mb-8 logo">
          <img
            src={logo}
            alt="9ja Markets"
            className="mx-auto mt-[-15%] h-24 sm:h-36 md:h-48 lg:h-56"
          />
        </div>

        {/* Heading */}
        <h1 className="mt-[10%] mb-4 font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight">
          Discover and Connect with <br /> Nigeria’s Major Markets.
        </h1>
        {/* <button className="bg-red-500 p-3" onClick={makePay}>
          Pay
        </button> */}
        {/* <InterswitchPay {...paymentParameters} /> */}
        {/* Positioned Paragraph (optional) */}
        {/* <p className="py-2 w-full text-center sm:text-lg md:text-xl">
          Your gateway to the best products from Nigeria’s leading markets.
        </p> */}
      </div>
    </div>
  );
}

export default Hero;
