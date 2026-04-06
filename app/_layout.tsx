import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { Teko_400Regular, Teko_700Bold } from "@expo-google-fonts/teko";
import { Barlow_400Regular, Barlow_600SemiBold, Barlow_700Bold } from "@expo-google-fonts/barlow";
import { BarlowSemiCondensed_400Regular } from "@expo-google-fonts/barlow-semi-condensed";
import { Rajdhani_400Regular, Rajdhani_700Bold } from "@expo-google-fonts/rajdhani";
import { Exo2_400Regular, Exo2_600SemiBold } from "@expo-google-fonts/exo-2";
import { ShareTechMono_400Regular } from "@expo-google-fonts/share-tech-mono";
import { Syne_400Regular, Syne_700Bold } from "@expo-google-fonts/syne";
import { NunitoSans_400Regular, NunitoSans_600SemiBold } from "@expo-google-fonts/nunito-sans";
import { JetBrainsMono_400Regular } from "@expo-google-fonts/jetbrains-mono";
import { BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import { IBMPlexSans_400Regular, IBMPlexSans_600SemiBold } from "@expo-google-fonts/ibm-plex-sans";
import { IBMPlexMono_400Regular } from "@expo-google-fonts/ibm-plex-mono";

import { AppStateProvider } from "@/lib/context/AppStateContext";
import { ThemeProvider } from "@/lib/context/ThemeContext";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
    Teko_400Regular,
    Teko_700Bold,
    Barlow_400Regular,
    Barlow_600SemiBold,
    Barlow_700Bold,
    BarlowSemiCondensed_400Regular,
    Rajdhani_400Regular,
    Rajdhani_700Bold,
    Exo2_400Regular,
    Exo2_600SemiBold,
    ShareTechMono_400Regular,
    Syne_400Regular,
    Syne_700Bold,
    NunitoSans_400Regular,
    NunitoSans_600SemiBold,
    JetBrainsMono_400Regular,
    BebasNeue_400Regular,
    IBMPlexSans_400Regular,
    IBMPlexSans_600SemiBold,
    IBMPlexMono_400Regular,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AppStateProvider>
      <ThemeProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ThemeProvider>
    </AppStateProvider>
  );
}
