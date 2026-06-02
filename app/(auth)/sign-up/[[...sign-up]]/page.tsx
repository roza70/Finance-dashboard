import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh", width: "100%", backgroundColor: "#030712" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontWeight: "bold", fontSize: "30px", color: "#f9fafb" }}>
            Join BudgetIQ
          </h1>
          <p style={{ color: "#6B7280" }}>
            Start tracking your finances today
          </p>
        </div>
        <SignUp path="/sign-up" />
      </div>
      <div style={{ backgroundColor: "#111827", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderLeft: "1px solid #1f2937" }}>
        <div style={{ textAlign: "center", color: "white" }}>
          <div style={{ fontSize: "80px", marginBottom: "24px" }}>💰</div>
          <h1 style={{ fontSize: "42px", fontWeight: "bold", marginBottom: "12px" }}>
            Budget<span style={{ color: "#818cf8" }}>IQ</span>
          </h1>
          <p style={{ fontSize: "16px", color: "#9ca3af", maxWidth: "300px" }}>
            Your intelligent financial companion
          </p>
          <div style={{ display: "flex", gap: "12px", marginTop: "32px", justifyContent: "center" }}>
            <div style={{ backgroundColor: "#1f2937", padding: "12px 20px", borderRadius: "8px", color: "#818cf8", fontSize: "14px" }}>📊 Analytics</div>
            <div style={{ backgroundColor: "#1f2937", padding: "12px 20px", borderRadius: "8px", color: "#34d399", fontSize: "14px" }}>💹 Tracking</div>
            <div style={{ backgroundColor: "#1f2937", padding: "12px 20px", borderRadius: "8px", color: "#f472b6", fontSize: "14px" }}>🎯 Goals</div>
          </div>
        </div>
      </div>
    </div>
  );
}