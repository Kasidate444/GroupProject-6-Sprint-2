/* ═══════════════════════════════════════════════
   SignIn.jsx  —  Sign-in page (for everyone)

   Props:
     onGoFan         () => void   → navigate to Fan register page
     onGoArtist      () => void   → navigate to Artist register page
     onGoForgot      () => void   → navigate to Forgot password page
═══════════════════════════════════════════════ */
import { kaStyles, Logo, Field } from "./AuthUI";
import { useState } from "react";

function validateCredentials(email, password) {
  const errors = { email: "", password: "" };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return { isValid: !errors.email && !errors.password, errors };
}

export default function SignIn({ onGoFan, onGoArtist, onGoForgot }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSignIn = () => {
    const result = validateCredentials(email, password);
    setErrors(result.errors);

    if (!result.isValid) {
      return;
    }

    // TODO: replace with your auth handler.
    console.log("Sign in payload:", { email, password });
  };

  return (
    <>
      {/*
        Inject the shared auth CSS styles defined in AuthUI.jsx.
        Every auth page reuses this same theme and style block.
      */}
      <style>{kaStyles}</style>

      <div className="ka-root">
        {/* Shared logo shown at the top of auth screens */}
        <Logo />

        <div className="ka-card">
          <p className="ka-title">Sign in</p>
          <p className="ka-subtitle">Welcome back</p>

          {/* Username / email input field */}
          <Field
            label="Username / email"
            type="email"
            placeholder="you@mail.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
            hint={errors.email}
          />

          {/* Password field with a "Forgot password" action */}
          <div className="ka-field">
            <label className="ka-label">Password</label>
            <input
              className="ka-input"
              type="password"
              placeholder="••••••••••"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
            />
            {errors.password && <p className="ka-hint">{errors.password}</p>}

            {/* Clicking this button triggers the onGoForgot callback */}
            <button className="ka-forgot" onClick={onGoForgot}>
              Forgot password?
            </button>
          </div>

          {/* Primary sign-in button; currently UI only, no form handler attached */}
          <button
            className="ka-btn"
            style={{ marginTop: 8 }}
            type="button"
            onClick={handleSignIn}
          >
            Sign in
          </button>

          {/* Links that navigate the user to the appropriate register pages */}
          <div className="ka-footer">
            Don't have an account? <a onClick={onGoFan}>Sign up as a fan</a> or{" "}
            <a onClick={onGoArtist}>an artist</a>
          </div>

          {/* reCAPTCHA notice shown below the main card */}
          <p className="ka-notice">
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a>{" "}
            apply.
          </p>
        </div>
      </div>
    </>
  );
}
