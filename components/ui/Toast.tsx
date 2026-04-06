import { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet } from "react-native";
import { useTheme } from "@/lib/context/ThemeContext";

interface Props {
  message: string;
  visible: boolean;
  onHide: () => void;
  duration?: number;
}

export function Toast({ message, visible, onHide, duration = 2000 }: Props) {
  const T = useTheme();
  const translateY = useRef(new Animated.Value(-80)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          speed: 14,
          bounciness: 8,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -80,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => onHide());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          backgroundColor: T.accent,
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <Text style={[styles.text, { color: T.bg, fontFamily: T.headFont }]}>
        {message}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    zIndex: 100,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  text: {
    fontSize: 13,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
