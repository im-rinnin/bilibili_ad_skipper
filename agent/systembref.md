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
- **Build:** Manual loading in Chrome for development
- **AI Integration:** To be determined (OpenAI API, local model, etc.)

## Key Decisions
- Use Chrome Storage API for secure API key management
- Process subtitles locally when possible for privacy
- Implement proper error handling and user feedback
- Follow modern JS patterns with async/await

## Development Phases
- Phase 1: Foundation Setup (Complete)
- Phase 2: Subtitle Fetching (Next)
- Phase 3: AI Integration
- Phase 4: Ad Detection Logic
- Phase 5: Video Skipping
- Phase 6: User Interface
- Phase 7: Testing & Polish
- Phase 8: Deployment
