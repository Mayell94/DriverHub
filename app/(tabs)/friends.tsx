import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/lib/context/ThemeContext";
import { useAppState } from "@/lib/context/AppStateContext";
import { GradientBackground } from "@/components/themed/GradientBackground";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Friend } from "@/lib/types";

export default function FriendsTab() {
  const T = useTheme();
  const insets = useSafeAreaInsets();
  const { friends, setFriends, chats, setChats } = useAppState();
  const [view, setView] = useState<"list" | "chat">("list");
  const [chatWith, setChatWith] = useState<Friend | null>(null);
  const [msgInput, setMsgInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const openChat = (f: Friend) => {
    setChatWith(f);
    setView("chat");
    setFriends((prev) =>
      prev.map((fr) => (fr.id === f.id ? { ...fr, unread: 0 } : fr))
    );
  };

  const sendMsg = () => {
    if (!msgInput.trim() || !chatWith) return;
    const newMsg = { from: "You", text: msgInput.trim(), time: "Now" };
    setChats((prev) => ({
      ...prev,
      [chatWith.id]: [...(prev[chatWith.id] || []), newMsg],
    }));
    setFriends((prev) =>
      prev.map((f) =>
        f.id === chatWith.id ? { ...f, lastMsg: msgInput.trim() } : f
      )
    );
    setMsgInput("");
  };

  const addFriend = () => {
    if (!searchInput.trim()) return;
    const nf: Friend = {
      id: Date.now(),
      name: searchInput.trim(),
      avi: searchInput.trim()[0].toUpperCase(),
      car: "Unknown",
      status: "offline",
      x: 50,
      y: 50,
      lastMsg: "",
      unread: 0,
    };
    setFriends((prev) => [...prev, nf]);
    setSearchInput("");
    setShowAdd(false);
  };

  // Chat view
  if (view === "chat" && chatWith) {
    const msgs = chats[chatWith.id] || [];
    return (
      <GradientBackground>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={60}
        >
          <View style={[styles.chatWrap, { paddingTop: insets.top + 14 }]}>
            {/* Chat header */}
            <View style={styles.chatHeader}>
              <Pressable onPress={() => setView("list")}>
                <Text
                  style={{
                    fontFamily: T.headFont,
                    fontSize: 14,
                    color: T.accent,
                  }}
                >
                  ←
                </Text>
              </Pressable>
              <Avatar letter={chatWith.avi} size={34} status={chatWith.status} />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: T.bodyFont,
                    fontSize: 15,
                    fontWeight: "600",
                    color: T.white,
                  }}
                >
                  {chatWith.name}
                </Text>
                <Text
                  style={{
                    fontFamily: T.monoFont,
                    fontSize: 11,
                    color:
                      chatWith.status === "offline" ? T.grayDim : T.green,
                  }}
                >
                  {chatWith.status} · {chatWith.car}
                </Text>
              </View>
            </View>

            {/* Messages */}
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 12 }}>
              {msgs.length === 0 && (
                <Text
                  style={{
                    textAlign: "center",
                    color: T.grayDim,
                    fontFamily: T.bodyFont,
                    fontSize: 13,
                    marginTop: 40,
                  }}
                >
                  No messages yet. Say hello!
                </Text>
              )}
              {msgs.map((m, i) => {
                const isMe = m.from === "You";
                return (
                  <View
                    key={i}
                    style={[
                      styles.msgRow,
                      { justifyContent: isMe ? "flex-end" : "flex-start" },
                    ]}
                  >
                    <View
                      style={[
                        styles.bubble,
                        isMe
                          ? {
                              backgroundColor: T.accent,
                              borderBottomRightRadius: 4,
                            }
                          : {
                              backgroundColor: T.card,
                              borderBottomLeftRadius: 4,
                              borderWidth: 1,
                              borderColor: T.cardBorder,
                            },
                      ]}
                    >
                      <Text
                        style={{
                          fontFamily: T.bodyFont,
                          fontSize: 13,
                          color: isMe ? T.bg : T.white,
                          lineHeight: 18,
                        }}
                      >
                        {m.text}
                      </Text>
                      <Text
                        style={{
                          fontFamily: T.monoFont,
                          fontSize: 9,
                          color: isMe ? T.bg + "99" : T.grayDim,
                          marginTop: 4,
                          textAlign: "right",
                        }}
                      >
                        {m.time}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>

            {/* Input */}
            <View style={styles.chatInput}>
              <TextInput
                value={msgInput}
                onChangeText={setMsgInput}
                onSubmitEditing={sendMsg}
                placeholder={"Message " + chatWith.name + "..."}
                placeholderTextColor={T.grayDim}
                style={[
                  styles.chatField,
                  {
                    backgroundColor: T.card,
                    borderColor: T.cardBorder,
                    color: T.white,
                    fontFamily: T.bodyFont,
                  },
                ]}
              />
              <Button
                primary
                onPress={sendMsg}
                style={{ paddingHorizontal: 16, borderRadius: 12 }}
              >
                ▶
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </GradientBackground>
    );
  }

  // Friend list
  const online = friends.filter((f) => f.status !== "offline");
  const offline = friends.filter((f) => f.status === "offline");
  const totalUnread = friends.reduce((a, f) => a + f.unread, 0);

  return (
    <GradientBackground>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 14 }]}
      >
        <View style={styles.headerRow}>
          <SectionHeader
            sub={friends.length + " friends · " + online.length + " online"}
          >
            {"FRIENDS" + (totalUnread > 0 ? " (" + totalUnread + ")" : "")}
          </SectionHeader>
          <Pressable
            onPress={() => setShowAdd(!showAdd)}
            style={[styles.addBtn, { backgroundColor: T.accent }]}
          >
            <Text
              style={{ color: T.bg, fontSize: 22, fontWeight: "700" }}
            >
              +
            </Text>
          </Pressable>
        </View>

        {/* Add friend form */}
        {showAdd && (
          <View
            style={[
              styles.addForm,
              { backgroundColor: T.card, borderColor: T.accent + "40" },
            ]}
          >
            <Text
              style={{
                fontFamily: T.headFont,
                fontSize: 14,
                color: T.accent,
                letterSpacing: 1,
                marginBottom: 8,
              }}
            >
              ADD FRIEND
            </Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <TextInput
                value={searchInput}
                onChangeText={setSearchInput}
                onSubmitEditing={addFriend}
                placeholder="Enter username..."
                placeholderTextColor={T.grayDim}
                style={[
                  styles.addInput,
                  {
                    backgroundColor: T.bgAlt,
                    borderColor: T.grayDark,
                    color: T.white,
                    fontFamily: T.bodyFont,
                  },
                ]}
              />
              <Button primary onPress={addFriend}>
                ADD
              </Button>
            </View>
          </View>
        )}

        {/* Online */}
        {online.length > 0 && (
          <Text
            style={[
              styles.sectionLabel,
              { color: T.green, fontFamily: T.headFont },
            ]}
          >
            ● ONLINE ({online.length})
          </Text>
        )}
        {online.map((f) => (
          <Pressable
            key={f.id}
            onPress={() => openChat(f)}
            style={[
              styles.friendCard,
              { backgroundColor: T.card, borderColor: T.cardBorder },
            ]}
          >
            <Avatar letter={f.avi} size={42} status={f.status} />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: T.bodyFont,
                  fontSize: 14,
                  fontWeight: "600",
                  color: T.white,
                }}
              >
                {f.name}
              </Text>
              <Text
                style={{
                  fontFamily: T.monoFont,
                  fontSize: 11,
                  color: T.grayDim,
                }}
              >
                {f.car}
              </Text>
              {f.lastMsg ? (
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: T.bodyFont,
                    fontSize: 11,
                    color: T.gray,
                    marginTop: 2,
                    maxWidth: 180,
                  }}
                >
                  {f.lastMsg}
                </Text>
              ) : null}
            </View>
            <View style={{ alignItems: "flex-end", gap: 4 }}>
              <Text
                style={{
                  fontFamily: T.headFont,
                  fontSize: 11,
                  color: f.status === "driving" ? T.green : T.blue,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {f.status}
              </Text>
              {f.unread > 0 && (
                <View style={[styles.unreadBadge, { backgroundColor: T.red }]}>
                  <Text style={styles.unreadText}>{f.unread}</Text>
                </View>
              )}
            </View>
          </Pressable>
        ))}

        {/* Offline */}
        {offline.length > 0 && (
          <Text
            style={[
              styles.sectionLabel,
              { color: T.grayDim, fontFamily: T.headFont, marginTop: 14 },
            ]}
          >
            OFFLINE ({offline.length})
          </Text>
        )}
        {offline.map((f) => (
          <Pressable
            key={f.id}
            onPress={() => openChat(f)}
            style={[
              styles.friendCard,
              {
                backgroundColor: T.card,
                borderColor: T.cardBorder,
                opacity: 0.6,
              },
            ]}
          >
            <Avatar letter={f.avi} size={42} status={f.status} />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: T.bodyFont,
                  fontSize: 14,
                  fontWeight: "600",
                  color: T.white,
                }}
              >
                {f.name}
              </Text>
              <Text
                style={{
                  fontFamily: T.monoFont,
                  fontSize: 11,
                  color: T.grayDim,
                }}
              >
                {f.car}
              </Text>
              {f.lastMsg ? (
                <Text
                  style={{
                    fontFamily: T.bodyFont,
                    fontSize: 11,
                    color: T.gray,
                    marginTop: 2,
                  }}
                >
                  {f.lastMsg}
                </Text>
              ) : null}
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  addForm: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
  },
  addInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
  },
  sectionLabel: {
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  friendCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    marginBottom: 6,
  },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  unreadText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
  chatWrap: {
    flex: 1,
    paddingHorizontal: 16,
  },
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  msgRow: {
    flexDirection: "row",
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  bubble: {
    maxWidth: "75%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  chatInput: {
    flexDirection: "row",
    gap: 8,
    paddingBottom: 8,
  },
  chatField: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 13,
  },
});
