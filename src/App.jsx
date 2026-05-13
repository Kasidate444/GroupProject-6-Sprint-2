import { useState, useEffect } from "react";
import SignIn from "./components/SignIn";
import FanRegister from "./components/FanRegister";
import ArtistRegister from "./components/ArtistRegister";
import ForgotPassword from "./components/ForgotPassword";

// "signin" | "fan" | "artist" | "forgot" | "home"
export default function App() {
  const [view, setView] = useState("signin");

  useEffect(() => {
    // Check if user is already logged in
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.loggedIn) {
          setView("home");
        }
      } catch (e) {
        // Invalid data, remove it
        localStorage.removeItem("user");
      }
    }
  }, []);

  switch (view) {
    case "fan":
      return (
        <FanRegister
          onGoSignIn={() => setView("signin")}
          onGoArtist={() => setView("artist")}
        />
      );
    case "artist":
      return (
        <ArtistRegister
          onGoSignIn={() => setView("signin")}
          onGoFan={() => setView("fan")}
        />
      );
    case "forgot":
      return <ForgotPassword onGoSignIn={() => setView("signin")} />;
    case "home":
      return (
        <div
          style={{
            minHeight: "100vh",
            background: "#0e0e14",
            color: "#e8e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "DM Sans, sans-serif",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1>Welcome to Kamui Audtlist!</h1>
            <p>You have successfully signed in.</p>
            <button
              onClick={() => {
                localStorage.removeItem("user");
                setView("signin");
              }}
              style={{
                padding: "10px 20px",
                background: "#1e1030",
                border: "1px solid #5533aa",
                borderRadius: "10px",
                color: "#c5b8ff",
                cursor: "pointer",
                fontFamily: "Syne, sans-serif",
                fontSize: "15px",
                fontWeight: "700",
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      );
    default:
      return (
        <SignIn
          onGoFan={() => setView("fan")}
          onGoArtist={() => setView("artist")}
          onGoForgot={() => setView("forgot")}
          onSignIn={() => setView("home")}
        />
      );
  }
}
