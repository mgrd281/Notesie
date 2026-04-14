# Notesie - Premium Mobile Note-Taking App

A beautiful, simple, and fast note-taking app for iOS built with React Native and Expo. Designed with premium aesthetics and production-ready code.

## Features

✨ **Core Features**
- 📝 Create, edit, and delete notes
- 📌 Pin/unpin important notes for quick access
- 🔍 Search notes by title or content
- 📂 Organize notes with categories (Personal, Work, Ideas)
- 🏷️ Categorize notes with emoji and color-coded tags
- 🌙 Dark mode support with system preference detection
- 📱 Beautiful iOS-first UI with smooth animations
- 💾 Persistent local storage - offline-first app

## Design

**Premium Modern UI**
- Clean, minimal design inspired by Apple Notes and Notion
- Soft, warm color palette (cream, soft yellow, gold)
- Smooth animations and transitions
- Professional typography hierarchy
- Rounded cards with subtle shadows
- Bottom tab navigation
- Floating action button for quick note creation

**Dark Mode**
- Automatic dark mode support
- Warm colors adapted for dark theme
- Preference saved locally

## Architecture

```
Notesie/
├── assets/                 # App icons, splash screen
├── src/
│   ├── app/               # Navigation and root component
│   │   ├── index.tsx      # Main App component
│   │   └── RootNavigator.tsx # Navigation structure
│   ├── screens/           # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── AddEditNoteScreen.tsx
│   │   ├── CategoriesScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── components/        # Reusable UI components
│   │   ├── Layout.tsx
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── NoteCard.tsx
│   ├── hooks/            # Custom React hooks
│   │   └── useNotes.ts
│   ├── storage/          # AsyncStorage service
│   │   └── StorageService.ts
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   ├── constants/        # App constants and theme
│   │   └── theme.ts
│   └── utils/            # Utility functions
│       └── noteHelpers.ts
├── index.js              # Entry point
├── app.json              # Expo configuration
├── tsconfig.json         # TypeScript configuration
├── babel.config.js       # Babel configuration
└── package.json          # Dependencies
```

## Tech Stack

- **Framework**: React Native 0.74.1
- **CLI**: Expo 51.0.0
- **Language**: TypeScript
- **Navigation**: Expo Router + React Navigation
- **Storage**: AsyncStorage (built-in)
- **Date Formatting**: date-fns
- **Unique IDs**: uuid
- **State Management**: React Hooks

## Installation & Setup

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Xcode (for iOS development)
- iOS Simulator (included with Xcode)

### Steps

1. **Install dependencies**
   ```bash
   cd /Users/m/Desktop/Notesie
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Run on iOS Simulator**
   ```bash
   npm run ios
   ```
   Or press `i` in the Expo CLI terminal.

4. **Run on Android (if needed)**
   ```bash
   npm run android
   ```

## Development Workflow

### Hot Reload
Changes to the code are immediately reflected in the app without rebuilding. Edit and save any file, and the app updates automatically.

### Run on Physical Device
1. Install Expo Go app from App Store
2. Run `npm start`
3. Scan QR code with your device

### TypeScript Checking
The project uses TypeScript for type safety. Enable checking in your IDE for better DX.

## Building for iOS App Store

### 1. Install EAS CLI
```bash
npm install -g eas-cli
```

### 2. Configure EAS
```bash
eas build:configure
```

### 3. Update app.json
Update the bundle identifier and version:
```json
{
  "ios": {
    "bundleIdentifier": "com.yourcompany.notesie",
    "build": {
      "number": "1"
    }
  }
}
```

### 4. Create App Store Connect Account
- Go to https://appstoreconnect.apple.com
- Create a new app with bundle ID `com.yourcompany.notesie`

### 5. Build the App
```bash
eas build --platform ios
```

This creates a production build and stores it on Expo servers.

### 6. Submit to App Store
```bash
eas submit --platform ios
```

Follow the prompts to upload to App Store Connect.

### 7. Review in App Store Connect
- Review the build
- Add app information (description, keywords, etc.)
- Add screenshots
- Set pricing
- Submit for review

## App Store Optimization

### App Icon
- Save your icon to `assets/icon.png` (1024x1024 px)
- Notesie uses a minimalist design with soft colors

### Splash Screen
- Save splash image to `assets/splash.png` (1284x2778 px)
- Background color: `#FFFBF5` (Cream)

### Screenshots
Use the app on iOS simulator and take screenshots:
```bash
xcrun simctl io booted screenshot ~/Desktop/screenshot1.png
```

Create marketing screenshots showing:
1. Home screen with sample notes
2. Creating a note
3. Categories view
4. Dark mode
5. Settings

### App Description Example
```
Notesie is a beautiful, fast, and simple note-taking app for iPhone. 
Create, organize, and manage your thoughts with ease.

Features:
• Create and edit notes with categories
• Pin important notes for quick access
• Search notes by content
• Organize with Personal, Work, and Ideas folders
• Dark mode support
• All notes stored locally on your device

Download Notesie today and simplify your note-taking!
```

### Keywords
`notes, note-taking, productivity, organize, journal, ideas, tasks, reminders`

## Configuration

### Bundle Identifier
Currently set to: `com.notesie.app`

To change:
1. Update in `app.json` under `ios.bundleIdentifier`
2. Will need to recreate provisioning profiles in App Store Connect

### Version Update
In `app.json`:
- `version`: Semantic version (e.g., 1.0.0)
- `ios.build.number`: Build number (e.g., 1, 2, 3...)

## Data & Privacy

- All notes are stored locally on the device using AsyncStorage
- No data is sent to external servers
- Users can clear all data in Settings
- Complies with Apple privacy guidelines

## Customization

### Colors
Edit `src/constants/theme.ts` to adjust colors:
```typescript
export const Colors = {
  cream: '#FFFBF5',
  softYellow: '#FFF8DC',
  warmGold: '#F5DEB3',
  darkGray: '#2D2D2D',
  // ... more colors
};
```

### Typography
Modify font sizes and weights in `src/constants/theme.ts`:
```typescript
export const Typography = {
  h1: { fontSize: 32, fontWeight: '700' },
  // ... more styles
};
```

### Default Categories
Add or modify default categories in `src/storage/StorageService.ts`:
```typescript
const DefaultCategories = [
  { id: 'personal', name: 'Personal', color: '#FF6B6B', emoji: '👤' },
  // ... more categories
];
```

## Troubleshooting

### Build Issues
- Clear cache: `expo start --clear`
- Delete node_modules: `rm -rf node_modules && npm install`
- Update Expo: `npm install -g expo-cli@latest`

### iOS Simulator Issues
- Restart simulator: `xcrun simctl erase all`
- Reinstall app: Press `i` in Expo CLI

### Dark Mode Not Working
- Ensure device has dark mode enabled in Settings
- Toggle in app Settings screen

### Notes Not Saving
- Check AsyncStorage permissions in app.json
- Clear app cache and restart

## Performance Tips

- Notes are sorted by last updated date (most recent first)
- Pinned notes appear at the top
- Search is optimized with string matching
- All operations use local storage (fast)

## Code Quality

- TypeScript for type safety
- ESLint-ready structure
- Modular component architecture
- Custom hooks for state management
- Proper error handling

## Future Enhancements

- 📤 Cloud sync (iCloud/Firebase)
- 📸 Note attachments (images)
- 🔐 Biometric authentication
- 🎨 Custom themes
- 📊 Note statistics
- 🔗 Note sharing
- 🗣️ Voice notes
- 🔔 Reminders

## Support

For issues or feedback, please reach out at:
- Email: feedback@notesie.app (update with actual email)
- In-app Settings: Send Feedback

## License

© 2024 Notesie. All rights reserved.

---

**Ready to submit to App Store?** Follow the build instructions above!
