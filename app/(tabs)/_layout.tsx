import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { useTheme } from "@/lib/context/ThemeContext";
import { HazardBar } from "@/components/themed/HazardBar";

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <Text
      style={[
        styles.icon,
        { opacity: focused ? 1 : 0.4 },
      ]}
    >
      {emoji}
    </Text>
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
            height: 60,
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
              <TabIcon emoji="📡" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="forum"
          options={{
            title: "FORUM",
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji="💬" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="friends"
          options={{
            title: "FRIENDS",
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji="👥" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: "MAP",
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji="🗺️" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="me"
          options={{
            title: "ME",
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji="👤" focused={focused} />
            ),
          }}
        />
      </Tabs>
      <View style={[styles.hazardWrap, { bottom: 60 }]}>
        <HazardBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 19,
  },
  hazardWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
