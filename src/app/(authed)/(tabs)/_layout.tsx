import React from 'react';
import {Tabs} from "expo-router";
import {ChartBar, Globe, Settings} from "@tamagui/lucide-icons";
import {useColorScheme} from "react-native";
import {Paragraph} from "tamagui";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            initialRouteName="articles"
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
            <Tabs.Screen name="articles" options={{
                href: '/(authed)/(tabs)/articles',
                tabBarLabel: ({color}) => (
                    <Paragraph size="$2" color={color}>Actualités</Paragraph>
                ),
                tabBarIcon: ({color, size}) => (
                    <Globe size={size} color={color}/>
                )
            }}/>
            <Tabs.Screen name="sources/statistics" options={{
                href: '/(authed)/(tabs)/sources/statistics',
                tabBarLabel: ({color}) => (
                    <Paragraph size="$2" color={color}>Statistiques</Paragraph>
                ),
                tabBarIcon: ({color, size}) => (
                    <ChartBar size={size} color={color}/>
                )
            }}/>
            <Tabs.Screen name="account/settings" options={{
                href: '/(authed)/(tabs)/account/settings',
                tabBarLabel: ({color}) => (
                    <Paragraph size="$2" color={color}>Paramètres</Paragraph>
                ),
                tabBarIcon: ({color, size}) => (
                    <Settings size={size} color={color}/>
                )
            }}/>
        </Tabs>
    );
}
