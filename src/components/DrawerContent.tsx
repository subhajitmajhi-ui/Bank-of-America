import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import {Ionicons} from '@react-native-vector-icons/ionicons';

type MenuItemProps = {
  icon: any;
  title: string;
  badge?: string;
  badgeColor?: string;
  rightText?: string;
  rightTextColor?: string;
  danger?: boolean;
  onPress?: () => void;
};
type DrawerContentProps = {
  onClose: () => void;
};

function MenuItem({
  icon,
  title,
  badge,
  badgeColor = '#999',
  rightText,
  rightTextColor = '#D71920',
  danger,
  onPress,
}: MenuItemProps) {
  return (
    <Pressable style={styles.item} onPress={onPress}>
      <Ionicons
        name={icon}
        size={22}
        color={danger ? '#D71920' : '#0B2C6E'}
      />

      <Text
        style={[
          styles.itemText,
          danger && {color: '#D71920'},
        ]}>
        {title}
      </Text>

      <View style={{flex: 1}} />

      {badge ? (
        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                badgeColor === '#2DBE60'
                  ? '#EAF8EE'
                  : '#ECEEF3',
            },
          ]}>
          <Text
            style={[
              styles.badgeText,
              {color: badgeColor},
            ]}>
            {badge}
          </Text>
        </View>
      ) : null}

      {rightText ? (
        <Text
          style={[
            styles.rightText,
            {color: rightTextColor},
          ]}>
          {rightText}
        </Text>
      ) : null}
    </Pressable>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export default function DrawerContent({
  onClose,
}: DrawerContentProps) {
  return (
    <>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons
            name="person-outline"
            size={42}
            color="#fff"
          />
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.name}>Henry Sterling</Text>
          <Text style={styles.member}>
            Online Member
          </Text>

          <View style={styles.userCard}>
            <Text style={styles.userLabel}>
              User ID:{' '}
            </Text>

            <Text style={styles.userValue}>
              henry12
            </Text>

            <View style={{flex: 1}} />

            <Text style={styles.userLabel}>
              FICO®:{' '}
            </Text>

            <Text style={styles.userValue}>
              749
            </Text>
          </View>
        </View>

        <Pressable onPress={onClose}>
            <Ionicons
            name="close"
            size={28}
            color="#fff"
            />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30}}>
        <Section title="PROFILE & SETTINGS">
          <MenuItem
            icon="person-outline"
            title="My Profile Details"
          />

          <MenuItem
            icon="settings-outline"
            title="App settings"
            badge="BIO OFF"
          />

          <MenuItem
            icon="shield-checkmark-outline"
            title="Security Center"
          />
        </Section>

        <Section title="STATEMENTS & DOCS">
          <MenuItem
            icon="document-text-outline"
            title="Statements & Documents"
          />

          <MenuItem
            icon="document-outline"
            title="Go Paperless"
            badge="Active"
            badgeColor="#2DBE60"
          />
        </Section>

        <Section title="BANK OF AMERICA ACCOUNTS">
          <MenuItem
            icon="pie-chart-outline"
            title="View My FICO® Score"
            rightText="749"
          />

          <MenuItem
            icon="card-outline"
            title="Manage Debit/Credit"
          />

          <MenuItem
            icon="ribbon-outline"
            title="My Rewards Program"
          />

          <MenuItem
            icon="open-outline"
            title="Open a New Account"
            danger
          />
        </Section>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0B2C6E',
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#4E72A7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  name: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },

  member: {
    color: '#D8E2F0',
    marginTop: 2,
    fontSize: 13,
  },

  userCard: {
    marginTop: 15,
    backgroundColor: '#163D74',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },

  userLabel: {
    color: '#C8D2E2',
    fontSize: 12,
  },

  userValue: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },

  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  sectionTitle: {
    color: '#9CA3AF',
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 12,
    fontSize: 12,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },

  itemText: {
    marginLeft: 15,
    color: '#24364F',
    fontSize: 16,
    fontWeight: '600',
  },

  badge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },

  rightText: {
    fontSize: 20,
    fontWeight: '700',
  },
});