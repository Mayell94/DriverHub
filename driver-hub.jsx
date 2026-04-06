import { useState, useEffect, useRef, createContext, useContext } from "react";

const THEMES = {
  mostWanted: {
    id: "mostWanted", label: "Most Wanted", desc: "Street racing legacy",
    bg: "#0B0B0B", bgAlt: "#111", card: "#141414", cardBorder: "#222",
    accent: "#E8A000", accentHot: "#FFB800", accentGlow: "rgba(232,160,0,0.25)",
    red: "#D42020", green: "#2ECC40", greenGlow: "rgba(46,204,64,0.2)", blue: "#2196F3",
    white: "#F5F0E8", gray: "#888", grayDim: "#555", grayDark: "#333",
    headFont: "'Teko',Impact,sans-serif", bodyFont: "'Barlow',sans-serif",
    monoFont: "'Barlow Semi Condensed',monospace",
    hazard: true, mTheme: false,
    fontUrl: "https://fonts.googleapis.com/css2?family=Teko:wght@400;500;600;700&family=Barlow:wght@300;400;500;600;700&family=Barlow+Semi+Condensed:wght@400;500;600&display=swap",
    gradient: "radial-gradient(ellipse at 40% 15%,#1a1000 0%,#0B0B0B 45%,#050505 100%)",
  },
  forza: {
    id: "forza", label: "Horizon", desc: "Festival vibes",
    bg: "#0C1220", bgAlt: "#101828", card: "#15202E", cardBorder: "#1E3048",
    accent: "#00D4FF", accentHot: "#40E0FF", accentGlow: "rgba(0,212,255,0.2)",
    red: "#FF4081", green: "#69F0AE", greenGlow: "rgba(105,240,174,0.2)", blue: "#448AFF",
    white: "#ECF0F6", gray: "#7B8FA8", grayDim: "#4A5E78", grayDark: "#263040",
    headFont: "'Rajdhani',sans-serif", bodyFont: "'Exo 2',sans-serif",
    monoFont: "'Share Tech Mono',monospace",
    hazard: false, mTheme: false,
    fontUrl: "https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Exo+2:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap",
    gradient: "radial-gradient(ellipse at 30% 10%,#0a1830 0%,#0C1220 40%,#060810 100%)",
  },
  midnight: {
    id: "midnight", label: "Midnight", desc: "Clean & minimal",
    bg: "#06060A", bgAlt: "#0A0A12", card: "#0E0E18", cardBorder: "#1A1A2A",
    accent: "#A78BFA", accentHot: "#C4B5FD", accentGlow: "rgba(167,139,250,0.15)",
    red: "#F87171", green: "#4ADE80", greenGlow: "rgba(74,222,128,0.15)", blue: "#60A5FA",
    white: "#E8E4F0", gray: "#706B80", grayDim: "#44405A", grayDark: "#252030",
    headFont: "'Syne',sans-serif", bodyFont: "'Nunito Sans',sans-serif",
    monoFont: "'JetBrains Mono',monospace",
    hazard: false, mTheme: false,
    fontUrl: "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Nunito+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
    gradient: "radial-gradient(ellipse at 50% 20%,#12101E 0%,#06060A 50%,#030308 100%)",
  },
  bmwM: {
    id: "bmwM", label: "M Power", desc: "BMW Motorsport heritage",
    bg: "#0A0A0E", bgAlt: "#0F0F15", card: "#131318", cardBorder: "#1E1E28",
    accent: "#0066B1", accentHot: "#1A8FE3", accentGlow: "rgba(0,102,177,0.2)",
    red: "#E22B2B", green: "#2ECC40", greenGlow: "rgba(46,204,64,0.15)", blue: "#0066B1",
    mRed: "#E22B2B", mBlue: "#0066B1", mPurple: "#6F2DA8",
    white: "#F0F0F5", gray: "#7A7A8E", grayDim: "#4A4A5E", grayDark: "#28283A",
    headFont: "'Bebas Neue',Impact,sans-serif", bodyFont: "'IBM Plex Sans',sans-serif",
    monoFont: "'IBM Plex Mono',monospace",
    hazard: false, mTheme: true,
    fontUrl: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap",
    gradient: "radial-gradient(ellipse at 35% 10%,#0d0d1a 0%,#0A0A0E 45%,#050508 100%)",
  },
};

const ThemeCtx = createContext(THEMES.mostWanted);
const useTheme = () => useContext(ThemeCtx);

const CAR_DB = {
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

function lookupSpecs(make, model) {
  const key = (make + " " + model).toLowerCase().trim();
  for (const [k, v] of Object.entries(CAR_DB)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  return null;
}

const USER = { name: "Alex Mercer", handle: "@alexdrives", loc: "Essex, UK", rep: 2840 };

const initGarage = [
  { id: 1, make: "Porsche", model: "911 GT3 RS", year: 2024, emoji: "🏎️", col: "#C0392B", specs: CAR_DB["porsche 911 gt3 rs"], mods: ["Akrapovic Titanium Exhaust", "KW Clubsport Coilovers", "Recaro Podium Seats"], gallery: ["🖼️ Canyon sunset", "🖼️ Track day", "🖼️ Engine bay"] },
  { id: 2, make: "BMW", model: "M3 Competition", year: 2023, emoji: "🚗", col: "#0066B1", specs: CAR_DB["bmw m3 competition"], mods: ["Eventuri Carbon Intake", "Bootmod3 Stage 2"], gallery: ["🖼️ Rolling shot"] },
  { id: 3, make: "Toyota", model: "GR Supra", year: 2024, emoji: "🚙", col: "#F39C12", specs: CAR_DB["toyota gr supra"], mods: ["HKS Exhaust", "Volk TE37", "BC Racing Coilovers"], gallery: ["🖼️ JDM meet", "🖼️ Garage night"] },
  { id: 4, make: "Ford", model: "Mustang Dark Horse", year: 2024, emoji: "🐎", col: "#1A1A2E", specs: CAR_DB["ford mustang dark horse"], mods: [], gallery: [] },
];

const initFriends = [
  { id: 1, name: "Jake R.", avi: "J", car: "Nissan GT-R", status: "online", x: 38, y: 52, lastMsg: "Exhaust install is done!", unread: 2 },
  { id: 2, name: "Mia T.", avi: "M", car: "Mazda RX-7", status: "online", x: 55, y: 35, lastMsg: "That B-road was insane", unread: 0 },
  { id: 3, name: "Carlos D.", avi: "C", car: "Civic Type R", status: "driving", x: 42, y: 48, lastMsg: "See you at Brands Hatch", unread: 1 },
  { id: 4, name: "Sophie L.", avi: "S", car: "Audi RS6", status: "offline", x: 60, y: 60, lastMsg: "Wales trip was amazing", unread: 0 },
  { id: 5, name: "Dan P.", avi: "D", car: "Subaru WRX STI", status: "online", x: 30, y: 65, lastMsg: "", unread: 0 },
];

const initChats = {
  1: [
    { from: "Jake R.", text: "Just got the titanium exhaust fitted 🔥", time: "2:30 PM" },
    { from: "You", text: "How's it sound?", time: "2:32 PM" },
    { from: "Jake R.", text: "Exhaust install is done!", time: "2:45 PM" },
  ],
  3: [
    { from: "Carlos D.", text: "Track day tomorrow — you in?", time: "11:00 AM" },
    { from: "You", text: "100%. What time?", time: "11:05 AM" },
    { from: "Carlos D.", text: "See you at Brands Hatch", time: "11:08 AM" },
  ],
};

const FORUM_CATS = [
  { id: "tech", icon: "🔧", label: "Tech Help", desc: "Engine, electrical, diagnostics", threads: 234 },
  { id: "mods", icon: "⚙️", label: "Modifications", desc: "Builds, upgrades, installs", threads: 189 },
  { id: "spots", icon: "📸", label: "Photo Spots", desc: "Best roads & scenic routes", threads: 156 },
  { id: "meets", icon: "🤝", label: "Meets & Events", desc: "Organise local meetups", threads: 98 },
  { id: "buy", icon: "💰", label: "Buy & Sell", desc: "Parts, accessories, wheels", threads: 312 },
];

const FORUM_THREADS = {
  tech: [{ id: 1, title: "CEL after intake — P0171 lean", user: "Mike W.", replies: 14, views: 203, hot: true, solved: false }, { id: 2, title: "Best OBD2 for BMW F-series?", user: "Anna K.", replies: 22, views: 445, hot: false, solved: true }],
  mods: [{ id: 4, title: "Build log: Supra 45→550whp", user: "Carlos D.", replies: 47, views: 1820, hot: true, solved: false }, { id: 5, title: "Coilovers under £1500?", user: "Sophie L.", replies: 31, views: 890, hot: false, solved: true }],
  spots: [{ id: 7, title: "Top 5 B-roads Peak District", user: "Mia T.", replies: 26, views: 1200, hot: true, solved: false }],
  meets: [{ id: 9, title: "Essex JDM meet — 1st Sat monthly", user: "Jake R.", replies: 38, views: 920, hot: true, solved: false }],
  buy: [{ id: 10, title: "FS: Enkei RPF1 18x9.5 +38", user: "Dan P.", replies: 5, views: 210, hot: false, solved: false }],
};

const initPosts = [
  { id: 1, user: "Jake R.", avi: "J", car: "Nissan GT-R", time: "25m ago", text: "Just finished a full titanium exhaust install on the GT-R. The sound is absolutely mental 🔊", img: true, gallery: null, galleryCarName: null, likes: 42, liked: false, comments: [{ user: "Carlos D.", avi: "C", text: "That must scream!", time: "18m ago" }, { user: "Mia T.", avi: "M", text: "RIP your neighbours", time: "12m ago" }], showComments: false },
  { id: 2, user: "Mia T.", avi: "M", car: "Mazda RX-7 FD", time: "2h ago", text: "Golden hour + mountain road + rotary noises = perfection. This is why we drive.", img: true, gallery: null, galleryCarName: null, likes: 87, liked: true, comments: [{ user: "Jake R.", avi: "J", text: "Where is this spot??", time: "1h ago" }], showComments: false },
  { id: 3, user: "Carlos D.", avi: "C", car: "Civic Type R", time: "5h ago", text: "Track day prep done. Brands Hatch tomorrow — who's coming? 🏁", img: false, gallery: null, galleryCarName: null, likes: 31, liked: false, comments: [], showComments: false },
];

/* ═══ SHARED ═══ */
function MStripeBar({ h }) {
  return (<div style={{ height: h || 3, width: "100%", display: "flex" }}><div style={{ flex: 1, background: "#0066B1" }} /><div style={{ flex: 1, background: "#6F2DA8" }} /><div style={{ flex: 1, background: "#E22B2B" }} /></div>);
}

function HazardBar() {
  const T = useTheme();
  if (T.mTheme) return (<MStripeBar />);
  if (!T.hazard) return (<div style={{ height: 1, background: "linear-gradient(90deg,transparent," + T.accent + "30,transparent)" }} />);
  return (<div style={{ height: 3, width: "100%", background: "repeating-linear-gradient(90deg," + T.accent + " 0px," + T.accent + " 12px," + T.bg + " 12px," + T.bg + " 24px)", opacity: 0.7 }} />);
}

function SH({ children, sub }) {
  const T = useTheme();
  return (<div style={{ marginBottom: 14 }}><h2 style={{ fontFamily: T.headFont, fontSize: 28, fontWeight: 700, color: T.accent, margin: 0, letterSpacing: 2, textTransform: "uppercase", lineHeight: 1 }}>{children}</h2>{sub && <p style={{ fontFamily: T.bodyFont, fontSize: 12, color: T.grayDim, margin: "4px 0 0" }}>{sub}</p>}</div>);
}

function Btn({ children, primary, onClick, style: s, full }) {
  const T = useTheme();
  return (<button onClick={onClick} style={{ background: primary ? T.accent : "transparent", border: primary ? "none" : "1px solid " + T.accent + "40", borderRadius: 8, padding: "10px 18px", cursor: "pointer", color: primary ? T.bg : T.accent, fontFamily: T.headFont, fontSize: 13, fontWeight: 600, letterSpacing: 1, width: full ? "100%" : "auto", textTransform: "uppercase", boxShadow: primary ? "0 4px 16px " + T.accentGlow : "none", ...s }}>{children}</button>);
}

function Avi({ letter, size, status }) {
  const T = useTheme();
  const sz = size || 36;
  const sc = status === "driving" ? T.green : status === "online" ? T.blue : T.grayDim;
  return (
    <div style={{ width: sz, height: sz, borderRadius: 10, background: T.bgAlt, display: "flex", alignItems: "center", justifyContent: "center", fontSize: sz * 0.4, fontFamily: T.headFont, color: T.accent, border: "1px solid " + T.grayDark, fontWeight: 700, position: "relative" }}>
      {letter}
      {status && <div style={{ position: "absolute", bottom: -1, right: -1, width: sz * 0.25, height: sz * 0.25, borderRadius: "50%", background: sc, border: "2px solid " + T.card }} />}
    </div>
  );
}

/* ═══ TAB BAR ═══ */
function TabBar({ active, set, landscape }) {
  const T = useTheme();
  const tabs = [
    { id: "feed", icon: "📡", label: "FEED" },
    { id: "forum", icon: "💬", label: "FORUM" },
    { id: "friends", icon: "👥", label: "FRIENDS" },
    { id: "map", icon: "🗺️", label: "MAP" },
    { id: "me", icon: "👤", label: "ME" },
  ];
  return (
    <div style={{ flexShrink: 0 }}>
      <HazardBar />
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: landscape ? "4px 4px 10px" : "6px 4px 22px", background: T.card }}>
        {tabs.map(t => {
          const on = active === t.id;
          return (
            <button key={t.id} onClick={() => set(t.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, transition: "all 0.25s", transform: on ? "scale(1.1)" : "scale(1)", filter: on ? "none" : "grayscale(0.8) brightness(0.6)" }}>
              <span style={{ fontSize: landscape ? 16 : 19 }}>{t.icon}</span>
              <span style={{ fontFamily: T.headFont, fontSize: 10, fontWeight: 600, color: on ? T.accent : T.grayDim, letterSpacing: 1.5 }}>{t.label}</span>
              {on && <div style={{ width: 16, height: 2, background: T.accent, borderRadius: 1 }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══ FEED TAB ═══ */
function FeedTab({ feedPosts, setFeedPosts }) {
  const T = useTheme();
  const [newPost, setNewPost] = useState("");
  const [composing, setComposing] = useState(false);
  const [commentText, setCommentText] = useState({});

  const toggleLike = (id) => setFeedPosts(ps => ps.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
  const toggleComments = (id) => setFeedPosts(ps => ps.map(p => p.id === id ? { ...p, showComments: !p.showComments } : p));
  const addComment = (id) => { const txt = commentText[id]; if (!txt || !txt.trim()) return; setFeedPosts(ps => ps.map(p => p.id === id ? { ...p, comments: [...p.comments, { user: USER.name, avi: "A", text: txt.trim(), time: "Just now" }] } : p)); setCommentText(prev => ({ ...prev, [id]: "" })); };
  const submitPost = () => { if (!newPost.trim()) return; setFeedPosts([{ id: Date.now(), user: USER.name, avi: "A", car: "911 GT3 RS", time: "Just now", text: newPost.trim(), img: false, gallery: null, galleryCarName: null, likes: 0, liked: false, comments: [], showComments: false }, ...feedPosts]); setNewPost(""); setComposing(false); };

  return (
    <div style={{ padding: "14px 16px", overflowY: "auto", flex: 1 }}>
      <SH sub="What's happening on the streets">COMMUNITY FEED</SH>
      {!composing ? (
        <button onClick={() => setComposing(true)} style={{ width: "100%", padding: "14px", background: T.card, border: "1px dashed " + T.grayDark, borderRadius: 14, color: T.grayDim, fontFamily: T.bodyFont, fontSize: 13, textAlign: "left", cursor: "pointer", marginBottom: 16 }}>Share something with the crew...</button>
      ) : (
        <div style={{ background: T.card, borderRadius: 14, padding: 16, marginBottom: 16, border: "1px solid " + T.accent + "40" }}>
          <textarea value={newPost} onChange={e => setNewPost(e.target.value)} placeholder="What's on your mind?" style={{ width: "100%", minHeight: 70, background: "transparent", border: "none", color: T.white, fontFamily: T.bodyFont, fontSize: 14, resize: "none", outline: "none", lineHeight: 1.5, boxSizing: "border-box" }} />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 10 }}>
            <button onClick={() => setComposing(false)} style={{ background: "none", border: "none", color: T.grayDim, fontSize: 12, cursor: "pointer" }}>Cancel</button>
            <Btn primary onClick={submitPost}>POST</Btn>
          </div>
        </div>
      )}
      {feedPosts.map(p => (
        <div key={p.id} style={{ background: T.card, borderRadius: 16, padding: 16, marginBottom: 12, border: "1px solid " + T.cardBorder, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent," + T.accent + "30,transparent)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <Avi letter={p.avi} />
            <div style={{ flex: 1 }}><div style={{ fontFamily: T.bodyFont, fontSize: 14, fontWeight: 600, color: T.white }}>{p.user}</div><div style={{ fontFamily: T.monoFont, fontSize: 11, color: T.grayDim }}>{p.car} · {p.time}</div></div>
          </div>
          <p style={{ fontFamily: T.bodyFont, fontSize: 14, color: T.white, lineHeight: 1.55, margin: "0 0 12px", whiteSpace: "pre-wrap" }}>{p.text}</p>
          {p.gallery && (<div style={{ marginBottom: 12 }}><div style={{ fontFamily: T.headFont, fontSize: 12, color: T.accent, letterSpacing: 1, marginBottom: 6 }}>📸 GALLERY — {p.galleryCarName}</div><div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>{p.gallery.map((g, i) => (<div key={i} style={{ minWidth: 100, height: 70, borderRadius: 10, background: "linear-gradient(135deg," + T.bgAlt + "," + T.card + ")", border: "1px solid " + T.grayDark, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: T.grayDim, fontFamily: T.monoFont, padding: 6, textAlign: "center", flexShrink: 0 }}>{g}</div>))}</div></div>)}
          {p.img && !p.gallery && (<div style={{ height: 130, borderRadius: 12, marginBottom: 12, background: "linear-gradient(135deg," + T.bgAlt + "," + T.card + ")", border: "1px solid " + T.grayDark, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, opacity: 0.4 }}>📸</div>)}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <button onClick={() => toggleLike(p.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, color: p.liked ? T.red : T.grayDim, fontFamily: T.bodyFont, fontSize: 13 }}>{p.liked ? "❤️" : "🤍"} {p.likes}</button>
            <button onClick={() => toggleComments(p.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, color: T.grayDim, fontFamily: T.bodyFont, fontSize: 13 }}>💬 {p.comments.length}</button>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: T.grayDim, fontFamily: T.bodyFont, fontSize: 13, marginLeft: "auto" }}>↗ Share</button>
          </div>
          {p.showComments && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid " + T.grayDark }}>
              {p.comments.map((c, ci) => (<div key={ci} style={{ display: "flex", gap: 8, marginBottom: 10 }}><Avi letter={c.avi} size={24} /><div><span style={{ fontFamily: T.bodyFont, fontSize: 12, color: T.white, fontWeight: 600 }}>{c.user}</span><span style={{ color: T.grayDim, marginLeft: 6, fontSize: 10 }}>{c.time}</span><div style={{ fontFamily: T.bodyFont, fontSize: 12, color: T.gray, marginTop: 2 }}>{c.text}</div></div></div>))}
              <div style={{ display: "flex", gap: 8 }}>
                <input value={commentText[p.id] || ""} onChange={e => setCommentText(prev => ({ ...prev, [p.id]: e.target.value }))} onKeyDown={e => { if (e.key === "Enter") addComment(p.id); }} placeholder="Write a comment..." style={{ flex: 1, background: T.bgAlt, border: "1px solid " + T.grayDark, borderRadius: 8, padding: "8px 12px", color: T.white, fontFamily: T.bodyFont, fontSize: 12, outline: "none" }} />
                <Btn primary onClick={() => addComment(p.id)} style={{ padding: "0 14px" }}>▶</Btn>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ═══ FORUM TAB ═══ */
function ForumTab() {
  const T = useTheme();
  const [activeCat, setActiveCat] = useState(null);
  if (!activeCat) {
    return (
      <div style={{ padding: "14px 16px", overflowY: "auto", flex: 1 }}>
        <SH sub="Get help. Share knowledge. Find roads.">THE FORUM</SH>
        {FORUM_CATS.map(cat => (
          <button key={cat.id} onClick={() => setActiveCat(cat.id)} style={{ width: "100%", background: T.card, border: "1px solid " + T.cardBorder, borderRadius: 14, padding: "14px 16px", marginBottom: 8, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", textAlign: "left" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: T.bgAlt, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, border: "1px solid " + T.grayDark }}>{cat.icon}</div>
            <div style={{ flex: 1 }}><div style={{ fontFamily: T.headFont, fontSize: 17, color: T.accent, letterSpacing: 1, textTransform: "uppercase" }}>{cat.label}</div><div style={{ fontFamily: T.bodyFont, fontSize: 11, color: T.grayDim, marginTop: 2 }}>{cat.desc}</div></div>
            <div style={{ textAlign: "right" }}><div style={{ fontFamily: T.headFont, fontSize: 20, color: T.white }}>{cat.threads}</div><div style={{ fontFamily: T.monoFont, fontSize: 9, color: T.grayDim }}>threads</div></div>
          </button>
        ))}
      </div>
    );
  }
  const cat = FORUM_CATS.find(c => c.id === activeCat);
  const threads = FORUM_THREADS[activeCat] || [];
  return (
    <div style={{ padding: "14px 16px", overflowY: "auto", flex: 1 }}>
      <button onClick={() => setActiveCat(null)} style={{ background: "none", border: "none", color: T.accent, fontFamily: T.headFont, fontSize: 14, cursor: "pointer", marginBottom: 8 }}>← BACK</button>
      <SH sub={cat.desc}>{cat.icon} {cat.label}</SH>
      <button style={{ width: "100%", padding: 12, background: "transparent", border: "1px dashed " + T.accent + "50", borderRadius: 12, marginBottom: 14, color: T.accent, fontFamily: T.headFont, fontSize: 15, letterSpacing: 1, cursor: "pointer", textTransform: "uppercase" }}>+ NEW THREAD</button>
      {threads.map(t => (
        <div key={t.id} style={{ background: T.card, borderRadius: 14, padding: 14, marginBottom: 8, border: "1px solid " + T.cardBorder, borderLeft: t.hot ? "3px solid " + T.accent : "3px solid transparent", cursor: "pointer" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
            {t.hot && <span style={{ fontFamily: T.headFont, fontSize: 10, color: T.bg, background: T.accent, padding: "2px 6px", borderRadius: 4 }}>🔥 HOT</span>}
            {t.solved && <span style={{ fontFamily: T.headFont, fontSize: 10, color: T.bg, background: T.green, padding: "2px 6px", borderRadius: 4 }}>✓ SOLVED</span>}
          </div>
          <div style={{ fontFamily: T.bodyFont, fontSize: 13, fontWeight: 600, color: T.white }}>{t.title}</div>
          <div style={{ fontFamily: T.monoFont, fontSize: 11, color: T.grayDim, marginTop: 4 }}>by {t.user} · {t.replies} replies · {t.views} views</div>
        </div>
      ))}
    </div>
  );
}

/* ═══ FRIENDS TAB — list, add, messaging ═══ */
function FriendsTab({ friends, setFriends, chats, setChats }) {
  const T = useTheme();
  const [view, setView] = useState("list");
  const [chatWith, setChatWith] = useState(null);
  const [msgInput, setMsgInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const openChat = (f) => { setChatWith(f); setView("chat"); setFriends(prev => prev.map(fr => fr.id === f.id ? { ...fr, unread: 0 } : fr)); };
  const sendMsg = () => {
    if (!msgInput.trim() || !chatWith) return;
    const newMsg = { from: "You", text: msgInput.trim(), time: "Now" };
    setChats(prev => ({ ...prev, [chatWith.id]: [...(prev[chatWith.id] || []), newMsg] }));
    setFriends(prev => prev.map(f => f.id === chatWith.id ? { ...f, lastMsg: msgInput.trim() } : f));
    setMsgInput("");
  };
  const addFriend = () => {
    if (!searchInput.trim()) return;
    const nf = { id: Date.now(), name: searchInput.trim(), avi: searchInput.trim()[0].toUpperCase(), car: "Unknown", status: "offline", x: 50, y: 50, lastMsg: "", unread: 0 };
    setFriends(prev => [...prev, nf]);
    setSearchInput("");
    setShowAdd(false);
  };

  if (view === "chat" && chatWith) {
    const msgs = chats[chatWith.id] || [];
    return (
      <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <button onClick={() => setView("list")} style={{ background: "none", border: "none", color: T.accent, fontFamily: T.headFont, fontSize: 14, cursor: "pointer" }}>←</button>
          <Avi letter={chatWith.avi} size={34} status={chatWith.status} />
          <div style={{ flex: 1 }}><div style={{ fontFamily: T.bodyFont, fontSize: 15, fontWeight: 600, color: T.white }}>{chatWith.name}</div><div style={{ fontFamily: T.monoFont, fontSize: 11, color: chatWith.status === "online" ? T.green : chatWith.status === "driving" ? T.green : T.grayDim }}>{chatWith.status} · {chatWith.car}</div></div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", marginBottom: 12 }}>
          {msgs.length === 0 && <div style={{ textAlign: "center", color: T.grayDim, fontFamily: T.bodyFont, fontSize: 13, marginTop: 40 }}>No messages yet. Say hello!</div>}
          {msgs.map((m, i) => {
            const isMe = m.from === "You";
            return (
              <div key={i} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start", marginBottom: 8 }}>
                <div style={{ maxWidth: "75%", padding: "10px 14px", borderRadius: isMe ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: isMe ? T.accent : T.card, border: isMe ? "none" : "1px solid " + T.cardBorder }}>
                  <div style={{ fontFamily: T.bodyFont, fontSize: 13, color: isMe ? T.bg : T.white, lineHeight: 1.4 }}>{m.text}</div>
                  <div style={{ fontFamily: T.monoFont, fontSize: 9, color: isMe ? T.bg + "99" : T.grayDim, marginTop: 4, textAlign: "right" }}>{m.time}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <input value={msgInput} onChange={e => setMsgInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") sendMsg(); }} placeholder={"Message " + chatWith.name + "..."} style={{ flex: 1, background: T.card, border: "1px solid " + T.cardBorder, borderRadius: 12, padding: "12px 14px", color: T.white, fontFamily: T.bodyFont, fontSize: 13, outline: "none" }} />
          <Btn primary onClick={sendMsg} style={{ padding: "0 16px", borderRadius: 12 }}>▶</Btn>
        </div>
      </div>
    );
  }

  const online = friends.filter(f => f.status !== "offline");
  const offline = friends.filter(f => f.status === "offline");
  const totalUnread = friends.reduce((a, f) => a + f.unread, 0);

  return (
    <div style={{ padding: "14px 16px", overflowY: "auto", flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <SH sub={friends.length + " friends · " + online.length + " online"}>FRIENDS{totalUnread > 0 ? " (" + totalUnread + ")" : ""}</SH>
        <button onClick={() => setShowAdd(!showAdd)} style={{ background: T.accent, border: "none", borderRadius: 10, width: 40, height: 40, color: T.bg, fontSize: 22, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
      </div>

      {showAdd && (
        <div style={{ background: T.card, borderRadius: 14, padding: 16, marginBottom: 14, border: "1px solid " + T.accent + "40" }}>
          <div style={{ fontFamily: T.headFont, fontSize: 14, color: T.accent, letterSpacing: 1, marginBottom: 8 }}>ADD FRIEND</div>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={searchInput} onChange={e => setSearchInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") addFriend(); }} placeholder="Enter username..." style={{ flex: 1, background: T.bgAlt, border: "1px solid " + T.grayDark, borderRadius: 8, padding: "10px 12px", color: T.white, fontFamily: T.bodyFont, fontSize: 13, outline: "none" }} />
            <Btn primary onClick={addFriend}>ADD</Btn>
          </div>
        </div>
      )}

      {online.length > 0 && <div style={{ fontFamily: T.headFont, fontSize: 12, color: T.green, letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" }}>● ONLINE ({online.length})</div>}
      {online.map(f => (
        <div key={f.id} onClick={() => openChat(f)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: T.card, borderRadius: 14, marginBottom: 6, border: "1px solid " + T.cardBorder, cursor: "pointer" }}>
          <Avi letter={f.avi} size={42} status={f.status} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T.bodyFont, fontSize: 14, fontWeight: 600, color: T.white }}>{f.name}</div>
            <div style={{ fontFamily: T.monoFont, fontSize: 11, color: T.grayDim }}>{f.car}</div>
            {f.lastMsg && <div style={{ fontFamily: T.bodyFont, fontSize: 11, color: T.gray, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 180 }}>{f.lastMsg}</div>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
            <span style={{ fontFamily: T.headFont, fontSize: 11, color: f.status === "driving" ? T.green : T.blue, textTransform: "uppercase", letterSpacing: 1 }}>{f.status}</span>
            {f.unread > 0 && <div style={{ background: T.red, color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, fontFamily: T.bodyFont }}>{f.unread}</div>}
          </div>
        </div>
      ))}

      {offline.length > 0 && <div style={{ fontFamily: T.headFont, fontSize: 12, color: T.grayDim, letterSpacing: 2, marginTop: 14, marginBottom: 8, textTransform: "uppercase" }}>OFFLINE ({offline.length})</div>}
      {offline.map(f => (
        <div key={f.id} onClick={() => openChat(f)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: T.card, borderRadius: 14, marginBottom: 6, border: "1px solid " + T.cardBorder, cursor: "pointer", opacity: 0.6 }}>
          <Avi letter={f.avi} size={42} status={f.status} />
          <div style={{ flex: 1 }}><div style={{ fontFamily: T.bodyFont, fontSize: 14, fontWeight: 600, color: T.white }}>{f.name}</div><div style={{ fontFamily: T.monoFont, fontSize: 11, color: T.grayDim }}>{f.car}</div>{f.lastMsg && <div style={{ fontFamily: T.bodyFont, fontSize: 11, color: T.gray, marginTop: 2 }}>{f.lastMsg}</div>}</div>
        </div>
      ))}
    </div>
  );
}

/* ═══ MAP TAB — with invite friends ═══ */
function MapTab({ fullMap, onFullscreen, landscape, friends }) {
  const T = useTheme();
  const canvasRef = useRef(null);
  const [showInvite, setShowInvite] = useState(false);
  const [invited, setInvited] = useState([]);

  const toggleInvite = (id) => setInvited(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const isFs = fullMap;
    const W = cv.width = isFs ? (landscape ? 820 : 370) : 370;
    const H = cv.height = isFs ? (landscape ? 380 : 600) : 320;
    const scX = W / 370, scY = H / 340;
    const roads = [[[50, 170], [150, 150], [200, 190], [300, 180]], [[100, 40], [120, 140], [140, 240], [130, 340]], [[30, 90], [100, 110], [200, 90], [320, 120]], [[180, 20], [200, 120], [220, 240], [250, 340]]];
    let animId;
    const draw = (t) => {
      ctx.fillStyle = "#0D1117"; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "#151D28"; ctx.lineWidth = 0.4;
      for (let i = 0; i < W; i += 20) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke(); }
      for (let i = 0; i < H; i += 20) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(W, i); ctx.stroke(); }
      ctx.strokeStyle = "#1E2D40"; ctx.lineWidth = 3; ctx.setLineDash([]);
      roads.forEach(r => { ctx.beginPath(); ctx.moveTo(r[0][0] * scX, r[0][1] * scY); for (let i = 1; i < r.length; i++) { const cx1 = (r[i - 1][0] + r[i][0]) / 2 * scX; ctx.bezierCurveTo(cx1, r[i - 1][1] * scY, cx1, r[i][1] * scY, r[i][0] * scX, r[i][1] * scY); } ctx.stroke(); });
      ctx.strokeStyle = T.accent + "40"; ctx.lineWidth = 4; ctx.setLineDash([10, 8]);
      ctx.beginPath(); ctx.moveTo(120 * scX, 140 * scY); ctx.bezierCurveTo(160 * scX, 130 * scY, 180 * scX, 160 * scY, 200 * scX, 190 * scY); ctx.stroke(); ctx.setLineDash([]);
      friends.forEach(f => { if (f.status === "offline") return; const x = (f.x / 100) * W, y = (f.y / 100) * H; const pulse = Math.sin(t / 600 + f.id) * 4 + 12; ctx.beginPath(); ctx.arc(x, y, pulse, 0, Math.PI * 2); ctx.fillStyle = f.status === "driving" ? T.greenGlow : (T.blue + "30"); ctx.fill(); ctx.beginPath(); ctx.arc(x, y, isFs ? 7 : 5, 0, Math.PI * 2); ctx.fillStyle = f.status === "driving" ? T.green : T.blue; ctx.fill(); ctx.strokeStyle = T.bg; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = T.white; ctx.font = "bold " + (isFs ? 12 : 9) + "px sans-serif"; ctx.textAlign = "center"; ctx.fillText(f.name.split(" ")[0], x, y - (isFs ? 18 : 12)); });
      const ux = 0.45 * W, uy = 0.45 * H; const up = Math.sin(t / 400) * 6 + (isFs ? 20 : 16);
      ctx.beginPath(); ctx.arc(ux, uy, up, 0, Math.PI * 2); ctx.fillStyle = T.accentGlow; ctx.fill();
      ctx.beginPath(); ctx.arc(ux, uy, isFs ? 10 : 7, 0, Math.PI * 2); ctx.fillStyle = T.accent; ctx.fill(); ctx.strokeStyle = "#fff"; ctx.lineWidth = 2.5; ctx.stroke();
      ctx.fillStyle = T.accent; ctx.font = "bold " + (isFs ? 14 : 10) + "px sans-serif"; ctx.textAlign = "center"; ctx.fillText("YOU", ux, uy - (isFs ? 20 : 14));
      if (isFs) { ctx.fillStyle = T.bg + "BB"; ctx.fillRect(W - 160, H - 70, 150, 60); ctx.strokeStyle = T.accent; ctx.lineWidth = 1; ctx.strokeRect(W - 160, H - 70, 150, 60); ctx.fillStyle = T.white; ctx.font = "bold 28px sans-serif"; ctx.textAlign = "right"; ctx.fillText("47", W - 50, H - 32); ctx.fillStyle = T.grayDim; ctx.font = "12px sans-serif"; ctx.fillText("MPH", W - 50, H - 18); }
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [T, landscape, fullMap, friends]);

  if (fullMap) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", background: "#0D1117" }}>
        <canvas ref={canvasRef} style={{ width: "100%", flex: 1, display: "block" }} />
        <div style={{ position: "absolute", top: 8, left: 8, display: "flex", gap: 6 }}>
          <button onClick={onFullscreen} style={{ background: T.bg + "CC", border: "1px solid " + T.grayDark, borderRadius: 10, padding: "8px 14px", color: T.white, fontFamily: T.headFont, fontSize: 12, letterSpacing: 1, cursor: "pointer" }}>✕ EXIT</button>
          <div style={{ background: T.bg + "CC", border: "1px solid " + T.green + "40", borderRadius: 10, padding: "8px 14px", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontFamily: T.headFont, fontSize: 10, color: T.bg, background: T.green, padding: "2px 6px", borderRadius: 4 }}>LIVE</span>
            <span style={{ fontFamily: T.bodyFont, fontSize: 12, color: T.green }}>Sunset Canyon · 3</span>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", background: T.bg + "CC", borderRadius: 10, padding: "6px 16px", border: "1px solid " + T.grayDark }}>
          <span style={{ fontFamily: T.monoFont, fontSize: 11, color: T.grayDim }}>📱 {landscape ? "Landscape active" : "Rotate for mount view"}</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "14px 16px", overflowY: "auto", flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <SH sub={friends.filter(f => f.status !== "offline").length + " friends nearby"}>LIVE MAP</SH>
        <button onClick={onFullscreen} style={{ background: T.card, border: "1px solid " + T.grayDark, borderRadius: 10, color: T.white, fontFamily: T.headFont, fontSize: 12, padding: "8px 12px", letterSpacing: 1, cursor: "pointer" }}>⛶ FULL</button>
      </div>
      <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid " + T.grayDark, marginBottom: 14, position: "relative" }}>
        <canvas ref={canvasRef} style={{ width: "100%", height: 320, display: "block" }} />
        <div style={{ position: "absolute", top: 8, right: 8, background: T.bg + "CC", borderRadius: 8, padding: "5px 9px", border: "1px solid " + T.grayDark }}>
          {[["You", T.accent], ["Online", T.blue], ["Driving", T.green]].map(([l, c]) => (
            <div key={l} style={{ fontSize: 10, color: T.gray, marginTop: l === "You" ? 0 : 2, fontFamily: T.monoFont }}>
              <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: c, marginRight: 5, verticalAlign: "middle" }} />{l}
            </div>
          ))}
        </div>
      </div>

      {/* Invite friends to drive */}
      <button onClick={() => setShowInvite(!showInvite)} style={{ width: "100%", padding: "12px", background: showInvite ? T.accent + "15" : T.card, border: "1px solid " + (showInvite ? T.accent + "50" : T.cardBorder), borderRadius: 14, marginBottom: 12, color: T.accent, fontFamily: T.headFont, fontSize: 15, letterSpacing: 1, cursor: "pointer", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        👥 INVITE FRIENDS TO DRIVE {invited.length > 0 ? "(" + invited.length + ")" : ""}
      </button>

      {showInvite && (
        <div style={{ background: T.card, borderRadius: 14, padding: 14, marginBottom: 12, border: "1px solid " + T.accent + "30" }}>
          {friends.map(f => {
            const isInvited = invited.includes(f.id);
            return (
              <div key={f.id} onClick={() => toggleInvite(f.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, marginBottom: 4, cursor: "pointer", background: isInvited ? T.accent + "15" : "transparent", border: isInvited ? "1px solid " + T.accent + "40" : "1px solid transparent" }}>
                <Avi letter={f.avi} size={32} status={f.status} />
                <div style={{ flex: 1 }}><div style={{ fontFamily: T.bodyFont, fontSize: 13, color: T.white, fontWeight: 600 }}>{f.name}</div><div style={{ fontFamily: T.monoFont, fontSize: 10, color: T.grayDim }}>{f.car}</div></div>
                <div style={{ width: 24, height: 24, borderRadius: 6, border: isInvited ? "none" : "2px solid " + T.grayDark, background: isInvited ? T.accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: T.bg, fontSize: 14, fontWeight: 700 }}>{isInvited ? "✓" : ""}</div>
              </div>
            );
          })}
          {invited.length > 0 && (
            <Btn full primary onClick={() => { setShowInvite(false); }} style={{ marginTop: 8 }}>SEND INVITE ({invited.length})</Btn>
          )}
        </div>
      )}

      {/* Live drive */}
      <div style={{ background: T.card, borderRadius: 12, padding: 12, marginBottom: 12, border: "1px solid " + T.green + "30", borderLeft: "3px solid " + T.green }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ fontFamily: T.headFont, fontSize: 10, color: T.bg, background: T.green, padding: "2px 6px", borderRadius: 4 }}>LIVE</span>
          <span style={{ fontFamily: T.bodyFont, fontSize: 12, color: T.green }}>Sunset Canyon Run · 3 drivers</span>
        </div>
        <Btn full primary onClick={() => {}} style={{ background: "linear-gradient(135deg," + T.green + ",#00C853)", color: T.bg, boxShadow: "0 4px 16px " + T.greenGlow }}>JOIN LIVE DRIVE →</Btn>
      </div>

      {friends.filter(f => f.status !== "offline").map(f => (
        <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: T.card, borderRadius: 10, marginBottom: 5, border: "1px solid " + T.cardBorder }}>
          <Avi letter={f.avi} size={34} status={f.status} />
          <div style={{ flex: 1 }}><div style={{ fontFamily: T.bodyFont, fontSize: 13, color: T.white, fontWeight: 600 }}>{f.name}</div><div style={{ fontFamily: T.monoFont, fontSize: 11, color: T.grayDim }}>{f.car}</div></div>
          <span style={{ fontFamily: T.headFont, fontSize: 11, letterSpacing: 1, color: f.status === "driving" ? T.green : T.blue, textTransform: "uppercase" }}>{f.status}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══ ME TAB — profile + garage + settings ═══ */
function MeTab({ themeId, setThemeId, garage, setGarage, onShareGallery }) {
  const T = useTheme();
  const [section, setSection] = useState("profile");
  const [garageSel, setGarageSel] = useState(null);
  const [garageView, setGarageView] = useState("list");
  const [addForm, setAddForm] = useState({ make: "", model: "", year: "" });
  const [foundSpecs, setFoundSpecs] = useState(null);
  const [newMod, setNewMod] = useState("");
  const [newPhoto, setNewPhoto] = useState("");

  const stats = [{ l: "Drives", v: "142" }, { l: "Miles", v: "8.4K" }, { l: "Cars", v: String(garage.length) }, { l: "Rep", v: "2.8K" }];
  const badges = ["🏆 Canyon King", "⚡ Speed Demon", "🌅 Sunset Chaser", "🔧 Gearhead", "🏁 Track Rat"];

  /* === SETTINGS === */
  if (section === "settings") {
    return (
      <div style={{ padding: "14px 16px", overflowY: "auto", flex: 1 }}>
        <button onClick={() => setSection("profile")} style={{ background: "none", border: "none", color: T.accent, fontFamily: T.headFont, fontSize: 14, cursor: "pointer", marginBottom: 8 }}>← BACK</button>
        <SH sub="Customise your experience">SETTINGS</SH>
        <div style={{ fontFamily: T.headFont, fontSize: 14, color: T.grayDim, letterSpacing: 2, marginBottom: 10 }}>THEME</div>
        {Object.values(THEMES).map(tm => (
          <button key={tm.id} onClick={() => setThemeId(tm.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: themeId === tm.id ? (tm.accent + "10") : T.card, border: themeId === tm.id ? "2px solid " + tm.accent : "1px solid " + T.cardBorder, borderRadius: 14, marginBottom: 8, cursor: "pointer", textAlign: "left" }}>
            <div style={{ display: "flex", gap: 3 }}>{(tm.mTheme ? [tm.mBlue, tm.mPurple, tm.mRed, tm.accent] : [tm.bg, tm.card, tm.accent, tm.accentHot]).map((c, i) => (<div key={i} style={{ width: 16, height: 16, borderRadius: 5, background: c, border: c === tm.bg ? "1px solid " + tm.grayDark : "none" }} />))}</div>
            <div style={{ flex: 1 }}><div style={{ fontFamily: T.headFont, fontSize: 17, color: themeId === tm.id ? tm.accent : T.white, letterSpacing: 1 }}>{tm.label}</div><div style={{ fontFamily: T.bodyFont, fontSize: 11, color: T.grayDim }}>{tm.desc}</div></div>
            {themeId === tm.id && <span style={{ color: T.green }}>✓</span>}
          </button>
        ))}
        <div style={{ fontFamily: T.headFont, fontSize: 14, color: T.grayDim, letterSpacing: 2, marginTop: 18, marginBottom: 10 }}>DISPLAY</div>
        {[{ label: "Auto-Rotate", value: "On" }, { label: "CarPlay / Android Auto", value: "Ready" }].map((s, i) => (<div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 14px", background: T.card, borderRadius: 10, marginBottom: 5, border: "1px solid " + T.cardBorder }}><span style={{ fontFamily: T.bodyFont, fontSize: 13, color: T.white }}>{s.label}</span><span style={{ fontFamily: T.monoFont, fontSize: 12, color: T.accent }}>{s.value}</span></div>))}
        <div style={{ fontFamily: T.headFont, fontSize: 14, color: T.grayDim, letterSpacing: 2, marginTop: 18, marginBottom: 10 }}>ACCOUNT</div>
        {["Edit Profile", "Blocked Users", "Data & Privacy", "Help & Support", "Log Out"].map((item, i) => (<div key={i} style={{ padding: "12px 14px", background: T.card, borderRadius: 10, marginBottom: 5, border: "1px solid " + T.cardBorder, fontFamily: T.bodyFont, fontSize: 13, color: item === "Log Out" ? T.red : T.white, cursor: "pointer" }}>{item}</div>))}
        <div style={{ height: 20 }} />
      </div>
    );
  }

  /* === GARAGE - ADD === */
  if (section === "garage" && garageView === "add") {
    return (
      <div style={{ padding: "14px 16px", overflowY: "auto", flex: 1 }}>
        <button onClick={() => setGarageView("list")} style={{ background: "none", border: "none", color: T.accent, fontFamily: T.headFont, fontSize: 14, cursor: "pointer", marginBottom: 8 }}>← BACK</button>
        <SH sub="Auto-pull stock specs">ADD NEW CAR</SH>
        {["make", "model", "year"].map(f => (<div key={f} style={{ marginBottom: 12 }}><label style={{ fontFamily: T.headFont, fontSize: 12, color: T.grayDim, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 4 }}>{f}</label><input value={addForm[f]} onChange={e => setAddForm(prev => ({ ...prev, [f]: e.target.value }))} placeholder={f === "make" ? "e.g. BMW" : f === "model" ? "e.g. M3 Competition" : "e.g. 2023"} style={{ width: "100%", background: T.card, border: "1px solid " + T.cardBorder, borderRadius: 10, padding: "12px 14px", color: T.white, fontFamily: T.bodyFont, fontSize: 14, outline: "none", boxSizing: "border-box" }} /></div>))}
        <Btn full primary onClick={() => setFoundSpecs(lookupSpecs(addForm.make, addForm.model))} style={{ marginBottom: 16 }}>🔍 LOOKUP SPECS</Btn>
        {foundSpecs && (<div style={{ background: T.card, borderRadius: 14, padding: 16, marginBottom: 16, border: "1px solid " + T.green + "30", borderLeft: "3px solid " + T.green }}><div style={{ fontFamily: T.headFont, fontSize: 16, color: T.green, marginBottom: 10 }}>✓ SPECS FOUND</div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>{Object.entries(foundSpecs).map(([k, v]) => (<div key={k} style={{ background: T.bgAlt, borderRadius: 8, padding: "8px 10px" }}><div style={{ fontFamily: T.monoFont, fontSize: 9, color: T.grayDim, textTransform: "uppercase", letterSpacing: 1.5 }}>{k === "z60" ? "0-60" : k === "hp" ? "POWER" : k}</div><div style={{ fontFamily: T.bodyFont, fontSize: 13, color: T.white, fontWeight: 600, marginTop: 2 }}>{k === "hp" ? v + " HP" : v}</div></div>))}</div></div>)}
        <Btn full primary onClick={() => { if (!addForm.make || !addForm.model) return; setGarage([...garage, { id: Date.now(), make: addForm.make, model: addForm.model, year: parseInt(addForm.year) || 2024, emoji: "🚗", col: "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, "0"), specs: foundSpecs, mods: [], gallery: [] }]); setAddForm({ make: "", model: "", year: "" }); setFoundSpecs(null); setGarageView("list"); }}>ADD TO GARAGE</Btn>
      </div>
    );
  }

  /* === GARAGE - DETAIL === */
  const selCar = garage.find(c => c.id === garageSel);
  if (section === "garage" && garageView === "detail" && selCar) {
    const c = selCar;
    return (
      <div style={{ padding: "14px 16px", overflowY: "auto", flex: 1 }}>
        <button onClick={() => setGarageView("list")} style={{ background: "none", border: "none", color: T.accent, fontFamily: T.headFont, fontSize: 14, cursor: "pointer", marginBottom: 8 }}>← BACK</button>
        <div style={{ textAlign: "center", marginBottom: 16 }}><div style={{ fontSize: 48, marginBottom: 6 }}>{c.emoji}</div><div style={{ fontFamily: T.headFont, fontSize: 26, color: T.white }}>{c.year} {c.make}</div><div style={{ fontFamily: T.bodyFont, fontSize: 16, color: T.accent }}>{c.model}</div></div>
        {c.specs && (<div style={{ marginBottom: 18 }}><div style={{ fontFamily: T.headFont, fontSize: 14, color: T.grayDim, letterSpacing: 2, marginBottom: 8 }}>STOCK SPECS</div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>{Object.entries(c.specs).map(([k, v]) => (<div key={k} style={{ background: T.card, borderRadius: 10, padding: 10, border: "1px solid " + T.cardBorder, textAlign: "center" }}><div style={{ fontFamily: T.monoFont, fontSize: 8, color: T.grayDim, textTransform: "uppercase", letterSpacing: 1.5 }}>{k === "z60" ? "0-60" : k === "hp" ? "POWER" : k}</div><div style={{ fontFamily: T.headFont, fontSize: 15, color: T.white, marginTop: 2 }}>{k === "hp" ? v + " HP" : v}</div></div>))}</div></div>)}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontFamily: T.headFont, fontSize: 14, color: T.grayDim, letterSpacing: 2, marginBottom: 8 }}>MODIFICATIONS ({c.mods.length})</div>
          {c.mods.map((m, i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", background: T.card, borderRadius: 10, marginBottom: 5, border: "1px solid " + T.cardBorder, borderLeft: "3px solid " + T.accent }}><span style={{ color: T.accent }}>⚙️</span><span style={{ flex: 1, fontFamily: T.bodyFont, fontSize: 13, color: T.white }}>{m}</span><button onClick={() => setGarage(g => g.map(x => x.id === c.id ? { ...x, mods: x.mods.filter((_, j) => j !== i) } : x))} style={{ background: "none", border: "none", color: T.grayDim, cursor: "pointer" }}>✕</button></div>))}
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}><input value={newMod} onChange={e => setNewMod(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && newMod.trim()) { setGarage(g => g.map(x => x.id === c.id ? { ...x, mods: [...x.mods, newMod.trim()] } : x)); setNewMod(""); } }} placeholder="Add modification..." style={{ flex: 1, background: T.card, border: "1px solid " + T.cardBorder, borderRadius: 8, padding: "10px 12px", color: T.white, fontFamily: T.bodyFont, fontSize: 12, outline: "none" }} /><Btn primary onClick={() => { if (newMod.trim()) { setGarage(g => g.map(x => x.id === c.id ? { ...x, mods: [...x.mods, newMod.trim()] } : x)); setNewMod(""); } }} style={{ padding: "0 14px" }}>+</Btn></div>
        </div>
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}><div style={{ fontFamily: T.headFont, fontSize: 14, color: T.grayDim, letterSpacing: 2 }}>GALLERY ({c.gallery.length})</div>{c.gallery.length > 0 && <button onClick={() => onShareGallery(c)} style={{ background: "none", border: "1px solid " + T.accent + "40", borderRadius: 6, padding: "4px 10px", color: T.accent, fontFamily: T.headFont, fontSize: 11, cursor: "pointer" }}>↗ SHARE</button>}</div>
          {c.gallery.length > 0 && (<div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6, marginBottom: 8 }}>{c.gallery.map((g, i) => (<div key={i} style={{ minWidth: 110, height: 80, borderRadius: 12, background: "linear-gradient(135deg," + T.bgAlt + "," + c.col + "15)", border: "1px solid " + T.grayDark, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: T.gray, fontFamily: T.monoFont, padding: 8, textAlign: "center", flexShrink: 0 }}>{g}</div>))}</div>)}
          <div style={{ display: "flex", gap: 8 }}><input value={newPhoto} onChange={e => setNewPhoto(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && newPhoto.trim()) { setGarage(g => g.map(x => x.id === c.id ? { ...x, gallery: [...x.gallery, newPhoto.trim()] } : x)); setNewPhoto(""); } }} placeholder="Add photo description..." style={{ flex: 1, background: T.card, border: "1px solid " + T.cardBorder, borderRadius: 8, padding: "10px 12px", color: T.white, fontFamily: T.bodyFont, fontSize: 12, outline: "none" }} /><Btn primary onClick={() => { if (newPhoto.trim()) { setGarage(g => g.map(x => x.id === c.id ? { ...x, gallery: [...x.gallery, newPhoto.trim()] } : x)); setNewPhoto(""); } }} style={{ padding: "0 14px" }}>📸</Btn></div>
        </div>
      </div>
    );
  }

  /* === GARAGE - LIST === */
  if (section === "garage") {
    return (
      <div style={{ padding: "14px 16px", overflowY: "auto", flex: 1 }}>
        <button onClick={() => setSection("profile")} style={{ background: "none", border: "none", color: T.accent, fontFamily: T.headFont, fontSize: 14, cursor: "pointer", marginBottom: 8 }}>← BACK</button>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <SH sub={garage.length + " vehicles"}>MY GARAGE</SH>
          <button onClick={() => setGarageView("add")} style={{ background: T.accent, border: "none", borderRadius: 10, width: 40, height: 40, color: T.bg, fontSize: 22, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
        </div>
        {garage.map(car => (
          <div key={car.id} onClick={() => { setGarageSel(car.id); setGarageView("detail"); }} style={{ background: T.card, borderRadius: 16, padding: 16, marginBottom: 10, border: "1px solid " + T.cardBorder, cursor: "pointer", borderLeft: "3px solid " + car.col + "60" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 54, height: 54, borderRadius: 12, background: "linear-gradient(135deg," + car.col + "20," + car.col + "08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, border: "1px solid " + car.col + "25" }}>{car.emoji}</div>
              <div style={{ flex: 1 }}><div style={{ fontFamily: T.headFont, fontSize: 19, color: T.white }}>{car.year} {car.make}</div><div style={{ fontFamily: T.bodyFont, fontSize: 14, color: T.accent }}>{car.model}</div><div style={{ fontFamily: T.monoFont, fontSize: 10, color: T.grayDim, marginTop: 3, display: "flex", gap: 10 }}>{car.mods.length > 0 && <span>⚙️ {car.mods.length} mods</span>}{car.gallery.length > 0 && <span>📸 {car.gallery.length} photos</span>}</div></div>
              {car.specs && <div style={{ textAlign: "right" }}><div style={{ fontFamily: T.headFont, fontSize: 22, color: T.white }}>{car.specs.hp}</div><div style={{ fontFamily: T.monoFont, fontSize: 9, color: T.grayDim }}>HP</div></div>}
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* === PROFILE (default) === */
  return (
    <div style={{ padding: "14px 16px", overflowY: "auto", flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 8 }}>
        <button onClick={() => setSection("garage")} style={{ background: T.card, border: "1px solid " + T.cardBorder, borderRadius: 10, padding: "8px 14px", color: T.white, fontFamily: T.headFont, fontSize: 12, letterSpacing: 1, cursor: "pointer" }}>🏠 GARAGE</button>
        <button onClick={() => setSection("settings")} style={{ background: T.card, border: "1px solid " + T.cardBorder, borderRadius: 10, padding: "8px 14px", color: T.white, fontFamily: T.headFont, fontSize: 12, letterSpacing: 1, cursor: "pointer" }}>⚙️ SETTINGS</button>
      </div>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 10px", background: T.mTheme ? "linear-gradient(135deg," + T.mBlue + "," + T.mPurple + "," + T.mRed + ")" : "linear-gradient(135deg," + T.accent + "," + T.accentHot + ")", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, boxShadow: "0 0 30px " + T.accentGlow, border: "3px solid " + T.bg, position: "relative", color: "#fff", fontFamily: T.headFont }}>
          A<div style={{ position: "absolute", bottom: 1, right: 1, width: 14, height: 14, borderRadius: "50%", background: T.green, border: "2px solid " + T.bg }} />
        </div>
        <div style={{ fontFamily: T.headFont, fontSize: 26, color: T.accent, letterSpacing: 1, textTransform: "uppercase" }}>{USER.name}</div>
        <div style={{ fontFamily: T.monoFont, fontSize: 12, color: T.grayDim }}>{USER.handle} · {USER.loc}</div>
        <div style={{ fontFamily: T.bodyFont, fontSize: 12, color: T.grayDim, marginTop: 6, lineHeight: 1.4 }}>Car enthusiast. Track day regular. Always chasing the perfect road.</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, marginBottom: 18 }}>
        {stats.map(s => (<div key={s.l} style={{ background: T.card, borderRadius: 12, padding: "12px 6px", textAlign: "center", border: "1px solid " + T.cardBorder }}><div style={{ fontFamily: T.headFont, fontSize: 22, color: T.white }}>{s.v}</div><div style={{ fontFamily: T.monoFont, fontSize: 9, color: T.grayDim, textTransform: "uppercase", letterSpacing: 1.5 }}>{s.l}</div></div>))}
      </div>

      {/* Quick garage preview */}
      <button onClick={() => setSection("garage")} style={{ width: "100%", background: T.card, border: "1px solid " + T.cardBorder, borderRadius: 14, padding: "14px 16px", marginBottom: 18, cursor: "pointer", textAlign: "left" }}>
        <div style={{ fontFamily: T.headFont, fontSize: 14, color: T.grayDim, letterSpacing: 2, marginBottom: 8 }}>MY GARAGE</div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
          {garage.slice(0, 3).map(c => (
            <div key={c.id} style={{ minWidth: 90, padding: "10px", borderRadius: 10, background: T.bgAlt, border: "1px solid " + T.grayDark, textAlign: "center", flexShrink: 0 }}>
              <div style={{ fontSize: 24 }}>{c.emoji}</div>
              <div style={{ fontFamily: T.headFont, fontSize: 12, color: T.white, marginTop: 4 }}>{c.make}</div>
              <div style={{ fontFamily: T.monoFont, fontSize: 10, color: T.accent }}>{c.specs ? c.specs.hp + " HP" : ""}</div>
            </div>
          ))}
          {garage.length > 3 && <div style={{ minWidth: 90, padding: "10px", borderRadius: 10, background: T.bgAlt, border: "1px solid " + T.grayDark, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", color: T.accent, fontFamily: T.headFont, fontSize: 14, flexShrink: 0 }}>+{garage.length - 3} more</div>}
        </div>
      </button>

      <div style={{ fontFamily: T.headFont, fontSize: 13, color: T.grayDim, letterSpacing: 2, marginBottom: 8 }}>BADGES</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>{badges.map(b => (<span key={b} style={{ background: T.card, border: "1px solid " + T.cardBorder, borderRadius: 8, padding: "6px 10px", fontFamily: T.bodyFont, fontSize: 11, color: T.white }}>{b}</span>))}</div>

      <div style={{ fontFamily: T.headFont, fontSize: 13, color: T.grayDim, letterSpacing: 2, marginBottom: 8 }}>RECENT</div>
      {[{ a: "Completed Sunset Canyon Run", t: "2h ago", i: "🏁" }, { a: "Added Mustang Dark Horse", t: "1d ago", i: "🐎" }, { a: "Started thread in Tech Help", t: "2d ago", i: "🔧" }].map((a, i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: T.card, borderRadius: 10, marginBottom: 5, border: "1px solid " + T.cardBorder }}><span style={{ fontSize: 16 }}>{a.i}</span><div style={{ flex: 1 }}><div style={{ fontFamily: T.bodyFont, fontSize: 13, color: T.white, fontWeight: 500 }}>{a.a}</div><div style={{ fontFamily: T.monoFont, fontSize: 10, color: T.grayDim }}>{a.t}</div></div></div>))}
    </div>
  );
}

/* ═══ APP ROOT ═══ */
export default function DriverHub() {
  const [tab, setTab] = useState("friends");
  const [themeId, setThemeId] = useState("bmwM");
  const [ready, setReady] = useState(false);
  const [garage, setGarage] = useState(initGarage);
  const [fullMap, setFullMap] = useState(false);
  const [landscape, setLandscape] = useState(false);
  const [feedPosts, setFeedPosts] = useState(initPosts);
  const [friends, setFriends] = useState(initFriends);
  const [chats, setChats] = useState(initChats);

  useEffect(() => { setTimeout(() => setReady(true), 80); }, []);
  useEffect(() => { const check = () => setLandscape(window.innerWidth > window.innerHeight); check(); window.addEventListener("resize", check); return () => window.removeEventListener("resize", check); }, []);

  const theme = THEMES[themeId];
  const handleShareGallery = (car) => {
    setFeedPosts(prev => [{ id: Date.now(), user: USER.name, avi: "A", car: car.year + " " + car.make + " " + car.model, time: "Just now", text: "Check out my " + car.make + " " + car.model + " gallery! " + (car.mods.length > 0 ? car.mods.length + " mods." : "Stock."), img: false, gallery: car.gallery, galleryCarName: car.make + " " + car.model, likes: 0, liked: false, comments: [], showComments: false }, ...prev]);
    setTab("feed");
  };

  return (
    <ThemeCtx.Provider value={theme}>
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: theme.gradient, padding: landscape ? 10 : "20px 10px" }}>
        <div style={{ opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(24px)", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)" }}>
          <div style={{ width: landscape ? 860 : 400, maxWidth: "100%", height: landscape ? 440 : 860, maxHeight: "95vh", borderRadius: landscape ? 24 : 40, overflow: "hidden", background: theme.bg, display: "flex", flexDirection: "column", boxShadow: "0 0 100px " + theme.accentGlow + ",0 30px 80px rgba(0,0,0,0.7)", border: "1.5px solid " + theme.grayDark, transition: "all 0.4s ease" }}>
            <link href={theme.fontUrl} rel="stylesheet" />
            <div style={{ height: landscape ? 32 : 46, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <div style={{ width: landscape ? 80 : 110, height: 5, background: theme.grayDark, borderRadius: 10, position: "absolute", top: landscape ? 6 : 10 }} />
              <span style={{ fontFamily: theme.monoFont, fontSize: 11, color: theme.grayDim, position: "absolute", right: 20, top: landscape ? 6 : 14, letterSpacing: 1 }}>REP {USER.rep}</span>
            </div>
            <HazardBar />
            <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              {tab === "feed" && <FeedTab feedPosts={feedPosts} setFeedPosts={setFeedPosts} />}
              {tab === "forum" && <ForumTab />}
              {tab === "friends" && <FriendsTab friends={friends} setFriends={setFriends} chats={chats} setChats={setChats} />}
              {tab === "map" && <MapTab fullMap={fullMap} onFullscreen={() => setFullMap(!fullMap)} landscape={landscape} friends={friends} />}
              {tab === "me" && <MeTab themeId={themeId} setThemeId={setThemeId} garage={garage} setGarage={setGarage} onShareGallery={handleShareGallery} />}
            </div>
            {!(fullMap && tab === "map") && <TabBar active={tab} set={setTab} landscape={landscape} />}
          </div>
        </div>
      </div>
    </ThemeCtx.Provider>
  );
}
