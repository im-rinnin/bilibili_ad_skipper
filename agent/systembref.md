# System Brief: Bilibili Ad Skipper Chrome Extension

## Core Goals
- Develop a Chrome extension that automatically skips ads in Bilibili videos by analyzing subtitles with AI.
- Provide a seamless user experience without manual intervention.

## Architecture
- **Manifest Version:** 3
- **Content Script:** content.js - injected on bilibili.com pages
- **Permissions:** activeTab, storage
- **Main Functionality:** Fetch subtitles, analyze with AI, detect ad segments, skip video accordingly

## Tech Stack
- **Language:** JavaScript (ES6+)
- **Testing:** Jest with jsdom environment
- **Linting:** ESLint
- **Build:** Webpack bundling for production
- **AI Integration:** Google Gemini 2.5 Flash API

## Key Decisions
- Use Chrome Storage API for secure API key management
- Process subtitles locally when possible for privacy
- Implement proper error handling and user feedback
- Follow modern JS patterns with async/await

## Development Phases
- Phase 1: Foundation Setup (Complete)
- Phase 2: Subtitle Fetching (Complete)
- Phase 3: AI Integration (Complete)
- Phase 4: Ad Detection Logic (Complete)
- Phase 5: Video Skipping (Complete)
- Phase 6: User Interface (Basic popup added)
- Phase 7: Testing & Polish (Next)
- Phase 8: Deployment
