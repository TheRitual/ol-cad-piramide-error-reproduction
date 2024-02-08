import { CSSProperties } from "react";

export const mainCSS: CSSProperties = {
  backgroundColor: "#000",
  width: "100%",
  height: "100vh",
  color: "#FFF",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20",
}

export const navigationCSS: CSSProperties = {
  display: "flex",
  gap: "10px",
  padding: "32px",
}

export const contentCSS: CSSProperties = {
  flex: 1,
  padding: "16px",
  width: "100%",
}

export const navigationButtonCSS: CSSProperties = {
  border: "3px solid #FFF",
  backgroundColor: "#444",
  color: "#FFF",
  padding: "12px",
  borderRadius: "12px",
  cursor: "pointer",
}

export const mapContainerCSS: CSSProperties = {
  width: "100%",
  height: "100%",
  backgroundColor: "#AAF",
  borderRadius: "8px",
  overflow: "hidden",
}