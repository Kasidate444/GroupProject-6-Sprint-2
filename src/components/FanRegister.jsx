import "./auth.css";

export default function FanRegister({ onGoSignIn, onGoArtist }) {
  return (
    <div className="ka-root">
      {/* Logo */}
      <div className="ka-logo">
        <div className="ka-logo__icon">KA</div>
        <span className="ka-logo__text">Kamui Audtlist</span>
      </div>

      <div className="ka-card">
        <p className="ka-title">Create account</p>
        <p className="ka-subtitle">Sign up for a Kamui fan account</p>

        {/* Fan / Artist tabs */}
        <div className="ka-tabs">
          <button className="ka-tab ka-tab--active">Fan</button>
          <button className="ka-tab" onClick={onGoArtist}>
            Artist
          </button>
        </div>

        {/* Email */}
        <div className="ka-field">
          <label className="ka-label">Email</label>
          <input className="ka-input" type="email" placeholder="you@mail.com" />
        </div>

        {/* First & last name */}
        <div className="ka-row">
          <div className="ka-field">
            <label className="ka-label">First name</label>
            <input className="ka-input" type="text" placeholder="first name" />
          </div>
          <div className="ka-field">
            <label className="ka-label">Last name</label>
            <input className="ka-input" type="text" placeholder="last name" />
          </div>
        </div>

        {/* Password */}
        <div className="ka-row">
          <div className="ka-field">
            <label className="ka-label">Password</label>
            <input
              className="ka-input"
              type="password"
              placeholder="••••••••••"
            />
          </div>
          <div className="ka-field">
            <label className="ka-label">Confirm password</label>
            <input
              className="ka-input"
              type="password"
              placeholder="••••••••••"
            />
          </div>
        </div>
        <p className="ka-hint ka-hint--error">8 characters minimum.</p>

        {/* Terms */}
        <div className="ka-check">
          <input type="checkbox" className="ka-checkbox" id="fan-terms" />
          <label htmlFor="fan-terms" className="ka-check__label">
            I have read and agree to the <a href="#">Terms of Use</a> and{" "}
            <a href="#">Privacy Policy</a>
          </label>
        </div>

        <button className="ka-btn">Register</button>

        <div className="ka-footer">
          Already have an account? <a onClick={onGoSignIn}>Log in</a>
          <br />
          Is you an artist?{" "}
          <a onClick={onGoArtist}>Sign up for an artist account</a>
        </div>
      </div>
    </div>
  );
}
