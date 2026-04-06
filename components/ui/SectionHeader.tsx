import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/lib/context/ThemeContext";

interface Props {
  children: string;
  sub?: string;
}

export function SectionHeader({ children, sub }: Props) {
  const T = useTheme();

  return (
    <View style={styles.wrap}>
      <Text
        style={[
          styles.heading,
          { fontFamily: T.headFont, color: T.accent },
        ]}
      >
        {children}
      </Text>
      {sub && (
        <Text
          style={[
            styles.sub,
            { fontFamily: T.bodyFont, color: T.grayDim },
          ]}
        >
          {sub}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 14,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    lineHeight: 30,
  },
  sub: {
    fontSize: 12,
    marginTop: 4,
  },
});
