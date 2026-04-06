import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/lib/context/ThemeContext";
import { useAppState } from "@/lib/context/AppStateContext";
import { GradientBackground } from "@/components/themed/GradientBackground";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { USER } from "@/lib/data/initial-data";

export default function FeedTab() {
  const T = useTheme();
  const insets = useSafeAreaInsets();
  const { feedPosts, setFeedPosts } = useAppState();
  const [newPost, setNewPost] = useState("");
  const [composing, setComposing] = useState(false);
  const [commentText, setCommentText] = useState<Record<number, string>>({});

  const toggleLike = (id: number) =>
    setFeedPosts((ps) =>
      ps.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );

  const toggleComments = (id: number) =>
    setFeedPosts((ps) =>
      ps.map((p) =>
        p.id === id ? { ...p, showComments: !p.showComments } : p
      )
    );

  const addComment = (id: number) => {
    const txt = commentText[id];
    if (!txt?.trim()) return;
    setFeedPosts((ps) =>
      ps.map((p) =>
        p.id === id
          ? {
              ...p,
              comments: [
                ...p.comments,
                { user: USER.name, avi: "A", text: txt.trim(), time: "Just now" },
              ],
            }
          : p
      )
    );
    setCommentText((prev) => ({ ...prev, [id]: "" }));
  };

  const submitPost = () => {
    if (!newPost.trim()) return;
    setFeedPosts((prev) => [
      {
        id: Date.now(),
        user: USER.name,
        avi: "A",
        car: "911 GT3 RS",
        time: "Just now",
        text: newPost.trim(),
        img: false,
        gallery: null,
        galleryCarName: null,
        likes: 0,
        liked: false,
        comments: [],
        showComments: false,
      },
      ...prev,
    ]);
    setNewPost("");
    setComposing(false);
  };

  return (
    <GradientBackground>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 14 }]}
      >
        <SectionHeader sub="What's happening on the streets">
          COMMUNITY FEED
        </SectionHeader>

        {/* Compose */}
        {!composing ? (
          <Pressable
            onPress={() => setComposing(true)}
            style={[
              styles.composeBtn,
              { backgroundColor: T.card, borderColor: T.grayDark },
            ]}
          >
            <Text style={{ color: T.grayDim, fontFamily: T.bodyFont, fontSize: 13 }}>
              Share something with the crew...
            </Text>
          </Pressable>
        ) : (
          <View
            style={[
              styles.composeBox,
              { backgroundColor: T.card, borderColor: T.accent + "40" },
            ]}
          >
            <TextInput
              value={newPost}
              onChangeText={setNewPost}
              placeholder="What's on your mind?"
              placeholderTextColor={T.grayDim}
              multiline
              style={[
                styles.composeInput,
                { color: T.white, fontFamily: T.bodyFont },
              ]}
            />
            <View style={styles.composeActions}>
              <Pressable onPress={() => setComposing(false)}>
                <Text style={{ color: T.grayDim, fontSize: 12 }}>Cancel</Text>
              </Pressable>
              <Button primary onPress={submitPost}>
                POST
              </Button>
            </View>
          </View>
        )}

        {/* Posts */}
        {feedPosts.map((p) => (
          <View
            key={p.id}
            style={[
              styles.postCard,
              { backgroundColor: T.card, borderColor: T.cardBorder },
            ]}
          >
            {/* Top accent line */}
            <View
              style={[styles.postLine, { backgroundColor: T.accent + "30" }]}
            />

            {/* Header */}
            <View style={styles.postHeader}>
              <Avatar letter={p.avi} />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: T.bodyFont,
                    fontSize: 14,
                    fontWeight: "600",
                    color: T.white,
                  }}
                >
                  {p.user}
                </Text>
                <Text
                  style={{
                    fontFamily: T.monoFont,
                    fontSize: 11,
                    color: T.grayDim,
                  }}
                >
                  {p.car} · {p.time}
                </Text>
              </View>
            </View>

            {/* Body */}
            <Text
              style={{
                fontFamily: T.bodyFont,
                fontSize: 14,
                color: T.white,
                lineHeight: 21,
                marginBottom: 12,
              }}
            >
              {p.text}
            </Text>

            {/* Gallery */}
            {p.gallery && (
              <View style={{ marginBottom: 12 }}>
                <Text
                  style={{
                    fontFamily: T.headFont,
                    fontSize: 12,
                    color: T.accent,
                    letterSpacing: 1,
                    marginBottom: 6,
                  }}
                >
                  {"📸 GALLERY — " + p.galleryCarName}
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {p.gallery.map((g, i) => (
                    <View
                      key={i}
                      style={[
                        styles.galleryThumb,
                        {
                          backgroundColor: T.bgAlt,
                          borderColor: T.grayDark,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          color: T.grayDim,
                          fontFamily: T.monoFont,
                          textAlign: "center",
                        }}
                      >
                        {g}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Image placeholder */}
            {p.img && !p.gallery && (
              <View
                style={[
                  styles.imgPlaceholder,
                  {
                    backgroundColor: T.bgAlt,
                    borderColor: T.grayDark,
                  },
                ]}
              >
                <Text style={{ fontSize: 36, opacity: 0.4 }}>📸</Text>
              </View>
            )}

            {/* Actions */}
            <View style={styles.actions}>
              <Pressable
                onPress={() => toggleLike(p.id)}
                style={styles.actionBtn}
              >
                <Text style={{ fontSize: 13 }}>{p.liked ? "❤️" : "🤍"}</Text>
                <Text
                  style={{
                    color: p.liked ? T.red : T.grayDim,
                    fontFamily: T.bodyFont,
                    fontSize: 13,
                  }}
                >
                  {p.likes}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => toggleComments(p.id)}
                style={styles.actionBtn}
              >
                <Text style={{ fontSize: 13 }}>💬</Text>
                <Text
                  style={{
                    color: T.grayDim,
                    fontFamily: T.bodyFont,
                    fontSize: 13,
                  }}
                >
                  {p.comments.length}
                </Text>
              </Pressable>
              <Text
                style={{
                  color: T.grayDim,
                  fontFamily: T.bodyFont,
                  fontSize: 13,
                  marginLeft: "auto",
                }}
              >
                ↗ Share
              </Text>
            </View>

            {/* Comments */}
            {p.showComments && (
              <View style={[styles.commentsWrap, { borderTopColor: T.grayDark }]}>
                {p.comments.map((c, ci) => (
                  <View key={ci} style={styles.commentRow}>
                    <Avatar letter={c.avi} size={24} />
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text
                          style={{
                            fontFamily: T.bodyFont,
                            fontSize: 12,
                            color: T.white,
                            fontWeight: "600",
                          }}
                        >
                          {c.user}
                        </Text>
                        <Text
                          style={{
                            color: T.grayDim,
                            marginLeft: 6,
                            fontSize: 10,
                          }}
                        >
                          {c.time}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontFamily: T.bodyFont,
                          fontSize: 12,
                          color: T.gray,
                          marginTop: 2,
                        }}
                      >
                        {c.text}
                      </Text>
                    </View>
                  </View>
                ))}
                <View style={styles.commentInput}>
                  <TextInput
                    value={commentText[p.id] || ""}
                    onChangeText={(t) =>
                      setCommentText((prev) => ({ ...prev, [p.id]: t }))
                    }
                    onSubmitEditing={() => addComment(p.id)}
                    placeholder="Write a comment..."
                    placeholderTextColor={T.grayDim}
                    style={[
                      styles.commentField,
                      {
                        backgroundColor: T.bgAlt,
                        borderColor: T.grayDark,
                        color: T.white,
                        fontFamily: T.bodyFont,
                      },
                    ]}
                  />
                  <Button
                    primary
                    onPress={() => addComment(p.id)}
                    style={{ paddingHorizontal: 14, paddingVertical: 8 }}
                  >
                    ▶
                  </Button>
                </View>
              </View>
            )}
          </View>
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
  composeBtn: {
    padding: 14,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 14,
    marginBottom: 16,
  },
  composeBox: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  composeInput: {
    minHeight: 70,
    fontSize: 14,
    lineHeight: 21,
    textAlignVertical: "top",
  },
  composeActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  postCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  postLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  galleryThumb: {
    width: 100,
    height: 70,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
    padding: 6,
  },
  imgPlaceholder: {
    height: 130,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  commentsWrap: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  commentRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  commentInput: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  commentField: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 12,
  },
});
