import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh", width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontWeight: "bold", fontSize: "30px", color: "#2E2A47" }}>
            Welcome Back!
          </h1>
          <p style={{ color: "#7E8CA0" }}>
            Log in or Create account to get back to your dashboard!
          </p>
        </div>
        <SignIn path="/sign-in" />
      </div>
      <div style={{ backgroundColor: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "white", fontSize: "30px", fontWeight: "bold" }}>Finance</p>
      </div>
    </div>
  );
}