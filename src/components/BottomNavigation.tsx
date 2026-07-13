import React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';

export type BottomTab =
  | 'home'
  | 'transfer'
  | 'cards'
  | 'investments'
  | 'profile';

interface BottomNavigationProps {
  activeTab: BottomTab;
  onTabPress: (tab: BottomTab) => void;
}

const tabs = [
  {
    key: 'home',
    label: 'Home',
    icon: 'home-outline',
    activeIcon: 'home',
  },
  {
    key: 'transfer',
    label: 'Pay & Transfer',
    icon: 'swap-horizontal-outline',
    activeIcon: 'swap-horizontal',
  },
  {
    key: 'cards',
    label: 'Cards',
    icon: 'card-outline',
    activeIcon: 'card',
  },
  {
    key: 'investments',
    label: 'Investments',
    icon: 'bar-chart-outline',
    activeIcon: 'bar-chart',
  },
  {
    key: 'profile',
    label: 'Profile',
    icon: 'person-outline',
    activeIcon: 'person',
  },
] as const;

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabPress,
}) => {
  return (
    <View style={styles.menuContainer}>
      {tabs.map(tab => {
        const active = activeTab === tab.key;

        return (
          <Pressable
            key={tab.key}
            style={styles.menuItem}
            onPress={() => onTabPress(tab.key)}
          >
            <Ionicons
              name={active ? tab.activeIcon : tab.icon}
              size={24}
              color={active ? '#00387A' : '#777'}
            />

            <Text style={[styles.menuLabel, active && styles.activeLabel]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingVertical: 10,
    paddingBottom: 18,
  },

  menuItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuLabel: {
    marginTop: 4,
    fontSize: 11,
    color: '#777',
  },

  activeLabel: {
    color: '#00387A',
    fontWeight: '700',
  },
});