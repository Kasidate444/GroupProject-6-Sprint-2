import { useState } from "react";
import "./auth.css";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

export default function LogIn({ onGoFan, onGoArtist, onGoForgot, onLogIn }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.trim().length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    return newErrors;
  };

  const handleLogIn = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      // Store only non-sensitive session info — never store passwords client-side.
      // In a real app, authentication is handled server-side and a session token
      // (e.g. JWT or cookie) is returned and stored here instead.
      const sessionData = {
        email: email.trim(),
        loggedIn: true,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem("session", JSON.stringify(sessionData));

      onLogIn();
    } catch (err) {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ka-root">
      {/* Logo */}
      <div className="ka-logo">
        <div className="ka-logo__icon">▽</div>
        <span className="ka-logo__text">AUDTLIST</span>
      </div>

      <div className="ka-card">
        <p className="ka-title">Log in</p>
        <p className="ka-subtitle">Welcome back</p>

        {/* Form-level error */}
        {errors.form && (
          <p className="ka-hint ka-hint--error" style={{ marginBottom: 12 }}>
            {errors.form}
          </p>
        )}

        {/* Email */}
        <div className="ka-field">
          <label className="ka-label">Email</label>
          <input
            className="ka-input"
            type="email"
            name="email"
            placeholder="you@mail.com"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
            }}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="ka-hint ka-hint--error">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="ka-field">
          <label className="ka-label">Password</label>
          <div className="ka-password-field">
            <input
              className="ka-input"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password)
                  setErrors((prev) => ({ ...prev, password: null }));
              }}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            <button
              className="ka-show-btn"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {/* Only show hint when there's an actual error, not unconditionally */}
          {errors.password && (
            <p id="password-error" className="ka-hint ka-hint--error">
              {errors.password}
            </p>
          )}
          <button className="ka-forgot" onClick={onGoForgot}>
            Forgot password?
          </button>
        </div>

        <button
          className="ka-btn"
          style={{ marginTop: 8 }}
          onClick={handleLogIn}
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? "Logging in…" : "Log in"}
        </button>

        <div className="ka-footer">
          Don't have an account? <a onClick={onGoFan}>Sign up as a fan</a> or{" "}
          <a onClick={onGoArtist}>an artist</a>
        </div>

        <p className="ka-notice">
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a>{" "}
          apply.
        </p>
      </div>
    </div>
  );
}
