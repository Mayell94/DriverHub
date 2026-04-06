import { useEffect, useRef } from "react";
import { Animated, ViewStyle, StyleProp } from "react-native";

interface Props {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function FadeInView({ delay = 0, duration = 400, children, style }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    const anim = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]);
    anim.start();
  }, []);

  return (
    <Animated.View style={[style, { opacity, transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
}
