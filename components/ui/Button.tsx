import { useRef } from "react";
import { Animated, Pressable, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { useTheme } from "@/lib/context/ThemeContext";

interface Props {
  children: string;
  primary?: boolean;
  full?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export function Button({ children, primary, full, onPress, style }: Props) {
  const T = useTheme();
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 8,
    }).start();
  };

  const containerStyle: ViewStyle = {
    backgroundColor: primary ? T.accent : "transparent",
    borderWidth: primary ? 0 : 1,
    borderColor: primary ? undefined : T.accent + "40",
    width: full ? "100%" : undefined,
    ...(primary
      ? {
          shadowColor: T.accent,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 8,
        }
      : {}),
  };

  const textStyle: TextStyle = {
    color: primary ? T.bg : T.accent,
    fontFamily: T.headFont,
  };

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View
        style={[styles.btn, containerStyle, style, { transform: [{ scale }] }]}
      >
        <Text style={[styles.label, textStyle]}>{children}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
