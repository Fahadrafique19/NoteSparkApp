# **Note-Spark-App**

Note Spark is a simple and modern note-taking app built with React Native. It lets you create, edit, and delete notes with offline storage. Supports light, dark, and system themes, plus a clean UI with quick access via a floating action button. Perfect for students and professionals.

**Features**

Create, edit, and delete notes
Offline storage (SQLite/AsyncStorage)
Dark mode, Light mode, and System theme support
Simple login screen (demo login)
Floating Action Button for quick note creation
Settings screen to switch theme preference
Delete confirmation and clean UI actions

**Tech Stack**

React Native (UI development)
React Navigation (stack navigation & routing)
React Native Paper (UI components)
AsyncStorage / SQLite (local storage)

**Screens**

Login Screen – Demo login with email & password
Home Screen – Displays all notes with edit & delete actions
Note Editor – Add or update notes with a save button
Settings Screen – Toggle between Light, Dark, and System themes

**Prerequisites**

Make sure you have the React Native CLI environment set up:
Node.js (LTS recommended) and npm or Yarn
Java JDK 17 (for Android)
Android Studio with SDK + an emulator, or a real Android device with USB debugging enabled
Xcode (macOS only) for iOS + CocoaPods (sudo gem install cocoapods)


**Quick Start (both platforms)
**
Clone or download this repository, then open a terminal in the project folder.

cd Note-Spark-App
**Install dependencies**
npm install
# or
yarn install

(macOS/iOS only) Install iOS pods
cd ios
pod install
cd ..

**Run on Android**
Ensure an Android emulator is running (from Android Studio) or connect a real Android device with USB debugging enabled.

Option A – One command (starts Metro automatically):
npx react-native run-android

Option B – Separate Metro + build (useful for logs):

# Terminal 1 (Metro bundler)
npx react-native start

# Terminal 2 (build & install app)
npx react-native run-android

Run on iOS (macOS only)
Ensure Xcode command-line tools are installed and you’ve run pod install in the ios/ folder.

Option A – One command (Simulator):

npx react-native run-ios
Option B – Open in Xcode:

Then you can run:
npm run android
npm run ios
npm run start
npm run pods

That’s it— npm install, then npx react-native run-android or npx react-native run-ios and you’re rolling.
