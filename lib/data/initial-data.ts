import { User, GarageCar, Friend, ChatMessage, Post, ForumCategory, ForumThread } from "../types";
import { CAR_DB } from "../car-db";

export const USER: User = {
  name: "Alex Mercer",
  handle: "@alexdrives",
  loc: "Essex, UK",
  rep: 2840,
};

export const initGarage: GarageCar[] = [
  { id: 1, make: "Porsche", model: "911 GT3 RS", year: 2024, emoji: "\u{1F3CE}\u{FE0F}", col: "#C0392B", specs: CAR_DB["porsche 911 gt3 rs"], mods: ["Akrapovic Titanium Exhaust", "KW Clubsport Coilovers", "Recaro Podium Seats"], gallery: ["\u{1F5BC}\u{FE0F} Canyon sunset", "\u{1F5BC}\u{FE0F} Track day", "\u{1F5BC}\u{FE0F} Engine bay"] },
  { id: 2, make: "BMW", model: "M3 Competition", year: 2023, emoji: "\u{1F697}", col: "#0066B1", specs: CAR_DB["bmw m3 competition"], mods: ["Eventuri Carbon Intake", "Bootmod3 Stage 2"], gallery: ["\u{1F5BC}\u{FE0F} Rolling shot"] },
  { id: 3, make: "Toyota", model: "GR Supra", year: 2024, emoji: "\u{1F699}", col: "#F39C12", specs: CAR_DB["toyota gr supra"], mods: ["HKS Exhaust", "Volk TE37", "BC Racing Coilovers"], gallery: ["\u{1F5BC}\u{FE0F} JDM meet", "\u{1F5BC}\u{FE0F} Garage night"] },
  { id: 4, make: "Ford", model: "Mustang Dark Horse", year: 2024, emoji: "\u{1F40E}", col: "#1A1A2E", specs: CAR_DB["ford mustang dark horse"], mods: [], gallery: [] },
];

export const initFriends: Friend[] = [
  { id: 1, name: "Jake R.", avi: "J", car: "Nissan GT-R", status: "online", x: 38, y: 52, lastMsg: "Exhaust install is done!", unread: 2 },
  { id: 2, name: "Mia T.", avi: "M", car: "Mazda RX-7", status: "online", x: 55, y: 35, lastMsg: "That B-road was insane", unread: 0 },
  { id: 3, name: "Carlos D.", avi: "C", car: "Civic Type R", status: "driving", x: 42, y: 48, lastMsg: "See you at Brands Hatch", unread: 1 },
  { id: 4, name: "Sophie L.", avi: "S", car: "Audi RS6", status: "offline", x: 60, y: 60, lastMsg: "Wales trip was amazing", unread: 0 },
  { id: 5, name: "Dan P.", avi: "D", car: "Subaru WRX STI", status: "online", x: 30, y: 65, lastMsg: "", unread: 0 },
];

export const initChats: Record<number, ChatMessage[]> = {
  1: [
    { from: "Jake R.", text: "Just got the titanium exhaust fitted \u{1F525}", time: "2:30 PM" },
    { from: "You", text: "How's it sound?", time: "2:32 PM" },
    { from: "Jake R.", text: "Exhaust install is done!", time: "2:45 PM" },
  ],
  3: [
    { from: "Carlos D.", text: "Track day tomorrow \u2014 you in?", time: "11:00 AM" },
    { from: "You", text: "100%. What time?", time: "11:05 AM" },
    { from: "Carlos D.", text: "See you at Brands Hatch", time: "11:08 AM" },
  ],
};

export const FORUM_CATS: ForumCategory[] = [
  { id: "tech", icon: "\u{1F527}", label: "Tech Help", desc: "Engine, electrical, diagnostics", threads: 234 },
  { id: "mods", icon: "\u{2699}\u{FE0F}", label: "Modifications", desc: "Builds, upgrades, installs", threads: 189 },
  { id: "spots", icon: "\u{1F4F8}", label: "Photo Spots", desc: "Best roads & scenic routes", threads: 156 },
  { id: "meets", icon: "\u{1F91D}", label: "Meets & Events", desc: "Organise local meetups", threads: 98 },
  { id: "buy", icon: "\u{1F4B0}", label: "Buy & Sell", desc: "Parts, accessories, wheels", threads: 312 },
];

export const FORUM_THREADS: Record<string, ForumThread[]> = {
  tech: [
    { id: 1, title: "CEL after intake \u2014 P0171 lean", user: "Mike W.", replies: 14, views: 203, hot: true, solved: false },
    { id: 2, title: "Best OBD2 for BMW F-series?", user: "Anna K.", replies: 22, views: 445, hot: false, solved: true },
  ],
  mods: [
    { id: 4, title: "Build log: Supra 45\u2192550whp", user: "Carlos D.", replies: 47, views: 1820, hot: true, solved: false },
    { id: 5, title: "Coilovers under \u00A31500?", user: "Sophie L.", replies: 31, views: 890, hot: false, solved: true },
  ],
  spots: [
    { id: 7, title: "Top 5 B-roads Peak District", user: "Mia T.", replies: 26, views: 1200, hot: true, solved: false },
  ],
  meets: [
    { id: 9, title: "Essex JDM meet \u2014 1st Sat monthly", user: "Jake R.", replies: 38, views: 920, hot: true, solved: false },
  ],
  buy: [
    { id: 10, title: "FS: Enkei RPF1 18x9.5 +38", user: "Dan P.", replies: 5, views: 210, hot: false, solved: false },
  ],
};

export const initPosts: Post[] = [
  {
    id: 1, user: "Jake R.", avi: "J", car: "Nissan GT-R", time: "25m ago",
    text: "Just finished a full titanium exhaust install on the GT-R. The sound is absolutely mental \u{1F50A}",
    img: true, gallery: null, galleryCarName: null, likes: 42, liked: false,
    comments: [
      { user: "Carlos D.", avi: "C", text: "That must scream!", time: "18m ago" },
      { user: "Mia T.", avi: "M", text: "RIP your neighbours", time: "12m ago" },
    ],
    showComments: false,
  },
  {
    id: 2, user: "Mia T.", avi: "M", car: "Mazda RX-7 FD", time: "2h ago",
    text: "Golden hour + mountain road + rotary noises = perfection. This is why we drive.",
    img: true, gallery: null, galleryCarName: null, likes: 87, liked: true,
    comments: [
      { user: "Jake R.", avi: "J", text: "Where is this spot??", time: "1h ago" },
    ],
    showComments: false,
  },
  {
    id: 3, user: "Carlos D.", avi: "C", car: "Civic Type R", time: "5h ago",
    text: "Track day prep done. Brands Hatch tomorrow \u2014 who's coming? \u{1F3C1}",
    img: false, gallery: null, galleryCarName: null, likes: 31, liked: false,
    comments: [],
    showComments: false,
  },
];
