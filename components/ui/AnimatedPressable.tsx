import { useRef } from "react";
import {
  Animated,
  Pressable,
  PressableProps,
  ViewStyle,
  StyleProp,
} from "react-native";

interface Props extends PressableProps {
  style?: StyleProp<ViewStyle>;
  scaleDown?: number;
  children: React.ReactNode;
}

export function AnimatedPressable({
  style,
  scaleDown = 0.97,
  children,
  ...rest
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: scaleDown,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} {...rest}>
      <Animated.View style={[style, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
