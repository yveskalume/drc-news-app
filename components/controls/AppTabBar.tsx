import React, { useState } from 'react';
import {View, styled, XStack, Paragraph} from 'tamagui';
import { Pressable } from 'react-native';
import {Href, usePathname, useRouter} from "expo-router";
import {House, Settings} from "@tamagui/lucide-icons";

type TabProps = {
    label: string;
    icon: React.ComponentType<{ color: string | number; size: number }>;
    path: Href
}

type TabBarButtonProps = {
    label: string;
    isActive: boolean;
    onPress: () => void;
    Icon: React.ComponentType<{ color: string | number; size: number }>;
}

const ActiveIndicator = styled(View, {
    name: 'ActiveIndicator',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '$gray10',
    position: 'absolute',
    opacity: 0.2,
});

const TabBarButton = (props:  TabBarButtonProps) => {
    const { label, isActive, onPress, Icon } = props;
    const iconColor = isActive ? '$gray10' : '$gray10';

    return (
        <Pressable onPress={onPress} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 8 }}>
            <View alignItems="center" justifyContent="center" position="relative">
                {isActive && <ActiveIndicator />}
                <Icon color={iconColor} size={24} />
            </View>
            <Paragraph>{label}</Paragraph>
        </Pressable>
    );
};

export const AppTabBar = () => {
    const [activeTab, setActiveTab] = useState(0);
    const router = useRouter();
    const pathname = usePathname();

    const tabs: TabProps[] = [
        {
            label: 'home',
            icon: House,
            path: "/(authed)/(tabs)/home"
        },
        {
            label: 'settings',
            icon: Settings,
            path: "/(authed)/(tabs)/settings"
        },
    ];

    const handleTabPress = (index: number, tab: TabProps) => {
        setActiveTab(index);
        if (router && tab.path) {
            if (pathname !== tab.path && !pathname.startsWith(tab.path + '/')) {
                router.push(tab.path);
            }
        }
    };

    return (
        <XStack
            width="100%"
            justifyContent="space-around"
            alignItems="center"
            backgroundColor="$background"
            borderTopWidth={1}
            borderTopColor="$gray4"
            paddingBottom="$4"
            paddingTop="$2"
        >
            {tabs.map((tab, index) => (
                <TabBarButton
                    key={index}
                    label={tab.label}
                    Icon={tab.icon}
                    isActive={activeTab === index}
                    onPress={() => handleTabPress(index, tab)}
                />
            ))}
        </XStack>
    );
};
