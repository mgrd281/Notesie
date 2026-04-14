# Architecture & Data Flow

Visual diagrams of Notesie's architecture, data flow, and component structure.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          iOS App Store                           │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
         ┌───────────────────────────────────┐
         │  Notesie App (React Native)       │
         └───────────────────┬───────────────┘
                             │
        ┌────────────────────┴────────────────────┐
        │                                         │
        ▼                                         ▼
   ┌─────────────┐                         ┌─────────────┐
   │  ReactNative│                         │   Expo      │
   │   UI Layer  │                         │ CLI/Build   │
   └──────┬──────┘                         └─────────────┘
          │
   ┌──────┴──────────────────────────────┐
   │                                      │
   ▼                                      ▼
┌──────────────┐                ┌──────────────────┐
│ Navigation   │                │  Component       │
│ (Screens)    │                │  Library         │
└──────┬───────┘                └──────────────────┘
       │
       │ Uses
       ▼
┌──────────────────────────────────┐
│    Custom Hooks (useNotes)       │
│  - getNotes()                    │
│  - addNote()                     │
│  - updateNote()                  │
│  - deleteNote()                  │
│  - searchNotes()                 │
│  - pinNote()                     │
└──────┬───────────────────────────┘
       │
       │ Uses
       ▼
┌──────────────────────────────────┐
│    StorageService                │
│    (AsyncStorage Wrapper)        │
│  - getNotes()                    │
│  - saveNotes()                   │
│  - getCategories()               │
│  - setDarkMode()                 │
└──────┬───────────────────────────┘
       │
       │ Persists
       ▼
┌──────────────────────────────────┐
│   Device Local Storage           │
│   (AsyncStorage)                 │
│  - @notesie_notes                │
│  - @notesie_categories           │
│  - @notesie_darkmode             │
└──────────────────────────────────┘
```

---

## Navigation Structure

```
        ┌─────────────────────────┐
        │   Root Navigator        │
        │  (Bottom Tab Nav)       │
        └───────┬─────────┬───────┘
                │         │
       ┌────────┘         └────────┐
       │                           │
       ▼                           ▼
   ┌────────────┐             ┌────────────┐
   │ Home Stack │             │ Categories │
   └────┬───────┘             │   Stack    │
        │                     └────┬───────┘
        ├─ HomeScreen             │
        ├─ AddNote Modal      ├─ CategoriesScreen
        └─ EditNote           └─ EditNote
        
       ┌─────────────┐
       │ Settings    │
       │   Stack     │
       └────┬────────┘
            │
            └─ SettingsScreen
```

## Component Hierarchy

```
App (root)
│
├── RootNavigator
│   │
│   ├── HomeStackNavigator
│   │   ├── HomeScreen
│   │   │   ├── Container
│   │   │   ├── SearchBar
│   │   │   ├── SectionHeader
│   │   │   ├── NoteListSection
│   │   │   │   ├── NoteCard (x N)
│   │   │   │   │   ├── Card
│   │   │   │   │   ├── IconButton
│   │   │   │   │   └── Badge
│   │   │   │   └── EmptyState
│   │   │   └── FloatingActionButton
│   │   │
│   │   ├── AddEditNoteScreen
│   │   │   ├── Container
│   │   │   ├── TextInputField (title)
│   │   │   ├── SelectField (category)
│   │   │   ├── TextInputField (content)
│   │   │   ├── PrimaryButton
│   │   │   └── SecondaryButton
│   │   │
│   │   └── EditNoteScreen (same as AddEdit)
│   │
│   ├── CategoriesStackNavigator
│   │   ├── CategoriesScreen
│   │   │   ├── Container
│   │   │   ├── Category Tabs
│   │   │   ├── NoteListSection
│   │   │   └── EmptyState
│   │   │
│   │   └── EditNoteScreen
│   │
│   └── SettingsStackNavigator
│       ├── SettingsScreen
│       │   ├── Container
│       │   ├── SectionHeader
│       │   ├── Switch (dark mode)
│       │   ├── SettingRow (x N)
│       │   ├── PrimaryButton (clear data)
│       │   └── TextButton (send feedback)
│       │
│       └── (No child screens)
│
└── State Management
    ├── useDarkMode() → isDarkMode, toggleDarkMode
    ├── useNotes() → notes, addNote, updateNote, deleteNote, pinNote, searchNotes
    └── useCategories() → categories, addCategory, getCategoryById
```

---

## Data Flow - Create Note

```
User Action (Tap + Button)
        │
        ▼
AddEditNoteScreen
  - title: string
  - content: string
  - selectedCategory: string
        │
        │ User taps "Create Note"
        ▼
handleSave() function
        │
        ├─ Validate input
        │  validateNote(title, content)
        │
        └─ Call hook
           addNote(title, content, categoryId)
                    │
                    ▼
            useNotes Hook
            (custom hook)
                    │
                    │ Calls
                    ▼
            StorageService.addNote()
                    │
                    ├─ Create Note object
                    │  ├─ id: uuid()
                    │  ├─ title
                    │  ├─ content
                    │  ├─ categoryId
                    │  ├─ createdAt: now()
                    │  ├─ updatedAt: now()
                    │  └─ isPinned: false
                    │
                    ├─ Read existing notes
                    │  AsyncStorage.getItem('@notesie_notes')
                    │
                    ├─ Add new note to array
                    │
                    └─ Save back to storage
                       AsyncStorage.setItem('@notesie_notes', ...)
                            │
                            ▼
                    Return new note
                            │
                    ▼
            Hook updates state
            setNotes([...prev, newNote])
                    │
                    ▼
            Component re-renders
            AddEditNoteScreen closes
                    │
                    ▼
            HomeScreen updates
            Shows new note in list
                    │
                    ▼
            User sees new note
```

---

## Data Flow - Search Notes

```
User Action (Type in SearchBar)
        │
        ▼
SearchBar component
        │ onChangeText
        │
        ▼
handleSearch() function
        │
        ├─ Is search empty?
        │  ├─Y→ refreshNotes()
        │  └─N→ searchNotes(query)
        │
        ▼
useNotes.searchNotes(query)
        │
        ├─ Get all notes
        │  StorageService.getNotes()
        │        │
        │        ▼
        │    AsyncStorage.getItem()
        │
        ├─ Filter by query
        │  notes.filter(note =>
        │    note.title.includes(query) ||
        │    note.content.includes(query)
        │  )
        │
        └─ Update state
            setNotes(results)
                    │
                    ▼
            HomeScreen re-renders
            Shows filtered notes
"""

                    ▼
            User sees search results
```

---

## State Management Architecture

```
Global App State
├── isDarkMode (boolean)
│   └─ Toggle in Settings
│   └─ Persist in AsyncStorage
│
└── Notes Data
    ├── notes (Note[])
    │   ├─ Loaded on app start
    │   ├─ Updated on CRUD operations
    │   └─ Persisted after each change
    │
    └── categories (Category[])
        ├─ Loaded on app start
        ├─ Default: Personal, Work, Ideas
        └─ Can add new categories


Hook State Structure:
─────────────────────

useNotes()
├── notes: Note[]
├── isLoading: boolean
├── error: string | null
├── addNote(note) → Promise<Note>
├── updateNote(id, updates) → Promise<Note>
├── deleteNote(id) → Promise<void>
├── pinNote(id, isPinned) → Promise<void>
├── searchNotes(query) → Promise<void>
├── getNotesByCategory(categoryId) → Promise<Note[]>
├── getPinnedNotes() → Note[]
├── getSortedNotes() → Note[]
└── refreshNotes() → Promise<void>


useCategories()
├── categories: Category[]
├── isLoading: boolean
├── error: string | null
├── addCategory(category) → Promise<Category>
├── getCategoryById(id) → Category | undefined
└── loadCategories() → Promise<void>


useDarkMode()
├── isDarkMode: boolean
├── isLoading: boolean
└── toggleDarkMode(isDark) → Promise<void>
```

---

## AsyncStorage Keys

```
@notesie_notes
├─ Type: Note[]
├─ Content:
│  [
│    {
│      id: "uuid",
│      title: "My Note",
│      content: "...",
│      categoryId: "work",
│      createdAt: 1234567890,
│      updatedAt: 1234567890,
│      isPinned: true
│    },
│    { ... }
│  ]
└─ Updated: On any note CRUD operation


@notesie_categories
├─ Type: Category[]
├─ Content:
│  [
│    {
│      id: "personal",
│      name: "Personal",
│      color: "#FF6B6B",
│      emoji: "👤"
│    },
│    { ... }
│  ]
└─ Updated: When categories are modified


@notesie_darkmode
├─ Type: boolean
├─ Content: true or false
└─ Updated: When dark mode is toggled
```

---

## Component Props Flow

```
HomeScreen
├─ isDarkMode: boolean (from parent)
├─ navigation: NativeStackNavigationProp (from RN)
└─ Uses hooks:
   ├─ useNotes() → returns all note functions
   ├─ useCategories() → returns categories array
   └─ These provide data & actions

AddEditNoteScreen
├─ isDarkMode: boolean
├─ navigation: NativeStackNavigationProp
├─ noteId?: string (when editing)
└─ Uses hooks:
   ├─ useNotes() → for addNote, updateNote
   └─ useCategories() → for category selection

SettingsScreen
├─ isDarkMode: boolean
├─ onThemeChange: (isDark: boolean) => void
├─ navigation: NativeStackNavigationProp
└─ Uses hooks:
   └─ useDarkMode() → for toggleDarkMode


Theme Props
theme: ThemeColors
├─ background: string
├─ surface: string
├─ text: string
├─ textSecondary: string
├─ border: string
├─ accent: string
├─ success, warning, error: string
└─ (Color keys passed to every styled component)
```

---

## Performance Considerations

```
Rendering Optimization
├─ FlatList with keys
│  Prevents re-rendering all items on change
├─ useMemo for expensive calculations
│  e.g., getPinnedNotes(), getSortedNotes()
├─ useCallback for event handlers
│  Maintains referential equality
└─ Component memoization (optional)
   For static components, wrap with React.memo


Storage Optimization
├─ Lazy load notes on app start
  └─ Not loaded until user accesses HomeScreen
├─ Efficient search with JavaScript filters
  └─ Fast enough for 1000+ notes
├─ Minimal AsyncStorage reads/writes
  └─ Read once on app start, write on changes
└─ No redundant data copies
  └─ Single source of truth


Memory Optimization
├─ Notes cached in state
  Avoid re-reading storage repeatedly
├─ Event handlers don't create closures
  Use useCallback to maintain identity
├─ Images/assets optimized
  None currently, but important for future
└─ No memory leaks from subscriptions
  All event listeners properly cleaned up
```

---

## Error Handling Flow

```
User Action
    │
    ▼
Try-Catch Block
    │
    ├─ Error occurs
    │  └─ Caught by catch block
    │     └─ Log error
    │     └─ Set error state
    │     └─ Show Alert to user
    │
    └─ No error
       └─ Update state
       └─ Continue with flow


Error Types Handled:
──────────────────

Storage Errors
├─ AsyncStorage read/write failures
└─ Handled: Alert user, fallback to empty list

Validation Errors
├─ Empty note title/content
└─ Handled: Alert "Note cannot be empty"

Navigation Errors
├─ Invalid screen/params
└─ Handled: Graceful fallback navigation

Type Errors
├─ TypeScript catches at compile time
└─ Runtime typeof checks for safety
```

---

## Theme Application Example

```
Theme Selection
    │
    ├─ useDarkMode() hook
    ├─ Returns isDarkMode boolean
    │
    └─ Component logic:
       const theme = isDarkMode ? DarkTheme : LightTheme
    
    DarkTheme object:
    ├─ background: "#2D2D2D"
    ├─ text: "#FFFBF5"
    ├─ surface: "#1F1F1F"
    ├─ accent: "#F5DEB3"
    └─ ... more colors


Application to Component
    │
    ├─ Pass theme prop to component
    │
    └─ Component uses:
       <View style={{ backgroundColor: theme.background }}>
           <Text style={{ color: theme.text }}>
               Hello
           </Text>
       </View>
    
    Result:
    ├─ Light mode: Cream bg, dark text
    └─ Dark mode: Dark bg, light text


Consistency
    │
    └─ All components import theme objects
       from @constants/theme.ts
       Ensures unified look & feel
```

---

## Deployment Architecture

```
Development
├─ npm start
├─ Hot reload enabled
├─ Debug tools active
└─ Local testing


Testing
├─ iOS Simulator
├─ Physical device via Expo Go
├─ Test flight (optional)
└─ Manual QA


Production Build
├─ npm build (or eas build --platform ios)
├─ Code minified
├─ Optimizations applied
├─ Icons & splash screens included
└─ Generates .ipa file


App Store
├─ .ipa uploaded via EAS
├─ Apple review (24-48 hours)
├─ Approval or rejection
├─ If approved → Published to App Store
└─ Available for download
```

---

**This architecture ensures Notesie is scalable, maintainable, and production-ready!**
