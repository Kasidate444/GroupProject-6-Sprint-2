import { useState } from "react";
import "./auth.css";

export default function ForgotPassword({ onGoSignIn }) {
  // "request" = email form  |  "sent" = confirmation screen
  const [step, setStep] = useState("request");

  return (
    <div className="ka-root">
      {/* Logo */}
      <div className="ka-logo">
        <div className="ka-logo__icon">KA</div>
        <span className="ka-logo__text">Kamui Audtlist</span>
      </div>

      <div className="ka-card">
        {/* Step 1 — Enter email */}
        {step === "request" && (
          <>
            <p className="ka-title">Forgot password?</p>
            <p className="ka-subtitle">
              Enter your email and we'll send you a reset link.
            </p>

            <div className="ka-field">
              <label className="ka-label">Email</label>
              <input
                className="ka-input"
                type="email"
                placeholder="you@mail.com"
              />
            </div>

            <button
              className="ka-btn"
              style={{ marginTop: 8 }}
              onClick={() => setStep("sent")}
            >
              Send reset link
            </button>

            <div className="ka-footer">
              <a onClick={onGoSignIn}>← Back to sign in</a>
            </div>
          </>
        )}

        {/* Step 2 — Confirmation */}
        {step === "sent" && (
          <>
            <p className="ka-title">Check your inbox</p>
            <p className="ka-subtitle" style={{ marginBottom: 20 }}>
              We've sent a password reset link to your email.
            </p>

            <div className="ka-success">
              <div className="ka-success__icon">✉️</div>
              <p className="ka-success__title">Reset link sent!</p>
              <p className="ka-success__text">
                Check your inbox (and spam folder) for the reset email. The link
                expires in 30 minutes.
              </p>
            </div>

            <button className="ka-btn" onClick={onGoSignIn}>
              Back to sign in
            </button>

            <div className="ka-footer">
              Didn't receive it?{" "}
              <a onClick={() => setStep("request")}>Resend email</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
