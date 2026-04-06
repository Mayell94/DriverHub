import { View, StyleSheet } from "react-native";

interface Props {
  height?: number;
}

export function MStripeBar({ height = 3 }: Props) {
  return (
    <View style={[styles.row, { height }]}>
      <View style={[styles.stripe, { backgroundColor: "#0066B1" }]} />
      <View style={[styles.stripe, { backgroundColor: "#6F2DA8" }]} />
      <View style={[styles.stripe, { backgroundColor: "#E22B2B" }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
  },
  stripe: {
    flex: 1,
  },
});
