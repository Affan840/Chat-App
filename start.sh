#!/bin/bash
set -e  # stop script if a command fails

echo "🚀 Starting deployment..."

# Move into backend folder
cd backend

echo "📦 Installing dependencies..."
npm install --production

echo "▶️ Starting backend server..."
npm run start
