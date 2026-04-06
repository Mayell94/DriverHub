import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/lib/context/ThemeContext";
import { MStripeBar } from "./MStripeBar";

export function HazardBar() {
  const T = useTheme();

  if (T.mTheme) return <MStripeBar />;

  if (!T.hazard) {
    return (
      <LinearGradient
        colors={["transparent", T.accent + "30", "transparent"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.line}
      />
    );
  }

  // Hazard stripe pattern — alternating accent/bg blocks
  const stripes = Array.from({ length: 20 }, (_, i) => (
    <View
      key={i}
      style={[
        styles.hazardStripe,
        { backgroundColor: i % 2 === 0 ? T.accent : T.bg },
      ]}
    />
  ));

  return (
    <View style={styles.hazardRow}>
      {stripes}
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: "100%",
  },
  hazardRow: {
    height: 3,
    width: "100%",
    flexDirection: "row",
    opacity: 0.7,
  },
  hazardStripe: {
    width: 12,
    height: 3,
  },
});
