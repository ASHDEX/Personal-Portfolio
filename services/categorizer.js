import { VENDOR_MAP } from "./vendorMap.js";

export function detectVendor(text = "") {
  const t = text.toLowerCase();

  for (const key of Object.keys(VENDOR_MAP)) {
    if (t.includes(key)) {
      return key; // canonical slug
    }
  }

  return "others";
}

export function displayVendor(slug) {
  return VENDOR_MAP[slug] || "Others";
}
