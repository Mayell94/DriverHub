import { Friend } from "./types";

// Essex, UK center point
const CENTER_LAT = 51.57;
const CENTER_LNG = 0.49;
const SPREAD = 0.15;

/**
 * Convert friend x/y (0-100) to lat/lng around Essex UK
 */
export function friendToCoord(f: Friend): { latitude: number; longitude: number } {
  return {
    latitude: CENTER_LAT + ((f.y - 50) / 50) * SPREAD,
    longitude: CENTER_LNG + ((f.x - 50) / 50) * SPREAD,
  };
}

export const MAP_CENTER = {
  latitude: CENTER_LAT,
  longitude: CENTER_LNG,
  latitudeDelta: SPREAD * 2.5,
  longitudeDelta: SPREAD * 2.5,
};

export const DARK_MAP_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#0D1117" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0D1117" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#4A5568" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#1E2D40" }] },
  { featureType: "road", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0a1628" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
];
