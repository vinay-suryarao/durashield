export default function VerifyPage({
  searchParams,
}: {
  searchParams: { warrantyNo?: string; name?: string };
}) {
  // URL se dynamically Name aur Warranty No read kar rahe hain
  const warrantyNo = searchParams.warrantyNo || "Not Found";
  const name = searchParams.name || "Customer";

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0b1120", padding: "20px" }}>
      
      {/* Main Card Container */}
      <div style={{ backgroundColor: "#151e32", padding: "40px", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", border: "1px solid #2a3449", textAlign: "center", maxWidth: "500px", width: "100%" }}>
        
        {/* Success Icon */}
        <div style={{ fontSize: "60px", marginBottom: "10px" }}>✅</div>
        
        {/* Neon/Light Green for dark mode visibility */}
        <h1 style={{ color: "#4ade80", margin: "0 0 20px 0", fontSize: "28px" }}>
          Registration Successful..!
        </h1>
        
        {/* Light Gray text for readability */}
        <p style={{ color: "#94a3b8", fontSize: "16px", marginBottom: "30px", lineHeight: "1.5" }}>
          This product is officially registered in Durashield.
        </p>

        {/* Dynamic User Data Box - Darker inset look */}
        <div style={{ backgroundColor: "#0b1120", border: "1px solid #2a3449", borderRadius: "8px", padding: "20px", textAlign: "left" }}>
          
          <div style={{ marginBottom: "15px", borderBottom: "1px solid #2a3449", paddingBottom: "10px" }}>
            <span style={{ fontSize: "14px", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" }}>Customer Name</span>
            {/* White text for Name */}
            <div style={{ fontSize: "20px", fontWeight: "bold", color: "#f8fafc", marginTop: "5px" }}>
              {name}
            </div>
          </div>
          
          <div>
            <span style={{ fontSize: "14px", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" }}>Warranty ID</span>
            {/* Orange text matching your website's buttons */}
            <div style={{ fontSize: "20px", fontWeight: "bold", color: "#f97316", marginTop: "5px" }}>
              {warrantyNo}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}