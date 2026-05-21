import { useState } from "react";
import ArtistGenreSelect from "./ArtistGenreSelect";
import "./auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const initialForm = {
  artistName: "",
  genre: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptedTerms: false,
};

export default function ArtistRegister({ onGoLogIn, onGoFan }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: null }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;

    if (!form.artistName.trim()) {
      nextErrors.artistName = "Artist or band name is required.";
    }

    if (!form.genre) {
      nextErrors.genre = "Artist genre is required.";
    }

    if (!form.username.trim()) {
      nextErrors.username = "Username is required.";
    } else if (!usernamePattern.test(form.username.trim())) {
      nextErrors.username = "Use 3-20 letters, numbers, or underscores only.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (!form.acceptedTerms) {
      nextErrors.acceptedTerms = "You must agree to the terms to continue.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setIsSubmitted(false);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
  };

  return (
    <div className="ka-root">
      <div className="ka-logo">
        <div className="ka-logo__icon">▽</div>
        <span className="ka-logo__text">AUDTLIST</span>
      </div>

      <form className="ka-card" onSubmit={handleSubmit} noValidate>
        <p className="ka-title">Create artist account</p>
        <p className="ka-subtitle">
          Join as an artist and start sharing your products
        </p>

        <div className="ka-tabs" role="tablist" aria-label="Account type">
          <button className="ka-tab" type="button" onClick={onGoFan}>
            Fan
          </button>
          <button className="ka-tab ka-tab--active" type="button">
            Artist
          </button>
        </div>

        {isSubmitted && (
          <p className="ka-hint ka-hint--success" role="status">
            Account details look good. You can now log in.
          </p>
        )}

        <div className="ka-field">
          <label className="ka-label" htmlFor="artist-name">
            Artist or band name
          </label>
          <input
            id="artist-name"
            className="ka-input"
            type="text"
            name="organization"
            placeholder="The Midnight"
            autoComplete="organization"
            value={form.artistName}
            onChange={(event) => updateField("artistName", event.target.value)}
            aria-invalid={!!errors.artistName}
            aria-describedby={
              errors.artistName ? "artist-name-error" : undefined
            }
            required
          />
          {errors.artistName && (
            <p id="artist-name-error" className="ka-hint ka-hint--error">
              {errors.artistName}
            </p>
          )}
        </div>

        <ArtistGenreSelect
          value={form.genre}
          error={errors.genre}
          onChange={(value) => updateField("genre", value)}
        />

        <div className="ka-row">
          <div className="ka-field">
            <label className="ka-label" htmlFor="artist-username">
              Username
            </label>
            <input
              id="artist-username"
              className="ka-input"
              type="text"
              name="username"
              placeholder="artistname"
              autoComplete="username"
              value={form.username}
              onChange={(event) => updateField("username", event.target.value)}
              aria-invalid={!!errors.username}
              aria-describedby={
                errors.username
                  ? "artist-username-error"
                  : "artist-username-hint"
              }
              required
            />
            {errors.username ? (
              <p id="artist-username-error" className="ka-hint ka-hint--error">
                {errors.username}
              </p>
            ) : (
              <p id="artist-username-hint" className="ka-hint">
                Letters, numbers, and underscores only.
              </p>
            )}
          </div>

          <div className="ka-field">
            <label className="ka-label" htmlFor="artist-email">
              Email
            </label>
            <input
              id="artist-email"
              className="ka-input"
              type="email"
              name="email"
              placeholder="you@mail.com"
              autoComplete="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "artist-email-error" : undefined}
              required
            />
            {errors.email && (
              <p id="artist-email-error" className="ka-hint ka-hint--error">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="ka-row">
          <div className="ka-field">
            <label className="ka-label" htmlFor="artist-password">
              Password
            </label>
            <div className="ka-password-field">
              <input
                id="artist-password"
                className="ka-input"
                type={showPassword ? "text" : "password"}
                name="new-password"
                placeholder="••••••••••"
                autoComplete="new-password"
                value={form.password}
                onChange={(event) =>
                  updateField("password", event.target.value)
                }
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password
                    ? "artist-password-error"
                    : "artist-password-hint"
                }
                minLength={8}
                required
              />
              <button
                className="ka-show-btn"
                onClick={() => setShowPassword((current) => !current)}
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password ? (
              <p id="artist-password-error" className="ka-hint ka-hint--error">
                {errors.password}
              </p>
            ) : (
              <p id="artist-password-hint" className="ka-hint">
                Use at least 8 characters.
              </p>
            )}
          </div>

          <div className="ka-field">
            <label className="ka-label" htmlFor="artist-confirm-password">
              Confirm password
            </label>
            <div className="ka-password-field">
              <input
                id="artist-confirm-password"
                className="ka-input"
                type={showConfirmPassword ? "text" : "password"}
                name="confirm-password"
                placeholder="••••••••••"
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={(event) =>
                  updateField("confirmPassword", event.target.value)
                }
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={
                  errors.confirmPassword
                    ? "artist-confirm-password-error"
                    : undefined
                }
                required
              />
              <button
                className="ka-show-btn"
                onClick={() => setShowConfirmPassword((current) => !current)}
                type="button"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p
                id="artist-confirm-password-error"
                className="ka-hint ka-hint--error"
              >
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        <div className="ka-check">
          <input
            type="checkbox"
            className="ka-checkbox"
            id="artist-terms"
            checked={form.acceptedTerms}
            onChange={(event) =>
              updateField("acceptedTerms", event.target.checked)
            }
            aria-invalid={!!errors.acceptedTerms}
            aria-describedby={
              errors.acceptedTerms ? "artist-terms-error" : undefined
            }
            required
          />
          <label htmlFor="artist-terms" className="ka-check__label">
            I agree to the <a href="#">Terms of Use</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </label>
        </div>
        {errors.acceptedTerms && (
          <p id="artist-terms-error" className="ka-hint ka-hint--error">
            {errors.acceptedTerms}
          </p>
        )}

        <button className="ka-btn" type="submit">
          Create account
        </button>

        <div className="ka-footer">
          Already have an account? <a onClick={onGoLogIn}>Log in</a>
          <br />
          Not an artist? <a onClick={onGoFan}>Create a fan account</a>
        </div>
      </form>
    </div>
  );
}
