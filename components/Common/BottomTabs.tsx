import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TABS } from '../../constants/tabs';
import { TabType } from '../../types';
import { colors } from '../../constants/colors';
import { globalStyles } from '../../constants/styles';

interface BottomTabsProps {
  activeTab: TabType;
  onChange: (tab: TabType) => void;
}

export function BottomTabs({ activeTab, onChange }: BottomTabsProps) {
  return (
    <View style={styles.bottomNav}>
      {TABS.map((item) => {
        const active = activeTab === item.key;

        return (
          <TouchableOpacity
            key={item.key}
            onPress={() => onChange(item.key)}
            style={[styles.navItem, active && styles.navItemActive]}>
            <MaterialCommunityIcons
              name={item.icon}
              size={24}
              color={active ? '#104c2b' : '#6f7b72'}
            />
            <Text style={[styles.navText, active && styles.navTextActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 88,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderColor: 'rgba(255,255,255,0.95)',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    ...globalStyles.shadow,
  },
  navItem: {
    minWidth: 104,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItemActive: {
    backgroundColor: colors.mint,
  },
  navText: {
    color: '#6f7b72',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 3,
  },
  navTextActive: {
    color: colors.greenDark,
  },
});

