import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LightTheme, DarkTheme, Spacing, Typography, BorderRadius } from '@constants/theme';
import { ThemeColors } from '@types/index';

interface ContainerProps {
  children: React.ReactNode;
  theme: ThemeColors;
  padding?: number;
  backgroundColor?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  theme,
  padding = Spacing.lg,
  backgroundColor,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backgroundColor || theme.background,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left + padding,
        paddingRight: insets.right + padding,
      }}
    >
      {children}
    </View>
  );
};

interface CardProps {
  children: React.ReactNode;
  theme: ThemeColors;
  onPress?: () => void;
  style?: any;
  padding?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  theme,
  onPress,
  style,
  padding = Spacing.lg,
}) => {
  return (
    <View
      style={[
        {
          backgroundColor: theme.cardBackground,
          borderRadius: BorderRadius.lg,
          padding,
          marginBottom: Spacing.md,
          borderColor: theme.border,
          borderWidth: 1,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

interface BadgeProps {
  label: string;
  color: string;
  emoji?: string;
}

export const Badge: React.FC<BadgeProps> = ({ label, color, emoji }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color + '20',
        borderRadius: BorderRadius.full,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderColor: color + '40',
        borderWidth: 1,
      }}
    >
      {emoji && <Text style={{ marginRight: Spacing.xs }}>{emoji}</Text>}
      <Text style={{ color, fontSize: 12, fontWeight: '500' }}>{label}</Text>
    </View>
  );
};

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  theme: ThemeColors;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  theme,
}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
      }}
    >
      <Text style={{ fontSize: 64, marginBottom: Spacing.lg }}>{icon}</Text>
      <Text
        style={{
          fontSize: Typography.h3.fontSize,
          fontWeight: '600',
          color: theme.text,
          marginBottom: Spacing.md,
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: Typography.bodySmall.fontSize,
          color: theme.textSecondary,
          textAlign: 'center',
          lineHeight: 24,
        }}
      >
        {description}
      </Text>
    </View>
  );
};

interface SectionHeaderProps {
  title: string;
  theme: ThemeColors;
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  theme,
  action,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: Spacing.md,
      }}
    >
      <Text
        style={{
          fontSize: Typography.h3.fontSize,
          fontWeight: '600',
          color: theme.text,
        }}
      >
        {title}
      </Text>
      {action}
    </View>
  );
};

interface DividerProps {
  theme: ThemeColors;
  style?: any;
}

export const Divider: React.FC<DividerProps> = ({ theme, style }) => (
  <View
    style={[
      {
        height: 1,
        backgroundColor: theme.border,
        marginVertical: Spacing.md,
      },
      style,
    ]}
  />
);
