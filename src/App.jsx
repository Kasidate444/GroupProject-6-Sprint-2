/* ═══════════════════════════════════════════════
   App.jsx  —  Root component / view router

   Manages which of the 4 auth pages is visible
   using a simple useState string.

   Views:  "signin" | "fan" | "artist" | "forgot"
═══════════════════════════════════════════════ */
import { useState } from "react";
import SignIn from "./components/SignIn";
import FanRegister from "./components/FanRegister";
import ArtistRegister from "./components/ArtistRegister";
import ForgotPassword from "./components/ForgotPassword";

export default function App() {
  // The current auth page shown to the user.
  // App keeps a single string in state and renders the matching page.
  const [view, setView] = useState("signin");

  // Simple view router: choose which auth screen to render.
  // Each page receives callbacks that update 'view' to show a different page.
  switch (view) {
    case "fan":
      return (
        <FanRegister
          // Back to the sign-in page
          onGoSignIn={() => setView("signin")}
          // Switch to the artist signup page
          onGoArtist={() => setView("artist")}
        />
      );

    case "artist":
      return (
        <ArtistRegister
          // Back to the sign-in page
          onGoSignIn={() => setView("signin")}
          // Switch to the fan signup page
          onGoFan={() => setView("fan")}
        />
      );

    case "forgot":
      return (
        <ForgotPassword
          // Return to the sign-in page after forgot-password flow
          onGoSignIn={() => setView("signin")}
        />
      );

    default: // "signin"
      return (
        <SignIn
          // Navigate to fan registration
          onGoFan={() => setView("fan")}
          // Navigate to artist registration
          onGoArtist={() => setView("artist")}
          // Navigate to forgot password flow
          onGoForgot={() => setView("forgot")}
        />
      );
  }
}
