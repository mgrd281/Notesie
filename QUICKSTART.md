# Quick Start Guide - Notesie Development

Get Notesie running in 5 minutes.

## 1. Install Dependencies

```bash
cd /Users/m/Desktop/Notesie
npm install
```

## 2. Start Development Server

```bash
npm start
```

You'll see:
```
You can now open Notesie in a browser.
  > Android: Press 'a'
  > iOS: Press 'i'
  > Web: Press 'w'
  > Quit: Press 'q'
```

## 3. Open on iOS Simulator

Press `i` in the terminal, or run:

```bash
npm run ios
```

Xcode will open and build the app. First build takes 2-3 minutes.

## 4. Test the App

When the app opens:
1. View sample notes on home screen
2. Tap a note to read it
3. Tap "+" button to create a new note
4. Go to "Categories" tab to filter notes
5. Go to "Settings" tab to toggle dark mode

## 5. Make Changes & Hot Reload

Edit any TypeScript file and save:
```
✓ Changes appear instantly in the app
✓ No rebuild needed
✓ State is preserved
```

Example: Edit `src/constants/theme.ts` and change a color value.

---

## File Structure Quick Reference

```
src/
├── app/
│   └── index.tsx          ← Main app entry
├── screens/
│   ├── HomeScreen.tsx     ← Notes list
│   ├── AddEditNoteScreen  ← Create/edit
│   ├── CategoriesScreen   ← View by category
│   └── SettingsScreen     ← Settings & dark mode
├── components/
│   ├── Layout.tsx         ← Container, Card, EmptyState
│   ├── Button.tsx         ← Primary, Secondary, Fab buttons
│   ├── Input.tsx          ← Search, TextInput, SelectField
│   └── NoteCard.tsx       ← Single note display
├── hooks/
│   └── useNotes.ts        ← All state management
├── storage/
│   └── StorageService.ts  ← Local storage (AsyncStorage)
├── constants/
│   └── theme.ts           ← Colors, spacing, typography
└── utils/
    └── noteHelpers.ts     ← Date formatting, validation
```

---

## Common Development Tasks

### Add a New Screen

1. Create `src/screens/NewScreen.tsx`:
```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { LightTheme, DarkTheme, Spacing } from '@constants/theme';
import { Container } from '@components/Layout';

interface NewScreenProps {
  isDarkMode: boolean;
}

export const NewScreen: React.FC<NewScreenProps> = ({ isDarkMode }) => {
  const theme = isDarkMode ? DarkTheme : LightTheme;
  
  return (
    <Container theme={theme} padding={Spacing.lg}>
      <Text style={{ color: theme.text }}>New Screen</Text>
    </Container>
  );
};
```

2. Add to `src/app/RootNavigator.tsx`:
```typescript
<Tab.Screen
  name="New"
  component={NewScreen}
  options={{
    tabBarLabel: 'New',
    tabBarIcon: ({ color, size }) => <Icon name="..." />,
  }}
/>
```

### Change Colors

Edit `src/constants/theme.ts`:
```typescript
export const Colors = {
  cream: '#FFFBF5',        // ← Change these
  softYellow: '#FFF8DC',
  warmGold: '#F5DEB3',
  darkGray: '#2D2D2D',
};
```

Then update themes:
```typescript
export const LightTheme: ThemeColors = {
  background: Colors.cream,  // ← Uses the color above
  // ... rest of theme
};
```

### Add a New Category

Edit `src/storage/StorageService.ts`:
```typescript
export const DefaultCategories = [
  { id: 'personal', name: 'Personal', color: '#FF6B6B', emoji: '👤' },
  { id: 'archive', name: 'Archive', color: '#95E1D3', emoji: '📦' }, // ← Add new
];
```

### Debug Storage Data

Add this to any screen temporarily:
```typescript
const debugStorage = async () => {
  const notes = await StorageService.getNotes();
  const categories = await StorageService.getCategories();
  console.log('Notes:', notes);
  console.log('Categories:', categories);
};
```

Then call it:
```typescript
<Button onPress={debugStorage} title="Debug" />
```

---

## Debugging

### View Console Logs

In Expo CLI:
```
Logs appear in the terminal
Press 'j' to open React Native debugger
```

### React Developer Tools

1. Press 'j' in Expo CLI for React debugger
2. Open: http://localhost:19000/debugger-ui
3. Inspect components and props

### Device Logs

For physical device:
```bash
# Watch device logs
expo config --type dotenv 
```

### Error Stack Traces

Errors appear in:
1. Terminal (Expo CLI)
2. On-screen error overlay
3. App crashes show error message

---

## Testing Checklist

Before pushing to GitHub:
- [ ] App starts without errors
- [ ] Can create a note
- [ ] Can edit a note
- [ ] Can delete a note (with confirmation)
- [ ] Can pin/unpin notes
- [ ] Can search notes
- [ ] Categories filter works
- [ ] Dark mode toggle works
- [ ] No console errors
- [ ] No TypeScript errors

Run TypeScript check:
```bash
npx tsc --noEmit
```

---

## Performance Tips

### Slow Home Screen?
- Reduce sample data in `StorageService.ts`
- Use DevTools to profile rendering

### Notes List Stuttering?
- Check if FlatList keys are correct
- Profile with React DevTools

### Storage Slow?
- Avoid storing large data objects
- Consider pagination for large note lists
- Use `useMemo` for expensive operations

---

## Common Issues

### App Won't Start
```bash
# Clear cache
npm start -- --clear

# Reinstall
rm -rf node_modules
npm install
npm start ios
```

### Simulator Crashes
```bash
# Restart simulator
xcrun simctl erase all
npm run ios
```

### Build Errors
```bash
# Update Expo
npm install -g expo-cli@latest

# Clear and rebuild
npm start -- --clear
```

### Dark Mode Not Working
- Check `useDarkMode()` hook
- Verify theme is passed to components
- Toggle in Settings screen

---

## Editor Setup (VS Code)

### Recommended Extensions
- ESLint
- TypeScript Vue Plugin
- Prettier
- React Native Tools

### Settings (`.vscode/settings.json`)
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

---

## Next Steps

1. ✅ Get app running
2. 📝 Create test notes
3. 🎨 Customize colors in theme.ts
4. 📱 Test on physical iPhone (via Expo Go)
5. 🚀 Build for App Store (see APP_STORE_SUBMISSION.md)

---

## Help & Resources

- TypeScript: https://www.typescriptlang.org/docs/
- React Native: https://reactnative.dev/docs/intro
- Expo Docs: https://docs.expo.dev/
- React Navigation: https://reactnavigation.org/

---

**Happy coding! 🚀**
