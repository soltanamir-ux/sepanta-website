import { ImageResponse } from "next/og";

export const alt = "Sepanta LLC — Software that solves everyday problems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Small helper for the blocky "S" negative-space rectangles.
const bar = (style: React.CSSProperties): React.CSSProperties => ({
  position: "absolute",
  background: "#0b1120",
  borderRadius: 6,
  ...style,
});

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0b1120 0%, #141d33 60%, #1b2a4d 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand lockup */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              position: "relative",
              display: "flex",
              width: 96,
              height: 96,
              borderRadius: 29,
              background: "linear-gradient(135deg, #ff9a5b 0%, #ff6a3d 55%, #f5522e 100%)",
            }}
          >
            <div style={bar({ left: 27, top: 23, width: 43, height: 11 })} />
            <div style={bar({ left: 27, top: 42, width: 43, height: 11 })} />
            <div style={bar({ left: 27, top: 62, width: 43, height: 11 })} />
            <div style={bar({ left: 27, top: 23, width: 11, height: 31 })} />
            <div style={bar({ left: 58, top: 42, width: 11, height: 31 })} />
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: 26,
              fontSize: 54,
              fontWeight: 700,
              color: "#f6f8fc",
              letterSpacing: "-1px",
            }}
          >
            Sepanta
          </div>
        </div>

        {/* Tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              maxWidth: 920,
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-2px",
              color: "#f6f8fc",
            }}
          >
            We build apps that solve everyday problems.
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 30 }}>
            <div style={{ width: 46, height: 6, borderRadius: 3, background: "#ff6a3d", marginRight: 16 }} />
            <div style={{ display: "flex", fontSize: 28, color: "#9dabc7" }}>sepanta.llc</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
