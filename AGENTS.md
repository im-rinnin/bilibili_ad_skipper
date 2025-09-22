# Agent Guidelines for Bilibili Ad Skipper Chrome Extension

## Project Management
- **Read project plan**: read @PROJECT_PLAN.md and make sure it update
- **Testing**: run test after code change 

## Build/Test Commands
- **Load extension**: Open Chrome → Extensions → Load unpacked → Select project folder
- **Test in browser**: Navigate to bilibili.com and check console for "Bilibili Ad Skipper loaded"
- **No automated tests yet** - suggest adding Jest for unit tests: `npm test`
- **No linter yet** - suggest ESLint: `npm run lint`

## Code Style Guidelines
- **Language**: JavaScript (ES6+)
- **Imports**: Use ES6 import/export syntax
- **Naming**: camelCase for variables/functions, PascalCase for classes
- **Formatting**: 2-space indentation, semicolons required
- **Types**: No TypeScript yet - consider adding for better development experience
- **Error handling**: Use try/catch for async operations, console.error for debugging
- **Comments**: Add JSDoc for functions, TODO comments for incomplete features
- **Security**: Never expose API keys in code, use Chrome storage API for sensitive data
- **Async**: Use async/await for promises, avoid callbacks when possible
- **DOM manipulation**: Use modern APIs, add null checks before accessing elements
