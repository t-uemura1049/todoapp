export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" && process.env.VERCEL === "1") {
    console.info("SECURITY_RUNTIME_CHECK", JSON.stringify({
      node: process.version,
      deployment: process.env.VERCEL_DEPLOYMENT_ID || "unknown",
    }));
  }
}
