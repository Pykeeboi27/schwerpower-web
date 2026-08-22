import { ImageResponse } from "next/og";
import { company } from "@/lib/content/company";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#000000",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", width: 64, height: 8, backgroundColor: "#EF8E29" }} />
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 72,
            fontWeight: 600,
            color: "#ffffff",
            letterSpacing: "-0.01em",
          }}
        >
          SCHWER POWER
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#EF8E29",
            marginTop: 8,
            letterSpacing: "0.05em",
          }}
        >
          MANUFACTURING CORP
        </div>
        <div style={{ display: "flex", marginTop: 40, fontSize: 28, color: "#ffffff99" }}>
          {company.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
