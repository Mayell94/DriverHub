import React, { createContext, useContext, useState, ReactNode } from "react";
import { Post, Friend, ChatMessage, GarageCar } from "../types";
import { initPosts, initFriends, initChats, initGarage } from "../data/initial-data";

interface AppState {
  themeId: string;
  setThemeId: (id: string) => void;
  feedPosts: Post[];
  setFeedPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  friends: Friend[];
  setFriends: React.Dispatch<React.SetStateAction<Friend[]>>;
  chats: Record<number, ChatMessage[]>;
  setChats: React.Dispatch<React.SetStateAction<Record<number, ChatMessage[]>>>;
  garage: GarageCar[];
  setGarage: React.Dispatch<React.SetStateAction<GarageCar[]>>;
}

const AppStateCtx = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState("bmwM");
  const [feedPosts, setFeedPosts] = useState<Post[]>(initPosts);
  const [friends, setFriends] = useState<Friend[]>(initFriends);
  const [chats, setChats] = useState<Record<number, ChatMessage[]>>(initChats);
  const [garage, setGarage] = useState<GarageCar[]>(initGarage);

  return (
    <AppStateCtx.Provider
      value={{
        themeId, setThemeId,
        feedPosts, setFeedPosts,
        friends, setFriends,
        chats, setChats,
        garage, setGarage,
      }}
    >
      {children}
    </AppStateCtx.Provider>
  );
}

export function useAppState(): AppState {
  const ctx = useContext(AppStateCtx);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
