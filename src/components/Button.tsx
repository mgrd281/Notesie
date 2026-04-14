import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { Spacing, BorderRadius, Shadow, Typography } from '@constants/theme';
import { ThemeColors } from '@types/index';

export interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  theme: ThemeColors;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  style,
  theme,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
      style={[
        {
          backgroundColor: disabled ? theme.textSecondary : theme.accent,
          paddingVertical: Spacing.md,
          paddingHorizontal: Spacing.lg,
          borderRadius: BorderRadius.lg,
          alignItems: 'center',
          justifyContent: 'center',
          ...Shadow.md,
        },
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={theme.text} />
      ) : (
        <Text
          style={{
            color: theme.text,
            fontSize: Typography.body.fontSize,
            fontWeight: '600',
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  theme: ThemeColors;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
  theme,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        {
          backgroundColor: theme.surface,
          paddingVertical: Spacing.md,
          paddingHorizontal: Spacing.lg,
          borderRadius: BorderRadius.lg,
          alignItems: 'center',
          borderColor: theme.border,
          borderWidth: 1,
        },
        style,
      ]}
    >
      <Text
        style={{
          color: theme.text,
          fontSize: Typography.body.fontSize,
          fontWeight: '600',
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

interface IconButtonProps {
  icon: string;
  onPress: () => void;
  theme: ThemeColors;
  size?: number;
  backgroundColor?: string;
  style?: ViewStyle;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  theme,
  size = 28,
  backgroundColor,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        {
          width: size + 16,
          height: size + 16,
          borderRadius: BorderRadius.md,
          backgroundColor: backgroundColor || theme.surface,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <Text style={{ fontSize: size }}>{icon}</Text>
    </TouchableOpacity>
  );
};

interface FloatingActionButtonProps {
  icon: string;
  onPress: () => void;
  theme: ThemeColors;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  onPress,
  theme,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        position: 'absolute',
        bottom: Spacing.lg,
        right: Spacing.lg,
        width: 60,
        height: 60,
        borderRadius: BorderRadius.full,
        backgroundColor: theme.accent,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadow.lg,
      }}
    >
      <Text style={{ fontSize: 28 }}>{icon}</Text>
    </TouchableOpacity>
  );
};

interface TextButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  theme: ThemeColors;
  color?: string;
}

export const TextButton: React.FC<TextButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
  theme,
  color,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        {
          paddingVertical: Spacing.md,
          paddingHorizontal: Spacing.sm,
        },
        style,
      ]}
    >
      <Text
        style={{
          color: color || theme.accent,
          fontSize: Typography.body.fontSize,
          fontWeight: '600',
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
