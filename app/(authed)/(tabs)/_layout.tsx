import React from 'react';
import {Tabs} from "expo-router";
import {AppTabBar} from "@/components/controls/AppTabBar";

export default function TabLayout() {
  return (
      <Tabs
        initialRouteName="home"
        tabBar={() => <AppTabBar />}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
        }}
      >
        <Tabs.Screen name="home" />
        <Tabs.Screen name="settings" />
      </Tabs>
  );
}
