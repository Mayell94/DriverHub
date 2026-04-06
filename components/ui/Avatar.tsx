import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/lib/context/ThemeContext";

interface Props {
  letter: string;
  size?: number;
  status?: "online" | "driving" | "offline";
}

export function Avatar({ letter, size = 36, status }: Props) {
  const T = useTheme();
  const dotColor =
    status === "driving" ? T.green : status === "online" ? T.blue : T.grayDim;

  return (
    <View
      style={[
        styles.wrap,
        {
          width: size,
          height: size,
          borderRadius: 10,
          backgroundColor: T.bgAlt,
          borderColor: T.grayDark,
        },
      ]}
    >
      <Text
        style={{
          fontSize: size * 0.4,
          fontFamily: T.headFont,
          color: T.accent,
          fontWeight: "700",
        }}
      >
        {letter}
      </Text>
      {status && (
        <View
          style={[
            styles.dot,
            {
              width: size * 0.25,
              height: size * 0.25,
              borderRadius: size * 0.125,
              backgroundColor: dotColor,
              borderColor: T.card,
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  dot: {
    position: "absolute",
    bottom: -1,
    right: -1,
    borderWidth: 2,
  },
});
