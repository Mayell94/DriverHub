import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/lib/context/ThemeContext";

interface Props {
  label: string;
  variant?: "hot" | "solved" | "live" | "default";
}

export function Badge({ label, variant = "default" }: Props) {
  const T = useTheme();

  const colors: Record<string, { bg: string; text: string }> = {
    hot: { bg: T.red + "30", text: T.red },
    solved: { bg: T.green + "30", text: T.green },
    live: { bg: T.accent + "30", text: T.accent },
    default: { bg: T.grayDark, text: T.gray },
  };

  const c = colors[variant] || colors.default;

  return (
    <View style={[styles.pill, { backgroundColor: c.bg }]}>
      <Text style={[styles.text, { color: c.text, fontFamily: T.monoFont }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  text: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});
