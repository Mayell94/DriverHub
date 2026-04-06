import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "@/lib/context/ThemeContext";

interface Props {
  style?: ViewStyle;
  children?: React.ReactNode;
}

export function GradientBackground({ style, children }: Props) {
  const T = useTheme();

  return (
    <LinearGradient
      colors={T.gradientColors as [string, string, ...string[]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradient, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
