/* ═══════════════════════════════════════════════
   FanRegister.jsx  —  Registration for fans

   Props:
     onGoSignIn  () => void   → Sign in page
     onGoArtist  () => void   → Artist register
═══════════════════════════════════════════════ */
import { kaStyles, Logo, Field, TermsCheckbox, RegisterTabs } from "./AuthUI";

export default function FanRegister({ onGoSignIn, onGoArtist }) {
  return (
    <>
      {/* Shared auth theme styles from AuthUI.jsx */}
      <style>{kaStyles}</style>
      <div className="ka-root">
        <Logo />

        <div className="ka-card">
          <p className="ka-title">Create account</p>
          <p className="ka-subtitle">Sign up for a Kamui fan account</p>

          {/*
            The registration tabs let the user switch between Fan and Artist signup.
            active="fan" keeps the Fan tab highlighted on this page.
            onArtist navigates to the artist registration screen.
          */}
          <RegisterTabs active="fan" onFan={() => {}} onArtist={onGoArtist} />

          {/* Email field for the fan account */}
          <Field label="Email" type="email" placeholder="you@mail.com" />

          {/* Collect first and last name in a two-column layout. */}
          <div className="ka-row">
            <Field label="First name" placeholder="first name" />
            <Field label="Last name" placeholder="last name" />
          </div>

          {/* Password and confirmation fields shown side by side. */}
          <div className="ka-row">
            <Field label="Password" type="password" placeholder="••••••••••" />
            <Field
              label="Confirm password"
              type="password"
              placeholder="••••••••••"
            />
          </div>
          <p className="ka-hint">9 characters minimum.</p>

          {/* Terms agreement checkbox shared by auth pages. */}
          <TermsCheckbox id="fan-terms" />

          {/* Register button is currently UI-only and not wired to a submit handler. */}
          <button className="ka-btn">Register</button>

          <div className="ka-footer">
            Already have an account? <a onClick={onGoSignIn}>Log in</a>
            <br />
            Is you an artist?{" "}
            <a onClick={onGoArtist}>Sign up for an artist account</a>
          </div>
        </div>
      </div>
    </>
  );
}
