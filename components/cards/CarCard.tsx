import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@/lib/context/ThemeContext";
import { GarageCar } from "@/lib/types";

interface Props {
  car: GarageCar;
  onPress?: () => void;
}

export function CarCard({ car, onPress }: Props) {
  const T = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        { backgroundColor: T.card, borderColor: T.cardBorder },
      ]}
    >
      <View style={styles.row}>
        <Text style={styles.emoji}>{car.emoji}</Text>
        <View style={styles.info}>
          <Text style={[styles.name, { color: T.white, fontFamily: T.bodyFont }]}>
            {car.year} {car.make} {car.model}
          </Text>
          <Text style={[styles.meta, { color: T.grayDim, fontFamily: T.monoFont }]}>
            {car.specs ? `${car.specs.hp} HP · ${car.specs.z60}` : "No specs"}
            {car.mods.length > 0 ? ` · ${car.mods.length} mods` : ""}
          </Text>
        </View>
        <View style={[styles.dot, { backgroundColor: car.col }]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  emoji: {
    fontSize: 28,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
  },
  meta: {
    fontSize: 11,
    marginTop: 2,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
