import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import pdf from '../assets/Student Payment Receipt 2.pdf';
import '../styles/Fees.css'

function Fees() {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan, user } = location.state || {};

  // State to track if the form is valid
  const [isFormValid, setIsFormValid] = useState(true);

  // Function to validate form fields
  const validateForm = (formData) => {
    for (let value of formData.values()) {
      if (!value) return false;
    }
    return true;
  };

  const handleDownloadAndRedirect = (e) => {
    e.preventDefault();

    // Collect form data
    const form = e.target.closest("form");
    const formData = new FormData(form);

    // Validate form data
    if (validateForm(formData)) {
      // If valid, trigger download and redirect
      const link = document.createElement("a");
      link.href = pdf;
      link.download = "Student_Payment_Receipt.pdf";
      link.click();
      
      navigate("/");
    } else {
      // If not valid, set error state to show validation message
      setIsFormValid(false);
    }
  };

  return (
    <div className="fees-container">
      <h2>Payment Details</h2>
      <div>
        <h3>Plan Selected: {plan}</h3>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Address:</strong> {user?.address}</p>
      </div>

      <form>
        <label htmlFor="cardholder-name">Cardholder Name</label>
        <input type="text" id="cardholder-name" name="cardholder-name" required />

        <label htmlFor="card-number">Card Number</label>
        <input type="number" id="card-number" name="card-number" maxLength="16" required placeholder="1234 5678 9012 3456" />

        <label htmlFor="expiry-date">Expiration Date</label>
        <input type="month" id="expiry-date" name="expiry-date" required />

        <label htmlFor="cvv">CVV</label>
        <input type="number" id="cvv" name="cvv" maxLength="3" required placeholder="123" />

        <label htmlFor="billing-address">Billing Address</label>
        <input type="text" id="billing-address" name="billing-address" required />

        <label htmlFor="city">City</label>
        <input type="text" id="city" name="city" required />

        <label htmlFor="zip">ZIP/Postal Code</label>
        <input type="text" id="zip" name="zip" required />

        {/* Validation message if form is not valid */}
        {!isFormValid && (
          <p style={{ color: "red", marginTop: "10px" }}>
            Please fill in all required fields.
          </p>
        )}

        {/* Submit button to download PDF and navigate to home */}
        <button className="submit-button" onClick={handleDownloadAndRedirect}>
          Submit Payment & Download Contract Form
        </button>
      </form>
    </div>
  );
}

export default Fees;
