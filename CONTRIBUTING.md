# Contributing to Terminal Portfolio

Thank you for your interest in contributing to the Terminal Portfolio project! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How Can I Contribute?

### Reporting Bugs

Before creating a bug report:
- Check the issue tracker to see if the problem has already been reported
- If you're unable to find an open issue addressing the problem, create a new one

When filing an issue, include as many details as possible:
- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior vs. actual behavior
- Screenshots if applicable
- Your operating system and browser information
- Any other relevant context

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues:
- Use a clear and descriptive title
- Provide a detailed description of the suggested enhancement
- Explain why this enhancement would be useful to most users
- List some other applications where this enhancement exists, if applicable
- Include screenshots or mockups if they help explain your idea

### Pull Requests

1. Fork the repository
2. Create a new branch from `main`: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run the app locally to test your changes
5. Commit your changes with clear messages: `git commit -m 'Add some feature'`
6. Push to your branch: `git push origin feature/your-feature-name`
7. Open a pull request

#### Pull Request Guidelines

- Update documentation if needed
- Follow the existing code style
- Keep your PR focused on a single topic
- Test your changes thoroughly
- Link any related issues in the PR description
- Be open to feedback and be willing to make changes to your PR if requested

## Development Setup

1. Clone your fork of the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Visit `http://localhost:3000` to see your changes

## Project Structure

- `src/components/` - React components
  - `Terminal.tsx` - The main terminal component
  - `GitHubActivity.tsx` - GitHub activity display component
  - `NeofetchDisplay.tsx` - System information display component
  - `SoundManager.tsx` - Sound effects management
- `src/services/` - API and utility services
- `src/styles/` - CSS stylesheets
- `public/` - Static files (images, resume PDF, etc.)

## Feature Ideas

Here are some ideas for features you might want to contribute:

- Additional commands (e.g., mini-games, calculators)
- Alternative themes or color schemes
- Performance optimizations
- Accessibility improvements
- Mobile experience enhancements
- Integration with additional APIs (e.g., LinkedIn, Twitter)
- Custom ASCII art generators
- Internationalization support

## Questions?

If you have any questions about contributing, feel free to open an issue asking for clarification or reach out to the maintainers directly.

Thank you for contributing to make Terminal Portfolio better! 