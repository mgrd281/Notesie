import React, { useState } from 'react';
import {
  View,
  TextInput as RNTextInput,
  TouchableOpacity,
  Text,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import { Spacing, BorderRadius, Typography } from '@constants/theme';
import { ThemeColors } from '@types/index';

interface SearchBarProps {
  placeholder?: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  value: string;
  theme: ThemeColors;
  style?: ViewStyle;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search notes...',
  onChangeText,
  onClear,
  value,
  theme,
  style,
}) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.surface,
          borderRadius: BorderRadius.lg,
          paddingHorizontal: Spacing.md,
          borderColor: theme.border,
          borderWidth: 1,
          marginBottom: Spacing.md,
        },
        style,
      ]}
    >
      <Text style={{ fontSize: 18, marginRight: Spacing.sm }}>🔍</Text>
      <RNTextInput
        style={[
          {
            flex: 1,
            paddingVertical: Spacing.md,
            color: theme.text,
            fontSize: Typography.body.fontSize,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}
        onChangeText={onChangeText}
        value={value}
      />
      {value ? (
        <TouchableOpacity onPress={onClear}>
          <Text style={{ fontSize: 18 }}>✕</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

interface TextInputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  theme: ThemeColors;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  editable?: boolean;
  label?: string;
  characterCount?: boolean;
  style?: ViewStyle;
}

export const TextInputField: React.FC<TextInputFieldProps> = ({
  value,
  onChangeText,
  placeholder,
  theme,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  editable = true,
  label,
  characterCount = false,
  style,
}) => {
  return (
    <View style={style}>
      {label && (
        <Text
          style={{
            color: theme.text,
            fontSize: Typography.bodySmall.fontSize,
            fontWeight: '600',
            marginBottom: Spacing.sm,
          }}
        >
          {label}
        </Text>
      )}
      <RNTextInput
        style={[
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
            borderWidth: 1,
            borderRadius: BorderRadius.lg,
            paddingHorizontal: Spacing.md,
            paddingVertical: Spacing.md,
            color: theme.text,
            fontSize: Typography.body.fontSize,
            minHeight: multiline ? numberOfLines! * 24 : 44,
          },
          !editable && { opacity: 0.6 },
        ]}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}
        onChangeText={onChangeText}
        value={value}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        editable={editable}
      />
      {characterCount && maxLength && (
        <Text
          style={{
            fontSize: Typography.caption.fontSize,
            color: theme.textSecondary,
            marginTop: Spacing.xs,
            textAlign: 'right',
          }}
        >
          {value.length} / {maxLength}
        </Text>
      )}
    </View>
  );
};

interface SelectFieldProps {
  label?: string;
  options: Array<{ id: string; name: string; emoji: string; color: string }>;
  selectedId: string;
  onSelect: (id: string) => void;
  theme: ThemeColors;
  style?: ViewStyle;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  selectedId,
  onSelect,
  theme,
  style,
}) => {
  return (
    <View style={style}>
      {label && (
        <Text
          style={{
            color: theme.text,
            fontSize: Typography.bodySmall.fontSize,
            fontWeight: '600',
            marginBottom: Spacing.sm,
          }}
        >
          {label}
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: Spacing.md,
        }}
      >
        {options.map(option => (
          <TouchableOpacity
            key={option.id}
            onPress={() => onSelect(option.id)}
            style={{
              paddingHorizontal: Spacing.md,
              paddingVertical: Spacing.sm,
              borderRadius: BorderRadius.full,
              flex: 1,
              minWidth: 100,
              backgroundColor:
                selectedId === option.id ? option.color : theme.surface,
              borderColor: option.color,
              borderWidth: 2,
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <Text style={{ marginRight: Spacing.xs }}>{option.emoji}</Text>
            <Text
              style={{
                color: selectedId === option.id ? '#fff' : option.color,
                fontWeight: '600',
                fontSize: Typography.bodySmall.fontSize,
              }}
            >
              {option.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
