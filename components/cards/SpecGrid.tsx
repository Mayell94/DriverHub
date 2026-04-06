import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/lib/context/ThemeContext";
import { CarSpecs } from "@/lib/types";

interface Props {
  specs: CarSpecs;
}

const SPEC_LABELS: { key: keyof CarSpecs; label: string }[] = [
  { key: "hp", label: "HP" },
  { key: "torque", label: "TORQUE" },
  { key: "engine", label: "ENGINE" },
  { key: "trans", label: "TRANS" },
  { key: "drive", label: "DRIVE" },
  { key: "weight", label: "WEIGHT" },
  { key: "z60", label: "0-60" },
  { key: "top", label: "TOP" },
];

export function SpecGrid({ specs }: Props) {
  const T = useTheme();

  return (
    <View style={styles.grid}>
      {SPEC_LABELS.map(({ key, label }) => (
        <View
          key={key}
          style={[
            styles.cell,
            { backgroundColor: T.bgAlt, borderColor: T.grayDark },
          ]}
        >
          <Text style={[styles.label, { color: T.grayDim, fontFamily: T.monoFont }]}>
            {label}
          </Text>
          <Text style={[styles.value, { color: T.white, fontFamily: T.bodyFont }]}>
            {String(specs[key])}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  cell: {
    width: "31%",
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
  },
  label: {
    fontSize: 9,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  value: {
    fontSize: 12,
    fontWeight: "600",
  },
});
