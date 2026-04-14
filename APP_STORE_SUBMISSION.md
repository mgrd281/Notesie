# Notesie - App Store Submission Guide

Complete step-by-step guide to submit Notesie to the Apple App Store.

## Prerequisites

### 1. Apple Developer Account
- Cost: $99/year
- Sign up at: https://developer.apple.com/account/
- Keep credentials secure

### 2. Required Software
- Xcode 15.0+ installed
- CocoaPods (usually installed with Xcode)
- EAS CLI: `npm install -g eas-cli`
- Apple ID for App Store Connect

### 3. Machine Setup
- Mac with macOS 12+
- Xcode Command Line Tools: `xcode-select --install`
- At least 50GB free disk space

---

## Step 1: Prepare App Information

### Update App Metadata in app.json

```json
{
  "expo": {
    "name": "Notesie",
    "slug": "notesie",
    "version": "1.0.0",
    "description": "A beautiful, fast, and simple note-taking app for iPhone.",
    "ios": {
      "bundleIdentifier": "com.yourcompany.notesie",
      "supportsTabletMode": true,
      "build": {
        "number": "1"
      }
    }
  }
}
```

**Important**:
- `bundleIdentifier`: Must be unique and match App Store Connect
- `version`: Semantic versioning (1.0.0, 1.0.1, etc.)
- `build.number`: Increments each build (1, 2, 3, ...)

---

## Step 2: Create App Store Connect Record

1. Go to https://appstoreconnect.apple.com/
2. Click "My Apps"
3. Click "+"
4. Select "New App"
5. Fill in:
   - **Platform**: iOS
   - **App Name**: Notesie
   - **Primary Language**: English
   - **Bundle ID**: com.yourcompany.notesie (from app.json)
   - **SKU**: notesie-001 (unique identifier)
   - **User Access**: Full Access (or limited)
6. Click "Create"

---

## Step 3: Configure App Details

In App Store Connect:

### App Information
- **App Name**: Notesie
- **Subtitle**: Notes Made Simple (optional)
- **Description** (160 chars max):
  ```
  A beautiful, fast, and simple note-taking app for iPhone. 
  Create, organize, and manage your thoughts.
  ```

### Full Description (default language):
```
Notesie is a beautiful, fast, and simple note-taking app for iPhone.

KEY FEATURES:
• Create and edit notes with ease
• Organize notes with categories (Personal, Work, Ideas)
• Pin important notes for quick access
• Search notes by title or content
• Dark mode support
• All notes stored locally on your device

DESIGN:
Notesie features a clean, minimal interface inspired by Apple Notes. 
Soft, warm colors create a pleasant writing experience.

PRIVACY:
All your notes are stored locally on your device. 
No data is sent to external servers.

PERFECT FOR:
• Personal journals
• Work notes and ideas
• Task planning
• Quick brainstorming
• Keeping daily thoughts

Download Notesie today and simplify your note-taking!
```

### Keywords
```
notes, note-taking, productivity, organize, journal, ideas, task management, reminders, writing, personal journal, notebook
```

### Support URL
```
https://yourwebsite.com/notesie/support
(or create a simple landing page)
```

### Privacy Policy URL
```
https://yourwebsite.com/notesie/privacy
```

### Contact Information
- Email: your-email@example.com
- Phone: (if you want support calls)

---

## Step 4: Add Screenshots

Screenshots should showcase your app's best features.

### Size Requirements
- iPhone 6.7": 1284 × 2778 pixels
- iPhone 5.5": 1242 × 2208 pixels
- iPhone 4.7": 1125 × 2436 pixels

### Screenshot Set (5+ recommended)

1. **Home Screen**
   - Show list of notes with sample data
   - Display pinned notes at top
   - Show recent notes below

2. **Creating a Note**
   - Empty note creation screen
   - Title field visible
   - Category selector shown

3. **Dark Mode**
   - Home screen in dark mode
   - Shows app aesthetic

4. **Categories View**
   - Display Personal, Work, and Ideas
   - Show note count per category

5. **Settings Screen**
   - Show dark mode toggle
   - App information displayed

### Taking Screenshots

**Using iOS Simulator:**
```bash
# Run app on simulator
npm run ios

# Take screenshot
xcrun simctl io booted screenshot screenshot1.png

# Or use Xcode: Device > Screenshot
```

**Tips:**
- Use sample notes with real-looking content
- Keep text readable at small sizes
- Show dark mode contrasts clearly
- Highlight key features

### Add Text Overlays to Screenshots
Use Figma or Canva to add text overlays:
- "Create Notes"
- "Organize with Categories"
- "Dark Mode Support"
- "All Notes Saved Locally"

---

## Step 5: Set Up Pricing & Availability

In App Store Connect:

### Pricing
- Select "Free" (or choose paid tier)
- Set pricing for other regions (optional)

### Availability
- Select all countries you want to distribute
- Set future availability if needed

### Age Rating
Complete questionnaire:
- Notesie is a note-taking app with no objectionable content
- No violence, profanity, etc.
- Select "4+" or "12+" (typically "4+")

---

## Step 6: Prepare for Build

### Update Version Numbers
Before each build, increment:

```json
{
  "version": "1.0.0",  // Update to 1.0.1, 1.1.0, etc.
  "ios": {
    "build": {
      "number": "1"    // Increment: 1, 2, 3, ...
    }
  }
}
```

### Clean Up Code
- Remove `console.log` statements (or use error logging service)
- Remove debug TODOs
- Verify no hardcoded test data
- Test app thoroughly

---

## Step 7: Build with EAS

### Initialize EAS
```bash
eas build:configure
```

### Build for App Store
```bash
eas build --platform ios --type app-store
```

This will:
1. Run type checking
2. Create provisioning profiles (one-time)
3. Generate production certificate
4. Build app and upload to App Store Connect
5. Provide build link

The build takes 15-30 minutes.

### Monitor Build
- Follow link provided in terminal
- Or check: https://expo.dev/accounts/<your-username>/projects/notesie

---

## Step 8: Submit Build to Review

### In App Store Connect:

1. Go to your app
2. Click "TestFlight" (optional: beta testing first)
   - Add testers
   - Distribute test build
   - Get feedback before public release

3. Or go to "Build" tab
4. Select your build
5. Click "Submit for Review"
6. Answer questionnaire:
   - Does your app...
   - Any restrictions?
   - Content rights?
   - Advertising?
   - IDFA?

7. Click "Submit"

---

## Step 9: App Review

### Apple Review Process
- Usually 24-48 hours
- Check email for status

### Common Rejection Reasons
- ❌ Crashes on launch → Test thoroughly
- ❌ UI doesn't follow iOS guidelines → Review HIG
- ❌ Privacy issues → Ensure local storage only
- ❌ Misleading information → Check description
- ❌ Poor performance → Optimize code

### If Rejected
- Read rejection reason carefully
- Fix the issue
- Increment build number
- Rebuild with `eas build --platform ios --type app-store`
- Resubmit

### If Approved
- Choose release date
- Select "Release This Version"
- App goes live on App Store

---

## Step 10: Launch & Monitor

### Post-Launch
1. App appears in App Store search (24-48 hours)
2. Monitor reviews and ratings
3. Fix any reported issues
4. Plan future updates

### Analytics
- Check App Store Connect analytics
- Monitor crashes and hangs
- Track usage metrics

### Updates
To submit an update:
1. Increment version: 1.0.1, 1.1.0, etc.
2. Update changelog
3. Rebuild with EAS
4. Resubmit for review

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and try again
eas build --platform ios --type app-store --clear-cache

# Check logs
npm run ios  # Test locally first
```

### Provisioning Profile Issues
```bash
# Recreate profiles
eas build --platform ios --clear-cache --clean
```

### App Rejected
1. Read rejection email carefully
2. Don't argue - Apple's decision is final
3. Fix the issue
4. Try again with changes documented

### Bundle ID Conflict
Ensure bundle ID is globally unique. Add your name/company:
- ✓ `com.yourcompany.notesie`
- ✗ `com.notesie.app` (too generic)

---

## Helpful Resources

- [Apple App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [EAS Build Documentation](https://docs.expo.dev/build/)
- [App Store Connect Help](https://help.apple.com/app-store-connect/)

---

## Version Update Checklist

For each update:

- [ ] Increment version in app.json
- [ ] Increment build number
- [ ] Test on iOS Simulator thoroughly
- [ ] Test on physical device
- [ ] Check TypeScript for errors
- [ ] Update changelog in App Store Connect
- [ ] Update app description if needed
- [ ] Create new screenshots if UI changed
- [ ] Build with EAS
- [ ] Submit for review
- [ ] Monitor review process
- [ ] Plan next features

---

## Quick Reference: Bundle IDs

Your app can only have ONE bundle ID. Choose wisely:

**Good Examples:**
- `com.mackrobertson.notesie`
- `com.yourcompany.notesie`
- `io.github.username.notesie`

**Avoid:**
- Generic names: `com.notes.app`
- Similar to other apps
- Names with special characters
- Names starting with numbers

---

## Support

For help:
- EAS Documentation: https://docs.expo.dev/
- Expo Forums: https://forums.expo.dev/
- Apple Support: https://developer.apple.com/support/

---

**You're ready to launch Notesie on the App Store! Good luck! 🚀**
