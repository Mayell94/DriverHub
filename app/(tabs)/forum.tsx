import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/lib/context/ThemeContext";
import { GradientBackground } from "@/components/themed/GradientBackground";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FORUM_CATS, FORUM_THREADS } from "@/lib/data/initial-data";

export default function ForumTab() {
  const T = useTheme();
  const insets = useSafeAreaInsets();
  const [activeCat, setActiveCat] = useState<string | null>(null);

  // Category list
  if (!activeCat) {
    return (
      <GradientBackground>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.content, { paddingTop: insets.top + 14 }]}
        >
          <SectionHeader sub="Get help. Share knowledge. Find roads.">
            THE FORUM
          </SectionHeader>
          {FORUM_CATS.map((cat) => (
            <Pressable
              key={cat.id}
              onPress={() => setActiveCat(cat.id)}
              style={[
                styles.catCard,
                { backgroundColor: T.card, borderColor: T.cardBorder },
              ]}
            >
              <View
                style={[
                  styles.catIcon,
                  { backgroundColor: T.bgAlt, borderColor: T.grayDark },
                ]}
              >
                <Text style={{ fontSize: 22 }}>{cat.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: T.headFont,
                    fontSize: 17,
                    color: T.accent,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  }}
                >
                  {cat.label}
                </Text>
                <Text
                  style={{
                    fontFamily: T.bodyFont,
                    fontSize: 11,
                    color: T.grayDim,
                    marginTop: 2,
                  }}
                >
                  {cat.desc}
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={{
                    fontFamily: T.headFont,
                    fontSize: 20,
                    color: T.white,
                  }}
                >
                  {cat.threads}
                </Text>
                <Text
                  style={{
                    fontFamily: T.monoFont,
                    fontSize: 9,
                    color: T.grayDim,
                  }}
                >
                  threads
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </GradientBackground>
    );
  }

  // Thread list
  const cat = FORUM_CATS.find((c) => c.id === activeCat);
  const threads = FORUM_THREADS[activeCat] || [];

  return (
    <GradientBackground>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 14 }]}
      >
        <Pressable onPress={() => setActiveCat(null)}>
          <Text
            style={{
              fontFamily: T.headFont,
              fontSize: 14,
              color: T.accent,
              marginBottom: 8,
            }}
          >
            ← BACK
          </Text>
        </Pressable>

        <SectionHeader sub={cat?.desc}>
          {(cat?.icon || "") + " " + (cat?.label || "")}
        </SectionHeader>

        <Pressable
          style={[styles.newThread, { borderColor: T.accent + "50" }]}
        >
          <Text
            style={{
              fontFamily: T.headFont,
              fontSize: 15,
              color: T.accent,
              letterSpacing: 1,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            + NEW THREAD
          </Text>
        </Pressable>

        {threads.map((t) => (
          <View
            key={t.id}
            style={[
              styles.threadCard,
              {
                backgroundColor: T.card,
                borderColor: T.cardBorder,
                borderLeftColor: t.hot ? T.accent : "transparent",
              },
            ]}
          >
            <View style={styles.badges}>
              {t.hot && (
                <View
                  style={[styles.badge, { backgroundColor: T.accent }]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      { color: T.bg, fontFamily: T.headFont },
                    ]}
                  >
                    🔥 HOT
                  </Text>
                </View>
              )}
              {t.solved && (
                <View
                  style={[styles.badge, { backgroundColor: T.green }]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      { color: T.bg, fontFamily: T.headFont },
                    ]}
                  >
                    ✓ SOLVED
                  </Text>
                </View>
              )}
            </View>
            <Text
              style={{
                fontFamily: T.bodyFont,
                fontSize: 13,
                fontWeight: "600",
                color: T.white,
              }}
            >
              {t.title}
            </Text>
            <Text
              style={{
                fontFamily: T.monoFont,
                fontSize: 11,
                color: T.grayDim,
                marginTop: 4,
              }}
            >
              by {t.user} · {t.replies} replies · {t.views} views
            </Text>
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
  catCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 8,
  },
  catIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  newThread: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  threadCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderLeftWidth: 3,
    padding: 14,
    marginBottom: 8,
  },
  badges: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 4,
    flexWrap: "wrap",
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
  },
});
