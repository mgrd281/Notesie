#!/bin/bash

# Notesie Development Environment Setup
# This script configures the project for development in Xcode

echo "📱 Notesie - iOS Development Setup"
echo "===================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18.0 or higher."
    exit 1
fi

echo "✅ Node.js found: $(node -v)"
echo ""

# Install npm dependencies
echo "📦 Installing npm dependencies..."
npm install --legacy-peer-deps

if [ $? -ne 0 ]; then
    echo "❌ npm install failed."
    exit 1
fi

echo "✅ npm dependencies installed"
echo ""

# Check if iOS directory exists
if [ ! -d "ios" ]; then
    echo "⚠️  iOS directory not found. Running expo prebuild..."
    npx expo prebuild --platform ios
fi

echo "✅ iOS project ready"
echo ""

# Check for CocoaPods
if [ ! -d "ios/Pods" ]; then
    echo "📦 Installing CocoaPods dependencies..."
    cd ios
    pod install
    cd ..
    echo "✅ CocoaPods installed"
else
    echo "✅ CocoaPods dependencies already installed"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. To open in Xcode: open ios/Notesie.xcworkspace"
echo "2. To run in simulator: npm run ios"
echo "3. To start dev server: npm start"
echo ""
