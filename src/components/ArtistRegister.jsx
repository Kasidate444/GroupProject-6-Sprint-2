/* ═══════════════════════════════════════════════
   ArtistRegister.jsx  —  Registration for artists

   Props:
     onGoSignIn  () => void   → Sign in page
     onGoFan     () => void   → Fan register
═══════════════════════════════════════════════ */
import { kaStyles, Logo, Field, TermsCheckbox, RegisterTabs } from "./AuthUI";

export default function ArtistRegister({ onGoSignIn, onGoFan }) {
  return (
    <>
      {/* Shared auth page styling injected from AuthUI.jsx */}
      <style>{kaStyles}</style>
      <div className="ka-root">
        <Logo />

        <div className="ka-card">
          <p className="ka-title">Create your account</p>
          <p className="ka-subtitle">
            Join as an artist and start sharing your music
          </p>

          {/*
            Tab switcher between Fan and Artist registration.
            active="artist" highlights the current artist tab.
          */}
          <RegisterTabs active="artist" onFan={onGoFan} onArtist={() => {}} />

          {/* Artist name field for band or stage name. */}
          <Field label="Artist / Band Name" placeholder="e.g. The Midnight" />

          {/* Username and email fields shown in one row. */}
          <div className="ka-row">
            <Field label="Username" placeholder="@handle" />
            <Field label="Email" type="email" placeholder="you@mail.com" />
          </div>

          {/* Password and confirmation inputs in a two-column layout. */}
          <div className="ka-row">
            <Field label="Password" type="password" placeholder="••••••••••" />
            <Field
              label="Confirm password"
              type="password"
              placeholder="••••••••••"
            />
          </div>

          {/* Terms agreement checkbox shared by registration pages. */}
          <TermsCheckbox id="artist-terms" />

          {/* The register button is present as UI only and has no submit handler yet. */}
          <button className="ka-btn">Register</button>

          <div className="ka-footer">
            Already have an account? <a onClick={onGoSignIn}>Log in</a>
            <br />
            Not an artist? <a onClick={onGoFan}>Sign up for a fan account</a>
          </div>
        </div>
      </div>
    </>
  );
}
