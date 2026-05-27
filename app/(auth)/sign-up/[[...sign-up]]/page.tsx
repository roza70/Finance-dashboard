import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh", width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px" }}>
        <SignUp path="/sign-up" />
      </div>
      <div style={{ backgroundColor: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", color: "white" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>💰</div>
          <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "8px" }}>Finance</h1>
          <p style={{ fontSize: "16px", opacity: 0.8 }}>Manage your money smartly</p>
        </div>
      </div>
    </div>
  );
}