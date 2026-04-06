import { Link, Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/lib/context/ThemeContext";

export default function NotFoundScreen() {
  const T = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={[styles.container, { backgroundColor: T.bg }]}>
        <Text style={[styles.title, { color: T.white, fontFamily: T.headFont }]}>
          This screen doesn't exist.
        </Text>
        <Link href="/" style={styles.link}>
          <Text style={{ fontSize: 14, color: T.accent }}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
