import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/lib/context/ThemeContext";
import { useAppState } from "@/lib/context/AppStateContext";
import { GradientBackground } from "@/components/themed/GradientBackground";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { friendToCoord } from "@/lib/map-helpers";

function MapArea() {
  const T = useTheme();
  const { friends } = useAppState();
  const onlineFriends = friends.filter((f) => f.status !== "offline");

  if (Platform.OS === "web") {
    // Simple styled placeholder for web
    return (
      <View
        style={[
          styles.mapPlaceholder,
          { backgroundColor: "#0D1117", borderColor: T.grayDark },
        ]}
      >
        {/* Legend */}
        <View
          style={[
            styles.legend,
            { backgroundColor: T.bg + "CC", borderColor: T.grayDark },
          ]}
        >
          {[
            { label: "You", color: T.accent },
            { label: "Online", color: T.blue },
            { label: "Driving", color: T.green },
          ].map((item) => (
            <View key={item.label} style={styles.legendRow}>
              <View
                style={[styles.legendDot, { backgroundColor: item.color }]}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: T.gray,
                  fontFamily: T.monoFont,
                }}
              >
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        {/* You marker */}
        <View style={styles.youMarker}>
          <View
            style={[
              styles.youDot,
              { backgroundColor: T.accent, borderColor: "#fff" },
            ]}
          />
          <Text style={[styles.markerLabel, { color: T.accent }]}>YOU</Text>
        </View>

        {/* Friend markers */}
        {onlineFriends.map((f) => {
          const coord = friendToCoord(f);
          const left = ((f.x / 100) * 80 + 10) + "%";
          const top = ((f.y / 100) * 70 + 10) + "%";
          return (
            <View
              key={f.id}
              style={[styles.friendMarker, { left: left as any, top: top as any }]}
            >
              <View
                style={[
                  styles.fDot,
                  {
                    backgroundColor:
                      f.status === "driving" ? T.green : T.blue,
                  },
                ]}
              />
              <Text style={[styles.markerLabel, { color: T.white }]}>
                {f.name.split(" ")[0]}
              </Text>
            </View>
          );
        })}

        <Text
          style={{
            position: "absolute",
            bottom: 8,
            alignSelf: "center",
            fontFamily: T.monoFont,
            fontSize: 10,
            color: T.grayDim,
          }}
        >
          Essex, UK · {onlineFriends.length} friends nearby
        </Text>
      </View>
    );
  }

  // Native: use react-native-maps
  const MapView = require("react-native-maps").default;
  const { Marker } = require("react-native-maps");
  const { MAP_CENTER, DARK_MAP_STYLE } = require("@/lib/map-helpers");

  return (
    <View style={[styles.mapWrap, { borderColor: T.grayDark }]}>
      <MapView
        style={styles.nativeMap}
        initialRegion={MAP_CENTER}
        customMapStyle={DARK_MAP_STYLE}
      >
        {/* User marker */}
        <Marker
          coordinate={{
            latitude: MAP_CENTER.latitude,
            longitude: MAP_CENTER.longitude,
          }}
          title="You"
        />
        {/* Friend markers */}
        {onlineFriends.map((f) => (
          <Marker
            key={f.id}
            coordinate={friendToCoord(f)}
            title={f.name}
            description={f.car}
          />
        ))}
      </MapView>
      {/* Legend overlay */}
      <View
        style={[
          styles.legend,
          { backgroundColor: T.bg + "CC", borderColor: T.grayDark },
        ]}
      >
        {[
          { label: "You", color: T.accent },
          { label: "Online", color: T.blue },
          { label: "Driving", color: T.green },
        ].map((item) => (
          <View key={item.label} style={styles.legendRow}>
            <View
              style={[styles.legendDot, { backgroundColor: item.color }]}
            />
            <Text
              style={{
                fontSize: 10,
                color: T.gray,
                fontFamily: T.monoFont,
              }}
            >
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function MapTab() {
  const T = useTheme();
  const insets = useSafeAreaInsets();
  const { friends } = useAppState();
  const [showInvite, setShowInvite] = useState(false);
  const [invited, setInvited] = useState<number[]>([]);

  const toggleInvite = (id: number) =>
    setInvited((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const onlineFriends = friends.filter((f) => f.status !== "offline");

  return (
    <GradientBackground>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 14 }]}
      >
        <SectionHeader sub={onlineFriends.length + " friends nearby"}>
          LIVE MAP
        </SectionHeader>

        <MapArea />

        {/* Invite friends to drive */}
        <Pressable
          onPress={() => setShowInvite(!showInvite)}
          style={[
            styles.inviteBtn,
            {
              backgroundColor: showInvite ? T.accent + "15" : T.card,
              borderColor: showInvite ? T.accent + "50" : T.cardBorder,
            },
          ]}
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
            {"👥 INVITE FRIENDS TO DRIVE" +
              (invited.length > 0 ? " (" + invited.length + ")" : "")}
          </Text>
        </Pressable>

        {showInvite && (
          <View
            style={[
              styles.inviteList,
              { backgroundColor: T.card, borderColor: T.accent + "30" },
            ]}
          >
            {friends.map((f) => {
              const isInvited = invited.includes(f.id);
              return (
                <Pressable
                  key={f.id}
                  onPress={() => toggleInvite(f.id)}
                  style={[
                    styles.inviteRow,
                    {
                      backgroundColor: isInvited
                        ? T.accent + "15"
                        : "transparent",
                      borderColor: isInvited ? T.accent + "40" : "transparent",
                    },
                  ]}
                >
                  <Avatar letter={f.avi} size={32} status={f.status} />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: T.bodyFont,
                        fontSize: 13,
                        color: T.white,
                        fontWeight: "600",
                      }}
                    >
                      {f.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: T.monoFont,
                        fontSize: 10,
                        color: T.grayDim,
                      }}
                    >
                      {f.car}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.checkbox,
                      {
                        backgroundColor: isInvited ? T.accent : "transparent",
                        borderColor: isInvited ? T.accent : T.grayDark,
                        borderWidth: isInvited ? 0 : 2,
                      },
                    ]}
                  >
                    {isInvited && (
                      <Text
                        style={{ color: T.bg, fontSize: 14, fontWeight: "700" }}
                      >
                        ✓
                      </Text>
                    )}
                  </View>
                </Pressable>
              );
            })}
            {invited.length > 0 && (
              <Button
                full
                primary
                onPress={() => setShowInvite(false)}
                style={{ marginTop: 8 }}
              >
                {"SEND INVITE (" + invited.length + ")"}
              </Button>
            )}
          </View>
        )}

        {/* Live drive card */}
        <View
          style={[
            styles.liveCard,
            { backgroundColor: T.card, borderColor: T.green + "30" },
          ]}
        >
          <View style={styles.liveHeader}>
            <View style={[styles.liveBadge, { backgroundColor: T.green }]}>
              <Text style={{ fontFamily: T.headFont, fontSize: 10, color: T.bg }}>
                LIVE
              </Text>
            </View>
            <Text
              style={{
                fontFamily: T.bodyFont,
                fontSize: 12,
                color: T.green,
              }}
            >
              Sunset Canyon Run · 3 drivers
            </Text>
          </View>
          <Button full primary onPress={() => {}}>
            JOIN LIVE DRIVE →
          </Button>
        </View>

        {/* Nearby friends */}
        {onlineFriends.map((f) => (
          <View
            key={f.id}
            style={[
              styles.nearbyCard,
              { backgroundColor: T.card, borderColor: T.cardBorder },
            ]}
          >
            <Avatar letter={f.avi} size={34} status={f.status} />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: T.bodyFont,
                  fontSize: 13,
                  color: T.white,
                  fontWeight: "600",
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
            </View>
            <Text
              style={{
                fontFamily: T.headFont,
                fontSize: 11,
                letterSpacing: 1,
                color: f.status === "driving" ? T.green : T.blue,
                textTransform: "uppercase",
              }}
            >
              {f.status}
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
  mapPlaceholder: {
    height: 320,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 14,
    overflow: "hidden",
    position: "relative",
  },
  mapWrap: {
    height: 320,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 14,
    overflow: "hidden",
    position: "relative",
  },
  nativeMap: {
    width: "100%",
    height: "100%",
  },
  legend: {
    position: "absolute",
    top: 8,
    right: 8,
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 2,
  },
  legendDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  youMarker: {
    position: "absolute",
    top: "42%",
    left: "42%",
    alignItems: "center",
  },
  youDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2.5,
  },
  markerLabel: {
    fontSize: 9,
    fontWeight: "700",
    marginTop: 2,
  },
  friendMarker: {
    position: "absolute",
    alignItems: "center",
  },
  fDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  inviteBtn: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
  },
  inviteList: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
  },
  inviteRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 10,
    marginBottom: 4,
    borderWidth: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  liveCard: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderLeftWidth: 3,
  },
  liveHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  liveBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  nearbyCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    borderWidth: 1,
  },
});
