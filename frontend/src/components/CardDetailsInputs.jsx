import StyledInput from "./StyledInput";

const CardDetailsInputs = ({
  cardDetails,
  onCardChange,
  amount,
  setAmount,
  otp,
  setOtp,
  requestOtp,
}) => {
  return (
    <>
      <StyledInput
        placeholder="Enter Card Holder's Name"
        name="cardHolderName"
        value={cardDetails.cardHolderName}
        onChange={onCardChange}
      />

      <StyledInput
        placeholder="Enter Card Number"
        name="cardNumber"
        type="tel"
        value={cardDetails.cardNumber}
        onChange={onCardChange}
      />

      <div className="flex space-x-2 my-2">
        <StyledInput
          placeholder="Expiry Date (MM/YY)"
          name="expiryDate"
          value={cardDetails.expiryDate}
          onChange={onCardChange}
          className="w-1/2"
        />
        <StyledInput
          placeholder="CVV"
          name="cvv"
          type="password"
          value={cardDetails.cvv}
          onChange={onCardChange}
          className="w-1/2"
        />
      </div>

      <StyledInput
        placeholder="Enter Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        onClick={requestOtp}
        className="w-full lg:w-fit lg:px-5 py-3 mt-4 text-white font-semibold rounded-lg bg-button1"
      >
        Generate OTP
      </button>

      <StyledInput
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="mt-4"
      />
    </>
  );
};

export default CardDetailsInputs;
