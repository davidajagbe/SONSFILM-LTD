import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/Fees.css";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

function Fees() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false); // State for loading spinner
  const [paymentSlip, setPaymentSlip] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [step, setStep] = useState(() => {
    const storedStep = sessionStorage.getItem('feeStep');
    return storedStep ? parseInt(storedStep, 10) : 1;
  });
  const [otpSent, setOtpSent] = useState(false); // Track OTP sending
  const [userId, setUserId] = useState(""); // user ID is returned after email verification
  const navigate = useNavigate();

  // Store all necessary data in sessionStorage
  useEffect(() => {
    const storedState = JSON.parse(sessionStorage.getItem('feeState'));
    if (storedState) {
      setEmail(storedState.email || '');
      setVerificationCode(storedState.verificationCode || '');
      setIsVerified(storedState.isVerified || false);
      setPaymentSlip(storedState.paymentSlip || null);
      setUploadStatus(storedState.uploadStatus || null);
      setStep(parseInt(storedState.step, 10) || 1);
      setOtpSent(storedState.otpSent || false);
      setUserId(storedState.userId || '');
    }
  }, []);


  // Update sessionStorage whenever relevant state changes
  useEffect(() => {
    const stateToStore = {
      email,
      verificationCode,
      isVerified,
      paymentSlip,
      uploadStatus,
      step,
      otpSent,
      userId,
    };
    sessionStorage.setItem('feeState', JSON.stringify(stateToStore));
  }, [email, verificationCode, isVerified, paymentSlip, uploadStatus, step, otpSent, userId]);

  // Step 0: send Verification Email code to users Email
  const handleVerifyEmail = async () => {
    setIsVerifying(true); // Set loading to true
    try {
      const { data } = await axios.post("/api/users/verify-email", { email });
      if (data) {
        toast.success("Verification email sent!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send verification email."
      );
    }
    finally{
      setIsVerifying(false); // Set loading to false after the request completes
    }
  };

  // Step 1: Verify Email with Code
  const handleConfirmCode = async () => {
    try {
      const { data } = await axios.post("/api/users/verify-code", {
        email,
        code: verificationCode,
      });
      if (data) {
        setIsVerified(true);
        setUserId(data.userId);
        toast.success("Email verified successfully!");
        setStep(2);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to verify code.");
    }
  };

  // Step 3: Upload Payment Slip
  const handleUploadPaymentSlip = async () => {
    const formData = new FormData();
    formData.append("paymentSlip", paymentSlip);
    formData.append("email", email);
    formData.append("userId", userId);

    try {
      const { data } = await axios.post("/api/users/upload-slip", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus("success");
      toast.success(data.message || "Payment slip uploaded successfully!");
      setStep(4);
    } catch (error) {
      setUploadStatus("failure");
      toast.error(
        error.response?.data?.message ||
          "Failed to upload payment slip. Please try again."
      );
    }
  };

  //step 4 Send otp code
  const handleSendOtp = async () => {
    setIsVerifying(true);
    try {
      const { data } = await axios.post("/api/users/send-otp", { userId });
      setOtpSent(true);
      toast.success(data.message || "OTP sent successfully!");
      setStep(5);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP.");
    }
    finally{
      setIsVerifying(false); // Set loading to false after the request completes
    }
  };

  //step 5 confirm otp and activate profile
  const handleActivateProfile = async (otp) => {
    try {
      const { data } = await axios.post("/api/users/activate-profile", {
        userId,
        otp,
      });
      toast.success(data.message || "Profile activated successfully!");
      setTimeout(() => navigate("/profile"), 3000); // Redirect to user dashboard or another page
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to activate profile."
      );
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1); // Decrement the step
  };

  return (
    <div className="fees-container">
      {/* Button to go back to the previous step */}
      {step > 1 && ( // Only show the button if the current step is greater than 1
        <button onClick={handlePreviousStep}>Previous Step</button>
      )}
      {/* Email verification and activation steps */}
      {step === 1 && (
        <>
          {/* step 1 Verifying Email */}
          <h2>Email Verification</h2>
          <div>
            <p>
              <strong>Plan:</strong> Premium
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          <button 
            type="button" 
            className="submit-button" 
            onClick={handleVerifyEmail} 
            disabled={isVerifying}
          >
            Verify Email
            {isVerifying && <ClipLoader size={18} color="#f9f9f9" />} {/* Show spinner if isVerifying is true */}
          </button>
          </form>

          {/* Step 2: Confirm Verification Code */}
          <form onSubmit={(e) => e.preventDefault()}>
            <label>Verification Code</label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              placeholder="Enter verification code"
            />
            <button
              type="button"
              className="submit-button"
              onClick={handleConfirmCode}
            >
              Confirm Code
            </button>
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <p>
            <strong>STEP 1:</strong>
          </p>
          <p>
            PAY IN THE SUM OF SIXTY THOUSAND FIVE HUNDRED NAIRE (N60, 500 )
            INTO OUR ACCOUNT
          </p>
          <p>
            <strong>
              ACCOUNT NAME : STARS OF NIGERIA FILMS ENTERTAINMENT LIMITED
            </strong>
          </p>
          <p>
            <strong>ACCOUNT NUMBER : 3800093365</strong>
          </p>
          <p>
            <strong>BANK : ECO BANK</strong>
          </p>
          <p>OR</p>
          <p>
            YOU CAN ALSO PAY INTO THE COMPANY US DOLLAR ACCOUNT, FOR THOSE OF
            YOU LIVING ABROAD
          </p>
          <p>
            <strong>ACCOUNT NAME : STARS OF NIGERIA FILMS ENTERTAINMENT</strong>
          </p>
          <p>
            <strong>ACCOUNT NUMBER : 3800094544</strong>
          </p>
          <p>
            <strong>BANK NAME : ECO BANK</strong>
          </p>
          <br />
          <hr />
          <br />
          <p>
            <strong>STEP 2:</strong>
          </p>
          <p>
            UPLOAD THE PAYMENT SLIP AND SEND TO US VIA EMAIL :
            payment@starsofnigeriafilmsent.com
          </p>
          <br />
          <p>
            <strong>STEP 3:</strong>
          </p>
          <p>AN OTP WILL BE SENT TO YOU VIA EMAIL.</p>
          <br />
          <p>
            <strong>STEP 4:</strong>
          </p>
          <p>TYPE IN THE GENERATED OTP, WAIT FOR PROFILE TO BE ACTIVATED</p>
          <br />
          <p>
            <strong>STEP 5:</strong>
          </p>
          <p>
            GO TO FORM SECTION, CLICK ON FORM, CLICK ON ARTIST MEMBERSHIP FORM
            OR ANY OTHER FORM YOU WISH TO REGISTER .
          </p>
          <br />
          <p>
            <strong>STEP 6:</strong>
          </p>
          <p>FILL THE FORM AND SUBMIT BY CLICKING THE SUBMIT BUTTON</p>
          <p>
            NOTE : THIS PROCESS APPLIES TO ALL STARS OF NIGERIA FILMS
            ENTERTAINMENT REGISTRATIONS
          </p>
          <button onClick={() => setStep(3)}>I Understand</button>
        </>
      )}

      {step === 3 && (
        <>
          <h2>Step 3: Upload Payment Slip</h2>
          <p>Please upload your payment slip to complete the process.</p>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setPaymentSlip(e.target.files[0])}
          />
          <button onClick={handleUploadPaymentSlip}>
            Upload Payment Slip
          </button>
        </>
      )}

      {step === 4 && uploadStatus === "success" && (
        <>
          <h2>Payment Slip Uploaded</h2>
          <p>Your payment slip has been uploaded and is being processed.</p>
          <button onClick={handleSendOtp}>
            Send OTP
            {isVerifying && <ClipLoader size={18} color="#f9f9f9" />} {/* Show spinner if isVerifying is true */}
          </button>
        </>
      )}

      {step === 4 && uploadStatus === "failure" && (
        <>
          <h2>Upload Failed</h2>
          <p>
            Something went wrong. Please try uploading the payment slip again.
          </p>
          <button onClick={() => setStep(3)}>Retry</button>
        </>
      )}

      {step === 5 && (
        // step 5 Activate Profile
        <form onSubmit={(e) => e.preventDefault()}>
          <label>Enter OTP</label>
          <input
            type="text"
            onChange={(e) => setUserId(e.target.value)} // Update state with OTP input
            required
            placeholder="Enter OTP"
          />
          <button
            type="button"
            className="submit-button"
            onClick={() => handleActivateProfile(userId)}
          >
            Activate Profile
          </button>
        </form>
      )}
    </div>
  );
}

export default Fees;