import "./auth.css";

export default function ArtistRegister({ onGoSignIn, onGoFan }) {
  return (
    <div className="ka-root">
      {/* Logo */}
      <div className="ka-logo">
        <div className="ka-logo__icon">KA</div>
        <span className="ka-logo__text">Kamui Audtlist</span>
      </div>

      <div className="ka-card">
        <p className="ka-title">Create your account</p>
        <p className="ka-subtitle">
          Join as an artist and start sharing your music
        </p>

        {/* Fan / Artist tabs */}
        <div className="ka-tabs">
          <button className="ka-tab" onClick={onGoFan}>
            Fan
          </button>
          <button className="ka-tab ka-tab--active">Artist</button>
        </div>

        {/* Artist / Band name */}
        <div className="ka-field">
          <label className="ka-label">Artist / Band Name</label>
          <input
            className="ka-input"
            type="text"
            placeholder="e.g. The Midnight"
          />
        </div>

        {/* Username & email */}
        <div className="ka-row">
          <div className="ka-field">
            <label className="ka-label">Username</label>
            <input className="ka-input" type="text" placeholder="@handle" />
          </div>
          <div className="ka-field">
            <label className="ka-label">Email</label>
            <input
              className="ka-input"
              type="email"
              placeholder="you@mail.com"
            />
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
          <input type="checkbox" className="ka-checkbox" id="artist-terms" />
          <label htmlFor="artist-terms" className="ka-check__label">
            I have read and agree to the <a href="#">Terms of Use</a> and{" "}
            <a href="#">Privacy Policy</a>
          </label>
        </div>

        <button className="ka-btn">Register</button>

        <div className="ka-footer">
          Already have an account? <a onClick={onGoSignIn}>Log in</a>
          <br />
          Not an artist? <a onClick={onGoFan}>Sign up for a fan account</a>
        </div>
      </div>
    </div>
  );
}
