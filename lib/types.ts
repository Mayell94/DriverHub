export interface Theme {
  id: string;
  label: string;
  desc: string;
  bg: string;
  bgAlt: string;
  card: string;
  cardBorder: string;
  accent: string;
  accentHot: string;
  accentGlow: string;
  red: string;
  green: string;
  greenGlow: string;
  blue: string;
  white: string;
  gray: string;
  grayDim: string;
  grayDark: string;
  headFont: string;
  bodyFont: string;
  monoFont: string;
  hazard: boolean;
  mTheme: boolean;
  mRed?: string;
  mBlue?: string;
  mPurple?: string;
  gradientColors: string[];
}

export interface CarSpecs {
  hp: number;
  torque: string;
  engine: string;
  trans: string;
  drive: string;
  weight: string;
  z60: string;
  top: string;
}

export interface GarageCar {
  id: number;
  make: string;
  model: string;
  year: number;
  emoji: string;
  col: string;
  specs: CarSpecs | null;
  mods: string[];
  gallery: string[];
}

export interface Friend {
  id: number;
  name: string;
  avi: string;
  car: string;
  status: "online" | "driving" | "offline";
  x: number;
  y: number;
  lastMsg: string;
  unread: number;
}

export interface ChatMessage {
  from: string;
  text: string;
  time: string;
}

export interface Post {
  id: number;
  user: string;
  avi: string;
  car: string;
  time: string;
  text: string;
  img: boolean;
  gallery: string[] | null;
  galleryCarName: string | null;
  likes: number;
  liked: boolean;
  comments: PostComment[];
  showComments: boolean;
}

export interface PostComment {
  user: string;
  avi: string;
  text: string;
  time: string;
}

export interface ForumCategory {
  id: string;
  icon: string;
  label: string;
  desc: string;
  threads: number;
}

export interface ForumThread {
  id: number;
  title: string;
  user: string;
  replies: number;
  views: number;
  hot: boolean;
  solved: boolean;
}

export interface User {
  name: string;
  handle: string;
  loc: string;
  rep: number;
}
