/* ═══════════════════════════════════════════════════════════
   AuthUI.jsx  —  Shared primitives for all auth pages

   WHY THIS FILE EXISTS:
   All 4 auth pages (SignIn, FanRegister, ArtistRegister,
   ForgotPassword) share the same dark theme and several
   small building blocks. Instead of copy-pasting them into
   every file, we define them once here and import as needed.

   WHAT'S EXPORTED:
   ┌─────────────────┬────────────────────────────────────────┐
   │ kaStyles        │ Full CSS string for the dark theme.    │
   │                 │ Injected via <style>{kaStyles}</style> │
   │                 │ in each page component.                │
   ├─────────────────┼────────────────────────────────────────┤
   │ <Logo>          │ KA icon + "Kamui Audtlist" wordmark.   │
   │                 │ Appears at the top of every page.      │
   ├─────────────────┼────────────────────────────────────────┤
   │ <Field>         │ A labelled <input>. Props:             │
   │                 │   label, type, placeholder, hint       │
   ├─────────────────┼────────────────────────────────────────┤
   │ <TermsCheckbox> │ "I agree to Terms & Privacy" row.      │
   │                 │ Used in FanRegister & ArtistRegister.  │
   ├─────────────────┼────────────────────────────────────────┤
   │ <RegisterTabs>  │ Fan / Artist toggle tabs.              │
   │                 │ Used in FanRegister & ArtistRegister.  │
   └─────────────────┴────────────────────────────────────────┘
═══════════════════════════════════════════════════════════ */

/* ── Shared auth theme styles ─────────────────────────────
   The auth pages import this string and inject it with:
     <style>{kaStyles}</style>
   This keeps visual styling consistent across auth screens.
*/
export const kaStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700&family=DM+Sans:wght@300;400;500&display=swap');

  .ka-root {
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    background: #0e0e14;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    position: relative;
  }
  .ka-root::before {
    content: '';
    position: fixed;
    top: -80px; left: 50%;
    transform: translateX(-50%);
    width: 600px; height: 500px;
    background: radial-gradient(circle, rgba(130,80,255,0.1) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  /* Logo */
  .ka-logo {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 32px; z-index: 1;
  }
  .ka-logo-icon {
    width: 40px; height: 40px;
    background: #1e1e2e;
    border: 1px solid #333;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-weight: 700; font-size: 13px;
    color: #ccc; letter-spacing: -0.5px;
  }
  .ka-logo-text {
    font-family: 'Syne', sans-serif;
    font-weight: 500; font-size: 18px;
    color: #e8e8f0; letter-spacing: -0.3px;
  }

  /* Card */
  .ka-card {
    background: #16161f;
    border: 0.5px solid #2a2a3a;
    border-radius: 16px;
    padding: 32px;
    width: 100%; max-width: 400px;
    z-index: 1;
  }

  /* Headings */
  .ka-title {
    font-family: 'Syne', sans-serif;
    font-size: 20px; font-weight: 700;
    color: #f0f0fa;
    margin-bottom: 6px; text-align: center;
  }
  .ka-subtitle {
    font-size: 13px; color: #666;
    text-align: center;
    margin-bottom: 28px; line-height: 1.5;
  }

  /* Register tabs */
  .ka-tabs {
    display: flex;
    background: #0e0e14;
    border: 0.5px solid #2a2a3a;
    border-radius: 10px;
    padding: 3px; margin-bottom: 24px;
  }
  .ka-tab {
    flex: 1; padding: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500;
    border: none; background: transparent;
    color: #555; border-radius: 8px;
    cursor: pointer; transition: all 0.18s;
  }
  .ka-tab.active { background: #23233a; color: #c5b8ff; }

  /* Form fields */
  .ka-field { margin-bottom: 16px; }
  .ka-label {
    display: block;
    font-size: 12px; font-weight: 500;
    color: #888; margin-bottom: 6px; letter-spacing: 0.3px;
  }
  .ka-input {
    width: 100%; padding: 10px 14px;
    background: #0e0e14;
    border: 0.5px solid #2a2a3a;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; color: #e8e8f0;
    outline: none; transition: border-color 0.15s;
    box-sizing: border-box;
  }
  .ka-input::placeholder { color: #444; }
  .ka-input:focus { border-color: #6644cc; }

  .ka-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .ka-hint { font-size: 11px; color: #555; margin-top: 4px; }

  /* Terms checkbox */
  .ka-check {
    display: flex; align-items: flex-start; gap: 10px;
    margin: 16px 0 20px;
  }
  .ka-checkbox {
    width: 18px; height: 18px; flex-shrink: 0;
    background: #0e0e14;
    border: 1.5px solid #333;
    border-radius: 50%; cursor: pointer;
    margin-top: 1px; accent-color: #6644cc;
  }
  .ka-check-label { font-size: 12px; color: #666; line-height: 1.5; }
  .ka-check-label a { color: #9977ee; text-decoration: none; }

  /* Primary button */
  .ka-btn {
    width: 100%; padding: 12px;
    background: #1e1030;
    border: 1px solid #5533aa;
    border-radius: 10px;
    font-family: 'Syne', sans-serif;
    font-size: 15px; font-weight: 700;
    color: #c5b8ff; cursor: pointer;
    transition: background 0.15s, transform 0.1s;
    letter-spacing: 0.2px;
  }
  .ka-btn:hover  { background: #2a1845; }
  .ka-btn:active { transform: scale(0.98); }

  /* Footer navigation links */
  .ka-footer {
    text-align: center; margin-top: 20px;
    font-size: 12px; color: #555; line-height: 1.9;
  }
  .ka-footer a { color: #9977ee; text-decoration: none; cursor: pointer; }
  .ka-footer a:hover { text-decoration: underline; }

  /* Forgot password link (right-aligned under password field) */
  .ka-forgot {
    display: block; text-align: right;
    font-size: 12px; color: #9977ee;
    margin-top: 4px; cursor: pointer;
    background: none; border: none;
    font-family: 'DM Sans', sans-serif;
  }

  /* reCAPTCHA notice */
  .ka-notice {
    font-size: 11px; color: #555;
    text-align: center; margin-top: 10px; line-height: 1.5;
  }
  .ka-notice a { color: #666; text-decoration: none; }

  /* Success box (used in ForgotPassword confirmation state) */
  .ka-success {
    background: #0e1a0e;
    border: 0.5px solid #2a4a2a;
    border-radius: 10px;
    padding: 16px;
    text-align: center;
    margin-bottom: 20px;
  }
  .ka-success-icon {
    font-size: 28px; margin-bottom: 8px;
  }
  .ka-success-title {
    font-family: 'Syne', sans-serif;
    font-size: 15px; font-weight: 700;
    color: #6abf6a; margin-bottom: 4px;
  }
  .ka-success-text {
    font-size: 12px; color: #558855; line-height: 1.5;
  }
`;

/* ── Reusable React components ─────────────────────────── */

/**
 * KA icon + wordmark shown at the top of every auth page.
 * Used as the shared branding header on SignIn, register, and forgot-password screens.
 */
export function Logo() {
  return (
    <div className="ka-logo">
      <div className="ka-logo-icon">KA</div>
      <span className="ka-logo-text">Kamui Audtlist</span>
    </div>
  );
}

/**
 * Reusable labelled input field.
 * Props:
 *   label       - field label text shown above the input
 *   type        - HTML input type (default "text")
 *   placeholder - placeholder text shown inside the input
 *   hint        - optional helper text shown below the input
 */
export function Field({ label, type = "text", placeholder, hint, ...rest }) {
  return (
    <div className="ka-field">
      <label className="ka-label">{label}</label>
      <input
        className="ka-input"
        type={type}
        placeholder={placeholder}
        {...rest}
      />
      {hint && <p className="ka-hint">{hint}</p>}
    </div>
  );
}

/**
 * Reusable terms agreement checkbox row.
 * Props:
 *   id - unique string used to wire the label to the checkbox input.
 *
 * This component is used on registration screens to show the
 * standard "I agree to Terms of Use and Privacy Policy" consent row.
 */
export function TermsCheckbox({ id }) {
  return (
    <div className="ka-check">
      <input type="checkbox" className="ka-checkbox" id={id} />
      <label htmlFor={id} className="ka-check-label">
        I have read and agree to the <a href="#">Terms of Use</a> and{" "}
        <a href="#">Privacy Policy</a>
      </label>
    </div>
  );
}

/**
 * Fan / Artist toggle tabs shown on registration pages.
 * Props:
 *   active  - currently selected tab, either "fan" or "artist"
 *   onFan   - callback when Fan tab is clicked
 *   onArtist - callback when Artist tab is clicked
 *
 * The active prop controls which tab is visually highlighted.
 */
export function RegisterTabs({ active, onFan, onArtist }) {
  return (
    <div className="ka-tabs">
      <button
        className={`ka-tab ${active === "fan" ? "active" : ""}`}
        onClick={onFan}
      >
        Fan
      </button>
      <button
        className={`ka-tab ${active === "artist" ? "active" : ""}`}
        onClick={onArtist}
      >
        Artist
      </button>
    </div>
  );
}
