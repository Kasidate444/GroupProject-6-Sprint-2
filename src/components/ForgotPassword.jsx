/* ═══════════════════════════════════════════════
   ForgotPassword.jsx  —  Forgot password flow

   Two internal steps managed with useState:
     "request"  →  user enters their email
     "sent"     →  confirmation screen

   Props:
     onGoSignIn  () => void   → back to Sign in
═══════════════════════════════════════════════ */
import { useState } from "react";
import { kaStyles, Logo } from "./AuthUI";

export default function ForgotPassword({ onGoSignIn }) {
  // Manage which screen is shown in the forgot-password flow.
  // "request" renders the email input form.
  // "sent" renders the confirmation message after the user clicks send.
  const [step, setStep] = useState("request");

  return (
    <>
      {/* Shared auth theme styles injected from AuthUI.jsx */}
      <style>{kaStyles}</style>
      <div className="ka-root">
        <Logo />

        <div className="ka-card">
          {/* Step 1: Email entry form. This block is shown only when step === "request". */}
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

              {/* Clicking this button switches the UI to the confirmation state. */}
              <button
                className="ka-btn"
                style={{ marginTop: 8 }}
                onClick={() => setStep("sent")}
              >
                Send reset link
              </button>

              <div className="ka-footer">
                {/* Callback to return to the sign-in page. */}
                <a onClick={onGoSignIn}>← Back to sign in</a>
              </div>
            </>
          )}

          {/* Step 2: Confirmation message, shown only when step === "sent". */}
          {step === "sent" && (
            <>
              <p className="ka-title">Check your inbox</p>
              <p className="ka-subtitle" style={{ marginBottom: 20 }}>
                We've sent a password reset link to your email.
              </p>

              <div className="ka-success">
                <div className="ka-success-icon">✉️</div>
                <p className="ka-success-title">Reset link sent!</p>
                <p className="ka-success-text">
                  Check your inbox (and spam folder) for the reset email. The
                  link expires in 30 minutes.
                </p>
              </div>

              {/* After confirmation, the user can go back to sign-in. */}
              <button className="ka-btn" onClick={onGoSignIn}>
                Back to sign in
              </button>

              <div className="ka-footer">
                Didn't receive it?{" "}
                {/* Resend returns the UI to the email form. */}
                <a onClick={() => setStep("request")}>Resend email</a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
