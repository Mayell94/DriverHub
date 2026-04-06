import { CarSpecs } from "./types";

export const CAR_DB: Record<string, CarSpecs> = {
  "porsche 911 gt3 rs": { hp: 518, torque: "343 lb-ft", engine: "4.0L Flat-6 NA", trans: "7-Speed PDK", drive: "RWD", weight: "3,268 lbs", z60: "3.2s", top: "184 mph" },
  "bmw m3 competition": { hp: 503, torque: "479 lb-ft", engine: "3.0L I6 Twin-Turbo", trans: "8-Speed Auto", drive: "RWD/AWD", weight: "3,840 lbs", z60: "3.4s", top: "180 mph" },
  "toyota gr supra": { hp: 382, torque: "368 lb-ft", engine: "3.0L I6 Turbo", trans: "8-Speed Auto", drive: "RWD", weight: "3,400 lbs", z60: "3.9s", top: "160 mph" },
  "ford mustang dark horse": { hp: 500, torque: "418 lb-ft", engine: "5.0L Coyote V8", trans: "6-Speed Manual", drive: "RWD", weight: "3,800 lbs", z60: "4.0s", top: "168 mph" },
  "nissan gt-r": { hp: 600, torque: "481 lb-ft", engine: "3.8L V6 Twin-Turbo", trans: "6-Speed DCT", drive: "AWD", weight: "3,928 lbs", z60: "2.9s", top: "205 mph" },
  "honda civic type r": { hp: 315, torque: "310 lb-ft", engine: "2.0L VTEC Turbo", trans: "6-Speed Manual", drive: "FWD", weight: "3,118 lbs", z60: "4.9s", top: "169 mph" },
  "audi rs6": { hp: 621, torque: "627 lb-ft", engine: "4.0L V8 Twin-Turbo", trans: "8-Speed Auto", drive: "AWD", weight: "4,850 lbs", z60: "3.3s", top: "190 mph" },
  "bmw m4 csl": { hp: 543, torque: "479 lb-ft", engine: "3.0L I6 Twin-Turbo", trans: "8-Speed Auto", drive: "RWD", weight: "3,640 lbs", z60: "3.4s", top: "191 mph" },
  "bmw m2": { hp: 453, torque: "406 lb-ft", engine: "3.0L I6 Twin-Turbo", trans: "6-Speed Manual", drive: "RWD", weight: "3,636 lbs", z60: "3.9s", top: "177 mph" },
  "chevrolet corvette z06": { hp: 670, torque: "460 lb-ft", engine: "5.5L FP V8 NA", trans: "8-Speed DCT", drive: "RWD", weight: "3,434 lbs", z60: "2.6s", top: "195 mph" },
  "mazda rx-7": { hp: 276, torque: "231 lb-ft", engine: "1.3L 13B Rotary TT", trans: "5-Speed Manual", drive: "RWD", weight: "2,789 lbs", z60: "5.0s", top: "159 mph" },
};

export function lookupSpecs(make: string, model: string): CarSpecs | null {
  const key = (make + " " + model).toLowerCase().trim();
  for (const [k, v] of Object.entries(CAR_DB)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  return null;
}
