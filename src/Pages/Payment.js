import React, { useState } from 'react';
import './Payment.css'; // Import CSS file for styling

function Payment() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!fullName || !email || !phone || !selectedPaymentMethod) {
      alert('Please fill in all required fields.');
      return;
    }
    // Simulate payment processing (in a real application, you would send data to backend)
    setTimeout(() => {
      setPaymentSuccess(true);
    }, 2000); // Simulating a delay for processing
  };

  return (
    <div className="payment-container">
    
      <h2>Function Hall Booking Payment</h2>
      {!paymentSuccess ? (
        <form className="payment-form" onSubmit={handleSubmit}>
          <h3>Contact Information:</h3>
          <label>Name:</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Phone:</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />

          <h3>Select Payment Method:</h3>
          <div className="payment-methods">
            <label>
              <input type="radio" value="credit_card" checked={selectedPaymentMethod === 'credit_card'} onChange={() => setSelectedPaymentMethod('credit_card')} />
              Credit Card
            </label>
            
            <label>
              <input type="radio" value="upi" checked={selectedPaymentMethod === 'upi'} onChange={() => setSelectedPaymentMethod('upi')} />
              UPI
            </label>
            {/* Add more payment methods as needed */}
          </div>

          {selectedPaymentMethod === 'credit_card' && (
            <div className="credit-card-details">
              <h3>Credit Card Details:</h3>
              <label>Card Number:</label>
              <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
              <label>Expiration Date:</label>
              <input type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
              <label>CVV:</label>
              <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} />
            </div>
          )}

          {selectedPaymentMethod === 'upi' && (
            <div className="upi-details">
              <h3>UPI Details:</h3>
              <label>UPI ID:</label>
              <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
            </div>
          )}

          <button type="submit">Submit Payment</button>
        </form>
      ) : (
        <div className="payment-success-message">
          <h3>Payment Successful!</h3>
          <p>Thank you for your payment.</p>
        </div>
      )}
    </div>
  );
}

export default Payment;
