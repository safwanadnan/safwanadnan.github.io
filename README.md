# Terminal Portfolio | Interactive Terminal-Themed Developer Portfolio Template

> A fully customizable, interactive terminal-themed portfolio template for developers, built with React, TypeScript, and Tailwind CSS. Features command-line navigation, Matrix background effects, GitHub activity integration, and a virtual file system.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/safwanadnan/safwanadnan.github.io?style=social)](https://github.com/safwanadnan/safwanadnan.github.io/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/safwanadnan.github.io/network)](https://github.com/safwanadnan/safwanadnan.github.io/network/members)
[![GitHub issues](https://img.shields.io/github/issues/safwanadnan/safwanadnan.github.io)](https://github.com/safwanadnan/safwanadnan.github.io/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

![Terminal Portfolio Demo](public\images\image.png)
*Interactive terminal-themed developer portfolio with command-line interface.*

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Commands](#-commands)
- [Installation](#-installation)
- [Customization](#-customization)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [Customization Ideas](#-customization-ideas)
- [Privacy Considerations](#-privacy-considerations)
- [License](#-license)
- [Resources](#-resources)

## 🖥️ Overview

Terminal Portfolio is a modern, interactive portfolio template designed for developers who want to showcase their skills and projects in a unique terminal-themed interface. Perfect for software engineers, web developers, and tech enthusiasts who want their portfolio to stand out from the crowd.

**Key highlights:**
- Command-line interface for navigating portfolio content
- Matrix-style animation background
- Interactive terminal with history and tab completion
- Virtual file system for organizing portfolio content
- System information display (neofetch)
- GitHub activity integration

## 🚀 Features

- **Interactive Terminal Interface:** Fully functional command-line with history, tab completion, and real-time feedback
- **Matrix-Inspired Background:** Eye-catching digital rain animation effect
- **Responsive Design:** Works flawlessly on mobile, tablet, and desktop devices
- **Command Navigation:** Browse portfolio sections using familiar terminal commands
- **GitHub Integration:** Display your real GitHub commit history
- **System Information:** Show visitor's system specs with a Neofetch-style display
- **Virtual File System:** Navigate portfolio content using `ls`, `cd`, and `cat` commands
- **Typewriter Animations:** Engaging text animations for terminal output
- **Sound Effects:** Optional terminal keystroke and command execution sounds
- **Downloadable Resume:** Make your CV/resume available for download

## 🔍 Demo

[View Live Demo](https://safwanadnan.github.io/) | [View GitHub Repository](https://github.com/safwanadnan/safwanadnan.github.io)

## 💻 Commands

Navigate the portfolio using these terminal commands:

| Command | Description |
|---------|-------------|
| `help` | Display available commands |
| `about` | View developer information |
| `skills` | List technical skills |
| `projects` | Browse portfolio projects |
| `contact` | Show contact information |
| `github` | Display GitHub activity |
| `neofetch` | Show system information |
| `ls [directory]` | List files in directory |
| `cd [directory]` | Change directory |
| `cat [file]` | View file contents |
| `resume` | Download resume as PDF |
| `sound` | Toggle sound effects |
| `clear` | Clear terminal |
| `exit` | Reload the page |

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/safwanadnan/safwanadnan.github.io.git terminal-portfolio

# Navigate to project directory
cd terminal-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your terminal portfolio in action.

## 🎨 Customization

Make the terminal portfolio your own with these customization options:

### 1. Personal Information
Edit `src/components/Terminal.tsx` to update:
- ASCII art with your name/username
- Typewriter text introduction
- Contact information
- About section content
- Skills and technologies

### 2. Virtual File System
Modify the `fileSystem` and `fileContents` objects in `src/components/Terminal.tsx` to:
- Structure your portfolio content as directories and files
- Organize projects, skills, and experiences
- Create custom file content and organization

### 3. GitHub Activity
Update the GitHub username in the `GitHubActivity` component to display your own activity:
```jsx
<GitHubActivity username="your-github-username" limit={5} />
```

### 4. Resume
Replace the default resume file with your own:
1. Save your resume as PDF
2. Add it to `/public/files/resume.pdf`
3. Update download links if necessary

### 5. Visual Styling
Customize the appearance:
- Edit terminal colors and styling in CSS files
- Modify the Matrix background in `src/components/DigitalRain.tsx`
- Change fonts, animations, and transitions

### 6. Portfolio Projects
Showcase your work by adding project information to the virtual file system. Example project types:

- **Web Applications:** React, Angular, Vue.js projects
- **Mobile Apps:** iOS, Android, React Native applications
- **APIs/Libraries:** Backend services or utility libraries
- **eCommerce Solutions:** Online stores or marketplace applications
- **Open Source Contributions:** Projects you've contributed to

For each project, include:
- Description and purpose
- Technologies and stack used
- Live demo links
- GitHub repository links
- Screenshots or videos

## 📂 Project Structure

```
terminal-portfolio/
├── public/              # Static files (resume, images)
├── src/
│   ├── app/             # Next.js app router 
│   ├── components/      # React components
│   │   ├── Terminal.tsx # Main terminal component
│   │   ├── GitHubActivity.tsx
│   │   ├── NeofetchDisplay.tsx
│   │   └── SoundManager.tsx
│   ├── services/        # API services
│   └── styles/          # CSS styles
└── README.md
```

## 🤝 Contributing

Contributions to improve Terminal Portfolio are welcome! Here's how to contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit changes: `git commit -m 'Add amazing feature'`
5. Push to your branch: `git push origin feature/amazing-feature`
6. Open a pull request

For detailed contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## 📝 Customization Ideas

Enhance your terminal portfolio with these ideas:

- **Interactive Games:** Add text-based games (Snake, Tetris, Hangman)
- **Theme Switcher:** Create multiple color schemes and themes
- **Additional Animations:** Add more visual effects and transitions
- **API Integrations:** Connect to more external services
- **Multilingual Support:** Translate your portfolio for international visitors
- **Custom ASCII Art:** Create unique terminal art for your brand
- **Terminal Extensions:** Implement pipes, redirects, and advanced shell features
- **Admin Interface:** Add authenticated admin area for content management
- **Blog Section:** Integrate blog posts into the terminal experience
- **Visitor Analytics:** Track and display visitor statistics

## 🔒 Privacy Considerations

The `neofetch` command displays system information from the visitor's browser for demonstration purposes only. No personal data is collected, stored, or transmitted to any external servers. All information is displayed locally in the browser and is not persistent.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📚 Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [GitHub API Documentation](https://docs.github.com/en/rest)
- [ASCII Art Generators](https://patorjk.com/software/taag/)
- [Terminal Emulator Guide](https://www.gnu.org/software/bash/manual/bash.html)

---

<p align="center">
  <a href="https://github.com/safwanadnan/safwanadnan.github.io">
    <img src="https://img.shields.io/github/stars/safwanadnan/safwanadnan.github.io?style=social" alt="GitHub stars">
  </a>
  <a href="https://github.com/safwanadnan/safwanadnan.github.io/network/members">
    <img src="https://img.shields.io/github/forks/safwanadnan/safwanadnan.github.io?style=social" alt="GitHub forks">
  </a>
  <a href="https://github.com/safwanadnan/safwanadnan.github.io/issues">
    <img src="https://img.shields.io/github/issues/safwanadnan/safwanadnan.github.io" alt="GitHub issues">
  </a>
  <a href="https://github.com/safwanadnan/safwanadnan.github.io/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/safwanadnan/safwanadnan.github.io" alt="License">
  </a>
</p>

<p align="center">
  Made with ❤️ by <a href="https://github.com/safwanadnan">Safwan Adnan</a>
</p>

<!-- Keywords for SEO: terminal portfolio, developer portfolio, interactive portfolio, command line portfolio, react portfolio template, terminal themed website, developer resume, coding portfolio, web developer showcase, programmer portfolio, terminal UI, command line interface, matrix background portfolio -->
