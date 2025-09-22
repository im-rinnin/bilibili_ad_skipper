# Bilibili Ad Skipper Chrome Extension - Project Plan

## Project Overview
A Chrome extension that automatically skips ads in Bilibili videos by analyzing subtitles with AI.

**Current Demo:** Extension displays a "hello world" popup in the top right corner when loaded on bilibili.com, demonstrating basic content script injection and DOM manipulation.

## Current Status
- ✅ Basic extension structure (manifest.json)
- ✅ Content script with hello world popup demo
- ✅ Development environment setup (package.json, ESLint, Jest)
- ✅ Git repository initialized
- ✅ Test directory renamed (fixed Chrome extension loading issue)

## Detailed Project Plan

### Phase 1: Foundation Setup (✅ Complete)
**Objective:** Establish development environment and basic structure
- [x] Create manifest.json (v3)
- [x] Set up content script injection
- [x] Add package.json for dependency management
- [x] Configure ESLint for code quality
- [x] Set up basic testing framework (Jest)
- [x] Initialize git repository
- [x] Add hello world popup demo functionality

### Phase 2: Subtitle Fetching
**Objective:** Extract subtitles from Bilibili videos
- [ ] Research Bilibili's subtitle API endpoints
- [ ] Implement subtitle fetching logic
- [ ] Handle different video formats and subtitle availability
- [ ] Add error handling for missing subtitles

### Phase 3: AI Integration
**Objective:** Analyze subtitles to detect advertisements
- [ ] Choose AI service (OpenAI API, local model, or custom service)
- [ ] Implement API key management (Chrome storage)
- [ ] Create prompt engineering for ad detection
- [ ] Process subtitle text in batches to avoid rate limits

### Phase 4: Ad Detection Logic
**Objective:** Identify and timestamp ad segments
- [ ] Parse AI responses for ad timestamps
- [ ] Implement confidence scoring for detection accuracy
- [ ] Handle edge cases (short ads, multiple ads, false positives)
- [ ] Add user override options for manual control

### Phase 5: Video Skipping
**Objective:** Automatically skip detected ad segments
- [ ] Hook into Bilibili's video player API
- [ ] Implement seek functionality for ad skipping
- [ ] Add visual indicators for skipped segments
- [ ] Handle video buffering and loading states

### Phase 6: User Interface
**Objective:** Provide user controls and feedback
- [ ] Add extension popup for settings
- [ ] Create options page for configuration
- [ ] Add toggle to enable/disable auto-skipping
- [ ] Show detection status and statistics

### Phase 7: Testing & Polish
**Objective:** Ensure reliability and user experience
- [ ] Test on various Bilibili video types
- [ ] Add comprehensive error handling
- [ ] Implement logging and debugging features
- [ ] Performance optimization for real-time processing

### Phase 8: Deployment
**Objective:** Prepare for distribution
- [ ] Create user documentation
- [ ] Package for Chrome Web Store submission
- [ ] Add version management and updates
- [ ] Consider open-source release

## Technical Considerations
- **Security:** Never expose API keys in client code
- **Performance:** Process subtitles efficiently to avoid blocking UI
- **Compatibility:** Test across different Bilibili video players
- **Privacy:** Only process subtitle data locally when possible

## Risk Factors
- Bilibili API changes could break functionality
- AI service costs and rate limits
- Video player DOM changes
- Cross-origin restrictions

## Development Guidelines
- Follow the AGENTS.md guidelines for code style and commands
- Test extension loading: Chrome → Extensions → Load unpacked
- Verify functionality on bilibili.com with console logging
- Use modern JavaScript (ES6+) with async/await patterns
- Implement proper error handling and user feedback

## Next Steps
1. ✅ Phase 1 Complete - Development environment ready
2. Begin Phase 2: Research Bilibili subtitle APIs
3. Implement basic subtitle fetching logic
4. Test on sample videos before AI integration
5. Add more UI components and user feedback features