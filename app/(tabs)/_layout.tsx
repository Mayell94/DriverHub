import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { useTheme } from "@/lib/context/ThemeContext";
import { HazardBar } from "@/components/themed/HazardBar";

function TabIcon({ emoji, focused, accentColor }: { emoji: string; focused: boolean; accentColor: string }) {
  return (
    <View style={styles.iconWrap}>
      <Text
        style={[
          styles.icon,
          { opacity: focused ? 1 : 0.4 },
        ]}
      >
        {emoji}
      </Text>
      {focused && (
        <View style={[styles.indicator, { backgroundColor: accentColor }]} />
      )}
    </View>
  );
}

export default function TabLayout() {
  const T = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: T.bg }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: T.card,
            borderTopWidth: 0,
            paddingTop: 0,
            height: 64,
          },
          tabBarActiveTintColor: T.accent,
          tabBarInactiveTintColor: T.grayDim,
          tabBarLabelStyle: {
            fontFamily: T.headFont,
            fontSize: 10,
            letterSpacing: 1.5,
            fontWeight: "600",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "FEED",
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji="📡" focused={focused} accentColor={T.accent} />
            ),
          }}
        />
        <Tabs.Screen
          name="forum"
          options={{
            title: "FORUM",
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji="💬" focused={focused} accentColor={T.accent} />
            ),
          }}
        />
        <Tabs.Screen
          name="friends"
          options={{
            title: "FRIENDS",
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji="👥" focused={focused} accentColor={T.accent} />
            ),
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: "MAP",
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji="🗺️" focused={focused} accentColor={T.accent} />
            ),
          }}
        />
        <Tabs.Screen
          name="me"
          options={{
            title: "ME",
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji="👤" focused={focused} accentColor={T.accent} />
            ),
          }}
        />
      </Tabs>
      <View style={[styles.hazardWrap, { bottom: 64 }]}>
        <HazardBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    alignItems: "center",
    gap: 3,
  },
  icon: {
    fontSize: 19,
  },
  indicator: {
    width: 16,
    height: 2,
    borderRadius: 1,
  },
  hazardWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
