import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "@/lib/context/ThemeContext";
import { useAppState } from "@/lib/context/AppStateContext";
import { GradientBackground } from "@/components/themed/GradientBackground";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { SpecGrid } from "@/components/cards/SpecGrid";
import { THEMES } from "@/lib/themes";
import { USER } from "@/lib/data/initial-data";
import { lookupSpecs } from "@/lib/car-db";

type Section = "profile" | "settings" | "garage";
type GarageView = "list" | "add" | "detail";

export default function MeTab() {
  const T = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { themeId, setThemeId, garage, setGarage, setFeedPosts } = useAppState();

  const [section, setSection] = useState<Section>("profile");
  const [garageView, setGarageView] = useState<GarageView>("list");
  const [garageSel, setGarageSel] = useState<number | null>(null);
  const [addForm, setAddForm] = useState({ make: "", model: "", year: "" });
  const [foundSpecs, setFoundSpecs] = useState<ReturnType<typeof lookupSpecs>>(null);
  const [newMod, setNewMod] = useState("");
  const [newPhoto, setNewPhoto] = useState("");

  const stats = [
    { l: "Drives", v: "142" },
    { l: "Miles", v: "8.4K" },
    { l: "Cars", v: String(garage.length) },
    { l: "Rep", v: "2.8K" },
  ];
  const badges = [
    "🏆 Canyon King",
    "⚡ Speed Demon",
    "🌅 Sunset Chaser",
    "🔧 Gearhead",
    "🏁 Track Rat",
  ];

  const handleShareGallery = (car: (typeof garage)[0]) => {
    setFeedPosts((prev) => [
      {
        id: Date.now(),
        user: USER.name,
        avi: "A",
        car: car.year + " " + car.make + " " + car.model,
        time: "Just now",
        text:
          "Check out my " +
          car.make +
          " " +
          car.model +
          " gallery! " +
          (car.mods.length > 0 ? car.mods.length + " mods." : "Stock."),
        img: false,
        gallery: car.gallery,
        galleryCarName: car.make + " " + car.model,
        likes: 0,
        liked: false,
        comments: [],
        showComments: false,
      },
      ...prev,
    ]);
    router.navigate("/(tabs)");
  };

  const BackBtn = ({ onPress }: { onPress: () => void }) => (
    <Pressable onPress={onPress}>
      <Text style={{ fontFamily: T.headFont, fontSize: 14, color: T.accent, marginBottom: 8 }}>
        ← BACK
      </Text>
    </Pressable>
  );

  /* ── SETTINGS ── */
  if (section === "settings") {
    return (
      <GradientBackground>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.content, { paddingTop: insets.top + 14 }]}
        >
          <BackBtn onPress={() => setSection("profile")} />
          <SectionHeader sub="Customise your experience">SETTINGS</SectionHeader>

          <Text style={[styles.sectionLabel, { color: T.grayDim, fontFamily: T.headFont }]}>
            THEME
          </Text>

          {Object.values(THEMES).map((tm) => {
            const isActive = themeId === tm.id;
            const swatches = tm.mTheme
              ? [tm.mBlue!, tm.mPurple!, tm.mRed!, tm.accent]
              : [tm.bg, tm.card, tm.accent, tm.accentHot];

            return (
              <Pressable
                key={tm.id}
                onPress={() => setThemeId(tm.id)}
                style={[
                  styles.themeCard,
                  {
                    backgroundColor: isActive ? tm.accent + "10" : T.card,
                    borderColor: isActive ? tm.accent : T.cardBorder,
                    borderWidth: isActive ? 2 : 1,
                  },
                ]}
              >
                <View style={styles.swatchRow}>
                  {swatches.map((c, i) => (
                    <View
                      key={i}
                      style={[
                        styles.swatch,
                        {
                          backgroundColor: c,
                          borderWidth: c === tm.bg ? 1 : 0,
                          borderColor: tm.grayDark,
                        },
                      ]}
                    />
                  ))}
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: T.headFont,
                      fontSize: 17,
                      color: isActive ? tm.accent : T.white,
                      letterSpacing: 1,
                    }}
                  >
                    {tm.label}
                  </Text>
                  <Text
                    style={{ fontFamily: T.bodyFont, fontSize: 11, color: T.grayDim }}
                  >
                    {tm.desc}
                  </Text>
                </View>
                {isActive && (
                  <Text style={{ color: T.green, fontSize: 18 }}>✓</Text>
                )}
              </Pressable>
            );
          })}

          <Text
            style={[
              styles.sectionLabel,
              { color: T.grayDim, fontFamily: T.headFont, marginTop: 18 },
            ]}
          >
            DISPLAY
          </Text>
          {[
            { label: "Auto-Rotate", value: "On" },
            { label: "CarPlay / Android Auto", value: "Ready" },
          ].map((s) => (
            <View
              key={s.label}
              style={[styles.settingRow, { backgroundColor: T.card, borderColor: T.cardBorder }]}
            >
              <Text style={{ fontFamily: T.bodyFont, fontSize: 13, color: T.white }}>
                {s.label}
              </Text>
              <Text style={{ fontFamily: T.monoFont, fontSize: 12, color: T.accent }}>
                {s.value}
              </Text>
            </View>
          ))}

          <Text
            style={[
              styles.sectionLabel,
              { color: T.grayDim, fontFamily: T.headFont, marginTop: 18 },
            ]}
          >
            ACCOUNT
          </Text>
          {["Edit Profile", "Blocked Users", "Data & Privacy", "Help & Support", "Log Out"].map(
            (item) => (
              <View
                key={item}
                style={[styles.settingRow, { backgroundColor: T.card, borderColor: T.cardBorder }]}
              >
                <Text
                  style={{
                    fontFamily: T.bodyFont,
                    fontSize: 13,
                    color: item === "Log Out" ? T.red : T.white,
                  }}
                >
                  {item}
                </Text>
              </View>
            )
          )}
          <View style={{ height: 20 }} />
        </ScrollView>
      </GradientBackground>
    );
  }

  /* ── GARAGE ADD ── */
  if (section === "garage" && garageView === "add") {
    return (
      <GradientBackground>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.content, { paddingTop: insets.top + 14 }]}
        >
          <BackBtn onPress={() => setGarageView("list")} />
          <SectionHeader sub="Auto-pull stock specs">ADD NEW CAR</SectionHeader>

          {(["make", "model", "year"] as const).map((f) => (
            <View key={f} style={{ marginBottom: 12 }}>
              <Text
                style={[styles.inputLabel, { color: T.grayDim, fontFamily: T.headFont }]}
              >
                {f.toUpperCase()}
              </Text>
              <TextInput
                value={addForm[f]}
                onChangeText={(v) => setAddForm((prev) => ({ ...prev, [f]: v }))}
                placeholder={
                  f === "make"
                    ? "e.g. BMW"
                    : f === "model"
                    ? "e.g. M3 Competition"
                    : "e.g. 2023"
                }
                placeholderTextColor={T.grayDim}
                style={[
                  styles.input,
                  {
                    backgroundColor: T.card,
                    borderColor: T.cardBorder,
                    color: T.white,
                    fontFamily: T.bodyFont,
                  },
                ]}
              />
            </View>
          ))}

          <Button
            full
            primary
            onPress={() => setFoundSpecs(lookupSpecs(addForm.make, addForm.model))}
            style={{ marginBottom: 16 }}
          >
            🔍 LOOKUP SPECS
          </Button>

          {foundSpecs && (
            <View
              style={[
                styles.specsFound,
                { backgroundColor: T.card, borderColor: T.green + "30" },
              ]}
            >
              <Text
                style={{
                  fontFamily: T.headFont,
                  fontSize: 16,
                  color: T.green,
                  marginBottom: 10,
                }}
              >
                ✓ SPECS FOUND
              </Text>
              <SpecGrid specs={foundSpecs} />
            </View>
          )}

          <Button
            full
            primary
            onPress={() => {
              if (!addForm.make || !addForm.model) return;
              setGarage((prev) => [
                ...prev,
                {
                  id: Date.now(),
                  make: addForm.make,
                  model: addForm.model,
                  year: parseInt(addForm.year) || 2024,
                  emoji: "🚗",
                  col:
                    "#" +
                    Math.floor(Math.random() * 0xffffff)
                      .toString(16)
                      .padStart(6, "0"),
                  specs: foundSpecs,
                  mods: [],
                  gallery: [],
                },
              ]);
              setAddForm({ make: "", model: "", year: "" });
              setFoundSpecs(null);
              setGarageView("list");
            }}
          >
            ADD TO GARAGE
          </Button>
        </ScrollView>
      </GradientBackground>
    );
  }

  /* ── GARAGE DETAIL ── */
  const selCar = garage.find((c) => c.id === garageSel);
  if (section === "garage" && garageView === "detail" && selCar) {
    const c = selCar;
    return (
      <GradientBackground>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.content, { paddingTop: insets.top + 14 }]}
        >
          <BackBtn onPress={() => setGarageView("list")} />

          {/* Car header */}
          <View style={styles.carHeader}>
            <Text style={{ fontSize: 48, marginBottom: 6 }}>{c.emoji}</Text>
            <Text style={{ fontFamily: T.headFont, fontSize: 26, color: T.white }}>
              {c.year} {c.make}
            </Text>
            <Text style={{ fontFamily: T.bodyFont, fontSize: 16, color: T.accent }}>
              {c.model}
            </Text>
          </View>

          {/* Specs */}
          {c.specs && (
            <View style={{ marginBottom: 18 }}>
              <Text style={[styles.sectionLabel, { color: T.grayDim, fontFamily: T.headFont }]}>
                STOCK SPECS
              </Text>
              <SpecGrid specs={c.specs} />
            </View>
          )}

          {/* Mods */}
          <View style={{ marginBottom: 18 }}>
            <Text style={[styles.sectionLabel, { color: T.grayDim, fontFamily: T.headFont }]}>
              MODIFICATIONS ({c.mods.length})
            </Text>
            {c.mods.map((m, i) => (
              <View
                key={i}
                style={[
                  styles.modRow,
                  {
                    backgroundColor: T.card,
                    borderColor: T.cardBorder,
                    borderLeftColor: T.accent,
                  },
                ]}
              >
                <Text style={{ color: T.accent }}>⚙️</Text>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: T.bodyFont,
                    fontSize: 13,
                    color: T.white,
                  }}
                >
                  {m}
                </Text>
                <Pressable
                  onPress={() =>
                    setGarage((g) =>
                      g.map((x) =>
                        x.id === c.id
                          ? { ...x, mods: x.mods.filter((_, j) => j !== i) }
                          : x
                      )
                    )
                  }
                >
                  <Text style={{ color: T.grayDim }}>✕</Text>
                </Pressable>
              </View>
            ))}
            <View style={styles.addRow}>
              <TextInput
                value={newMod}
                onChangeText={setNewMod}
                onSubmitEditing={() => {
                  if (newMod.trim()) {
                    setGarage((g) =>
                      g.map((x) =>
                        x.id === c.id
                          ? { ...x, mods: [...x.mods, newMod.trim()] }
                          : x
                      )
                    );
                    setNewMod("");
                  }
                }}
                placeholder="Add modification..."
                placeholderTextColor={T.grayDim}
                style={[
                  styles.addInput,
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
                onPress={() => {
                  if (newMod.trim()) {
                    setGarage((g) =>
                      g.map((x) =>
                        x.id === c.id
                          ? { ...x, mods: [...x.mods, newMod.trim()] }
                          : x
                      )
                    );
                    setNewMod("");
                  }
                }}
                style={{ paddingHorizontal: 14 }}
              >
                +
              </Button>
            </View>
          </View>

          {/* Gallery */}
          <View style={{ marginBottom: 18 }}>
            <View style={styles.galleryHeader}>
              <Text style={[styles.sectionLabel, { color: T.grayDim, fontFamily: T.headFont, marginBottom: 0 }]}>
                GALLERY ({c.gallery.length})
              </Text>
              {c.gallery.length > 0 && (
                <Pressable
                  onPress={() => handleShareGallery(c)}
                  style={[styles.shareBtn, { borderColor: T.accent + "40" }]}
                >
                  <Text
                    style={{
                      fontFamily: T.headFont,
                      fontSize: 11,
                      color: T.accent,
                    }}
                  >
                    ↗ SHARE
                  </Text>
                </Pressable>
              )}
            </View>
            {c.gallery.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 8 }}
              >
                {c.gallery.map((g, i) => (
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
                        color: T.gray,
                        fontFamily: T.monoFont,
                        textAlign: "center",
                      }}
                    >
                      {g}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            )}
            <View style={styles.addRow}>
              <TextInput
                value={newPhoto}
                onChangeText={setNewPhoto}
                onSubmitEditing={() => {
                  if (newPhoto.trim()) {
                    setGarage((g) =>
                      g.map((x) =>
                        x.id === c.id
                          ? { ...x, gallery: [...x.gallery, newPhoto.trim()] }
                          : x
                      )
                    );
                    setNewPhoto("");
                  }
                }}
                placeholder="Add photo description..."
                placeholderTextColor={T.grayDim}
                style={[
                  styles.addInput,
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
                onPress={() => {
                  if (newPhoto.trim()) {
                    setGarage((g) =>
                      g.map((x) =>
                        x.id === c.id
                          ? { ...x, gallery: [...x.gallery, newPhoto.trim()] }
                          : x
                      )
                    );
                    setNewPhoto("");
                  }
                }}
                style={{ paddingHorizontal: 14 }}
              >
                📸
              </Button>
            </View>
          </View>
        </ScrollView>
      </GradientBackground>
    );
  }

  /* ── GARAGE LIST ── */
  if (section === "garage") {
    return (
      <GradientBackground>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.content, { paddingTop: insets.top + 14 }]}
        >
          <BackBtn onPress={() => setSection("profile")} />
          <View style={styles.headerRow}>
            <SectionHeader sub={garage.length + " vehicles"}>MY GARAGE</SectionHeader>
            <Pressable
              onPress={() => setGarageView("add")}
              style={[styles.addBtnCircle, { backgroundColor: T.accent }]}
            >
              <Text style={{ color: T.bg, fontSize: 22, fontWeight: "700" }}>+</Text>
            </Pressable>
          </View>

          {garage.map((car) => (
            <Pressable
              key={car.id}
              onPress={() => {
                setGarageSel(car.id);
                setGarageView("detail");
              }}
              style={[
                styles.garageCard,
                {
                  backgroundColor: T.card,
                  borderColor: T.cardBorder,
                  borderLeftColor: car.col + "60",
                },
              ]}
            >
              <View style={styles.garageRow}>
                <View
                  style={[
                    styles.carEmoji,
                    {
                      backgroundColor: car.col + "20",
                      borderColor: car.col + "25",
                    },
                  ]}
                >
                  <Text style={{ fontSize: 28 }}>{car.emoji}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: T.headFont, fontSize: 19, color: T.white }}>
                    {car.year} {car.make}
                  </Text>
                  <Text style={{ fontFamily: T.bodyFont, fontSize: 14, color: T.accent }}>
                    {car.model}
                  </Text>
                  <View style={styles.garageMetaRow}>
                    {car.mods.length > 0 && (
                      <Text style={{ fontFamily: T.monoFont, fontSize: 10, color: T.grayDim }}>
                        ⚙️ {car.mods.length} mods
                      </Text>
                    )}
                    {car.gallery.length > 0 && (
                      <Text style={{ fontFamily: T.monoFont, fontSize: 10, color: T.grayDim }}>
                        📸 {car.gallery.length} photos
                      </Text>
                    )}
                  </View>
                </View>
                {car.specs && (
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={{ fontFamily: T.headFont, fontSize: 22, color: T.white }}>
                      {car.specs.hp}
                    </Text>
                    <Text style={{ fontFamily: T.monoFont, fontSize: 9, color: T.grayDim }}>
                      HP
                    </Text>
                  </View>
                )}
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </GradientBackground>
    );
  }

  /* ── PROFILE (default) ── */
  const gradientColors = T.mTheme
    ? [T.mBlue!, T.mPurple!, T.mRed!]
    : [T.accent, T.accentHot];

  return (
    <GradientBackground>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 14 }]}
      >
        {/* Nav buttons */}
        <View style={styles.navRow}>
          <Pressable
            onPress={() => setSection("garage")}
            style={[styles.navBtn, { backgroundColor: T.card, borderColor: T.cardBorder }]}
          >
            <Text style={{ fontFamily: T.headFont, fontSize: 12, color: T.white, letterSpacing: 1 }}>
              🏠 GARAGE
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setSection("settings")}
            style={[styles.navBtn, { backgroundColor: T.card, borderColor: T.cardBorder }]}
          >
            <Text style={{ fontFamily: T.headFont, fontSize: 12, color: T.white, letterSpacing: 1 }}>
              ⚙️ SETTINGS
            </Text>
          </Pressable>
        </View>

        {/* Profile header */}
        <View style={styles.profileCenter}>
          <LinearGradient
            colors={gradientColors as [string, string, ...string[]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatarGradient}
          >
            <Text
              style={{
                fontSize: 32,
                color: "#fff",
                fontFamily: T.headFont,
              }}
            >
              A
            </Text>
            <View
              style={[
                styles.onlineDot,
                { backgroundColor: T.green, borderColor: T.bg },
              ]}
            />
          </LinearGradient>
          <Text
            style={{
              fontFamily: T.headFont,
              fontSize: 26,
              color: T.accent,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {USER.name}
          </Text>
          <Text style={{ fontFamily: T.monoFont, fontSize: 12, color: T.grayDim }}>
            {USER.handle} · {USER.loc}
          </Text>
          <Text
            style={{
              fontFamily: T.bodyFont,
              fontSize: 12,
              color: T.grayDim,
              marginTop: 6,
              lineHeight: 17,
              textAlign: "center",
            }}
          >
            Car enthusiast. Track day regular. Always chasing the perfect road.
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          {stats.map((s) => (
            <View
              key={s.l}
              style={[
                styles.statCard,
                { backgroundColor: T.card, borderColor: T.cardBorder },
              ]}
            >
              <Text style={{ fontFamily: T.headFont, fontSize: 22, color: T.white }}>
                {s.v}
              </Text>
              <Text
                style={{
                  fontFamily: T.monoFont,
                  fontSize: 9,
                  color: T.grayDim,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                }}
              >
                {s.l}
              </Text>
            </View>
          ))}
        </View>

        {/* Garage preview */}
        <Pressable
          onPress={() => setSection("garage")}
          style={[
            styles.garagePreview,
            { backgroundColor: T.card, borderColor: T.cardBorder },
          ]}
        >
          <Text style={[styles.sectionLabel, { color: T.grayDim, fontFamily: T.headFont }]}>
            MY GARAGE
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {garage.slice(0, 3).map((c) => (
              <View
                key={c.id}
                style={[
                  styles.garagePreviewItem,
                  { backgroundColor: T.bgAlt, borderColor: T.grayDark },
                ]}
              >
                <Text style={{ fontSize: 24 }}>{c.emoji}</Text>
                <Text style={{ fontFamily: T.headFont, fontSize: 12, color: T.white, marginTop: 4 }}>
                  {c.make}
                </Text>
                <Text style={{ fontFamily: T.monoFont, fontSize: 10, color: T.accent }}>
                  {c.specs ? c.specs.hp + " HP" : ""}
                </Text>
              </View>
            ))}
            {garage.length > 3 && (
              <View
                style={[
                  styles.garagePreviewItem,
                  {
                    backgroundColor: T.bgAlt,
                    borderColor: T.grayDark,
                    justifyContent: "center",
                  },
                ]}
              >
                <Text style={{ fontFamily: T.headFont, fontSize: 14, color: T.accent }}>
                  +{garage.length - 3} more
                </Text>
              </View>
            )}
          </ScrollView>
        </Pressable>

        {/* Badges */}
        <Text style={[styles.sectionLabel, { color: T.grayDim, fontFamily: T.headFont }]}>
          BADGES
        </Text>
        <View style={styles.badgesRow}>
          {badges.map((b) => (
            <View
              key={b}
              style={[
                styles.badgePill,
                { backgroundColor: T.card, borderColor: T.cardBorder },
              ]}
            >
              <Text style={{ fontFamily: T.bodyFont, fontSize: 11, color: T.white }}>
                {b}
              </Text>
            </View>
          ))}
        </View>

        {/* Recent activity */}
        <Text
          style={[
            styles.sectionLabel,
            { color: T.grayDim, fontFamily: T.headFont, marginTop: 18 },
          ]}
        >
          RECENT
        </Text>
        {[
          { a: "Completed Sunset Canyon Run", t: "2h ago", i: "🏁" },
          { a: "Added Mustang Dark Horse", t: "1d ago", i: "🐎" },
          { a: "Started thread in Tech Help", t: "2d ago", i: "🔧" },
        ].map((act, i) => (
          <View
            key={i}
            style={[
              styles.activityRow,
              { backgroundColor: T.card, borderColor: T.cardBorder },
            ]}
          >
            <Text style={{ fontSize: 16 }}>{act.i}</Text>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: T.bodyFont,
                  fontSize: 13,
                  color: T.white,
                  fontWeight: "500",
                }}
              >
                {act.a}
              </Text>
              <Text style={{ fontFamily: T.monoFont, fontSize: 10, color: T.grayDim }}>
                {act.t}
              </Text>
            </View>
          </View>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  sectionLabel: {
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginBottom: 8,
  },
  navBtn: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  profileCenter: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  onlineDot: {
    position: "absolute",
    bottom: 1,
    right: 1,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 18,
  },
  statCard: {
    width: "23%",
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  garagePreview: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 18,
  },
  garagePreviewItem: {
    width: 90,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    marginRight: 8,
  },
  badgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 18,
  },
  badgePill: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginBottom: 5,
  },
  // Theme picker
  themeCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
  },
  swatchRow: {
    flexDirection: "row",
    gap: 3,
  },
  swatch: {
    width: 16,
    height: 16,
    borderRadius: 5,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
    marginBottom: 5,
  },
  // Garage
  addBtnCircle: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  garageCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderLeftWidth: 3,
    padding: 16,
    marginBottom: 10,
  },
  garageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  carEmoji: {
    width: 54,
    height: 54,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  garageMetaRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 3,
  },
  carHeader: {
    alignItems: "center",
    marginBottom: 16,
  },
  modRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderLeftWidth: 3,
    padding: 10,
    marginBottom: 5,
  },
  addRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  addInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 12,
  },
  galleryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  shareBtn: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  galleryThumb: {
    width: 110,
    height: 80,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    padding: 8,
  },
  // Add car
  inputLabel: {
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },
  specsFound: {
    borderRadius: 14,
    borderWidth: 1,
    borderLeftWidth: 3,
    padding: 16,
    marginBottom: 16,
  },
});
