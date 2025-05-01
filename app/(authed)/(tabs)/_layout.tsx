import React from 'react';
import {Tabs} from "expo-router";
import {Home, Settings} from "@tamagui/lucide-icons";
import {useColorScheme} from "react-native";
import {Paragraph} from "tamagui";

export default function TabLayout() {
    const colorScheme = useColorScheme();

  return (
      <Tabs
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: "$accent5",
          tabBarHideOnKeyboard: true,
            tabBarStyle: {
                backgroundColor: colorScheme === "dark" ? "black" : "white",
                borderTopWidth: 0,
                paddingBottom: 5,
                paddingTop: 5,
            },
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: "600",
                textTransform: "none",
            }
        }}
      >
        <Tabs.Screen name="home" options={{
            tabBarLabel: ({color}) => (
                <Paragraph size="$2" color={color}>Actualités</Paragraph>
            ),
            tabBarIcon: ({color, size}) => (
                <Home size={size} color={color} />
            )
         }} />
        <Tabs.Screen name="settings" options={{
            tabBarLabel: ({color}) => (
                <Paragraph size="$2" color={color}>Paramètres</Paragraph>
            ),
            tabBarIcon: ({color, size}) => (
                <Settings size={size} color={color} />
            )
        }} />
      </Tabs>
  );
}
