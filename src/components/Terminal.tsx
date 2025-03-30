'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import { FiTerminal, FiGithub, FiLinkedin, FiMail, FiDownload, FiVolume2, FiVolumeX, FiInfo, FiFolder, FiFile, FiArrowRight } from 'react-icons/fi';
import { useSounds } from './SoundManager';
import GitHubActivity from './GitHubActivity';
import NeofetchDisplay from './NeofetchDisplay';

type Command = {
  input: string;
  output: React.ReactNode;
};

// Define virtual file system structure
interface FileSystemItem {
  name: string;
  type: 'file' | 'directory';
  content?: string | React.ReactNode;
  color?: string;
}

interface FileSystem {
  [path: string]: FileSystemItem[];
}

// Available commands for tab completion
const AVAILABLE_COMMANDS = [
  'help', 'about', 'skills', 'projects', 'contact', 'clear', 'exit', 
  'resume', 'sound', 'github', 'neofetch', 'ls', 'cd', 'cat'
];

export default function Terminal() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [input, setInput] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDirectory, setCurrentDirectory] = useState('/');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { playSound, isMuted, toggleMute } = useSounds();

  // Define the virtual file system
  const fileSystem: FileSystem = {
    '/': [
      { name: 'about', type: 'directory', color: 'text-blue-400' },
      { name: 'projects', type: 'directory', color: 'text-blue-400' },
      { name: 'skills', type: 'directory', color: 'text-blue-400' },
      { name: 'contact', type: 'directory', color: 'text-blue-400' },
      { name: 'README.md', type: 'file', color: 'text-green-400' },
    ],
    '/about': [
      { name: 'bio.txt', type: 'file', color: 'text-green-400' },
      { name: 'experience.txt', type: 'file', color: 'text-green-400' },
      { name: 'education.txt', type: 'file', color: 'text-green-400' },
    ],
    '/projects': [
      { name: 'project-alpha', type: 'directory', color: 'text-blue-400' },
      { name: 'data-visualizer', type: 'directory', color: 'text-blue-400' },
      { name: 'mobile-app', type: 'directory', color: 'text-blue-400' },
    ],
    '/skills': [
      { name: 'frontend.txt', type: 'file', color: 'text-green-400' },
      { name: 'backend.txt', type: 'file', color: 'text-green-400' },
      { name: 'other.txt', type: 'file', color: 'text-green-400' },
    ],
    '/contact': [
      { name: 'email.txt', type: 'file', color: 'text-green-400' },
      { name: 'social.txt', type: 'file', color: 'text-green-400' },
    ],
    '/projects/project-alpha': [
      { name: 'description.txt', type: 'file', color: 'text-green-400' },
      { name: 'tech-stack.txt', type: 'file', color: 'text-green-400' },
      { name: 'demo-link.url', type: 'file', color: 'text-yellow-400' },
    ],
    '/projects/data-visualizer': [
      { name: 'description.txt', type: 'file', color: 'text-green-400' },
      { name: 'tech-stack.txt', type: 'file', color: 'text-green-400' },
      { name: 'demo-link.url', type: 'file', color: 'text-yellow-400' },
    ],
    '/projects/mobile-app': [
      { name: 'description.txt', type: 'file', color: 'text-green-400' },
      { name: 'tech-stack.txt', type: 'file', color: 'text-green-400' },
      { name: 'demo-link.url', type: 'file', color: 'text-yellow-400' },
    ],
  };

  // Define file contents
  const fileContents: Record<string, React.ReactNode> = {
    '/README.md': (
      <div className="space-y-2">
        <p className="font-bold terminal-header text-lg">Welcome to my Terminal Portfolio</p>
        <p>This is an interactive terminal-style portfolio showcasing my skills and projects.</p>
        <p className="mt-2">Navigate using the following commands:</p>
        <ul className="list-disc pl-5">
          <li>Type <span className="terminal-highlight">ls</span> to list files and directories</li>
          <li>Type <span className="terminal-highlight">cd &lt;directory&gt;</span> to change directories</li>
          <li>Type <span className="terminal-highlight">cat &lt;file&gt;</span> to view file contents</li>
          <li>Type <span className="terminal-highlight">help</span> for more commands</li>
        </ul>
      </div>
    ),
    '/about/bio.txt': (
      <div>
        <p className="mb-2">I am a Computer Science student and a passionate Software Developer specializing in modern web applications.</p>
        <p>My journey in tech started with a fascination for problem-solving and has evolved into building solutions that make a difference.</p>
      </div>
    ),
    '/about/experience.txt': (
      <div className="space-y-3">
        <div>
          <p className="terminal-header font-bold">Senior Developer | Tech Innovations Inc.</p>
          <p className="text-sm text-gray-400">2022 - Present</p>
          <ul className="list-disc pl-5 mt-1">
            <li>Led development of a major web application with 50,000+ monthly users</li>
            <li>Implemented CI/CD pipelines reducing deployment time by 70%</li>
            <li>Mentored junior developers and conducted code reviews</li>
          </ul>
        </div>
        <div>
          <p className="terminal-header font-bold">Full Stack Developer | Digital Solutions LLC</p>
          <p className="text-sm text-gray-400">2019 - 2022</p>
          <ul className="list-disc pl-5 mt-1">
            <li>Developed and maintained multiple client web applications</li>
            <li>Created RESTful APIs and microservices</li>
            <li>Optimized database queries increasing performance by 40%</li>
          </ul>
        </div>
      </div>
    ),
    '/about/education.txt': (
      <div>
        <p className="terminal-header font-bold">Bachelor of Science in Computer Science</p>
        <p className="text-sm text-gray-400">University of Technology | 2015 - 2019</p>
        <p className="mt-2">Relevant coursework:</p>
        <ul className="list-disc pl-5">
          <li>Data Structures and Algorithms</li>
          <li>Database Systems</li>
          <li>Web Development</li>
          <li>Software Engineering</li>
        </ul>
      </div>
    ),
    '/skills/frontend.txt': (
      <div>
        <p className="terminal-header font-bold mb-2">Frontend Skills</p>
        <ul className="list-disc pl-5">
          <li>React.js / Next.js</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
          <li>Framer Motion</li>
          <li>Redux</li>
          <li>HTML5/CSS3</li>
          <li>Responsive Design</li>
        </ul>
      </div>
    ),
    '/skills/backend.txt': (
      <div>
        <p className="terminal-header font-bold mb-2">Backend Skills</p>
        <ul className="list-disc pl-5">
          <li>Node.js</li>
          <li>Express</li>
          <li>MongoDB</li>
          <li>PostgreSQL</li>
          <li>GraphQL</li>
          <li>REST API Design</li>
          <li>Authentication/Authorization</li>
        </ul>
      </div>
    ),
    '/skills/other.txt': (
      <div>
        <p className="terminal-header font-bold mb-2">Other Technical Skills</p>
        <ul className="list-disc pl-5">
          <li>Git/GitHub</li>
          <li>Docker</li>
          <li>AWS</li>
          <li>CI/CD</li>
          <li>Testing (Jest, Cypress)</li>
          <li>Agile Methodologies</li>
          <li>Technical Writing</li>
        </ul>
      </div>
    ),
    '/contact/email.txt': (
      <div className="flex items-center gap-2">
        <FiMail className="text-lg" />
        <span>safwan.adnan@example.com</span>
      </div>
    ),
    '/contact/social.txt': (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <FiGithub className="text-lg" />
          <a href="https://github.com/safwanadnan" target="_blank" rel="noopener noreferrer" className="terminal-highlight">github.com/safwanadnan</a>
        </div>
        <div className="flex items-center gap-2">
          <FiLinkedin className="text-lg" />
          <a href="https://linkedin.com/in/safwanadnan" target="_blank" rel="noopener noreferrer" className="terminal-highlight">linkedin.com/in/safwanadnan</a>
        </div>
      </div>
    ),
    '/projects/project-alpha/description.txt': (
      <div>
        <p className="terminal-header font-bold">Project Alpha</p>
        <p className="mt-2">A full-stack web application with real-time features for collaborative work.</p>
        <p className="mt-2">This application allows teams to work together on projects in real-time, with features like document editing, task management, and instant messaging.</p>
      </div>
    ),
    '/projects/project-alpha/tech-stack.txt': (
      <div>
        <p className="terminal-header font-bold mb-2">Technology Stack:</p>
        <ul className="list-disc pl-5">
          <li>React.js (Frontend)</li>
          <li>Node.js (Backend)</li>
          <li>Socket.io (Real-time communication)</li>
          <li>MongoDB (Database)</li>
          <li>AWS (Hosting)</li>
        </ul>
      </div>
    ),
    '/projects/project-alpha/demo-link.url': (
      <div className="flex items-center gap-2">
        <span>Demo URL:</span> 
        <a href="https://project-alpha-demo.example.com" target="_blank" rel="noopener noreferrer" className="terminal-highlight">https://project-alpha-demo.example.com</a>
      </div>
    ),
    '/projects/data-visualizer/description.txt': (
      <div>
        <p className="terminal-header font-bold">Data Visualizer</p>
        <p className="mt-2">Interactive dashboard for data visualization and analysis.</p>
        <p className="mt-2">This tool transforms complex data into intuitive visualizations, helping users derive insights and make data-driven decisions.</p>
      </div>
    ),
    '/projects/data-visualizer/tech-stack.txt': (
      <div>
        <p className="terminal-header font-bold mb-2">Technology Stack:</p>
        <ul className="list-disc pl-5">
          <li>D3.js (Visualizations)</li>
          <li>React.js (Frontend)</li>
          <li>Express (Backend)</li>
          <li>PostgreSQL (Database)</li>
        </ul>
      </div>
    ),
    '/projects/data-visualizer/demo-link.url': (
      <div className="flex items-center gap-2">
        <span>Demo URL:</span> 
        <a href="https://data-viz-demo.example.com" target="_blank" rel="noopener noreferrer" className="terminal-highlight">https://data-viz-demo.example.com</a>
      </div>
    ),
    '/projects/mobile-app/description.txt': (
      <div>
        <p className="terminal-header font-bold">Mobile Companion App</p>
        <p className="mt-2">Cross-platform mobile application for productivity and organization.</p>
        <p className="mt-2">This app helps users manage their daily tasks, set reminders, and track their progress toward goals.</p>
      </div>
    ),
    '/projects/mobile-app/tech-stack.txt': (
      <div>
        <p className="terminal-header font-bold mb-2">Technology Stack:</p>
        <ul className="list-disc pl-5">
          <li>React Native (Mobile Framework)</li>
          <li>Firebase (Backend-as-a-Service)</li>
          <li>Redux (State Management)</li>
          <li>Jest (Testing)</li>
        </ul>
      </div>
    ),
    '/projects/mobile-app/demo-link.url': (
      <div className="flex items-center gap-2">
        <span>Demo URL:</span> 
        <a href="https://mobile-app-demo.example.com" target="_blank" rel="noopener noreferrer" className="terminal-highlight">https://mobile-app-demo.example.com</a>
      </div>
    )
  };

  const [text] = useTypewriter({
    words: [
      'Hello, World! I am Safwan Adnan.',
      'Computer Science Student.',
      'Software Developer.',
      'Type "help" to get started...',
    ],
    loop: 1,
    typeSpeed: 70,
    deleteSpeed: 40,
  });

  // Blink cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 600);
    
    return () => clearInterval(interval);
  }, []);

  // Focus input when clicking anywhere in terminal
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    // Reset history index when typing
    setHistoryIndex(-1);
  };

  // Handle tab completion
  const handleTabCompletion = () => {
    if (input.trim() === '') return;
    
    const matchingCommands = AVAILABLE_COMMANDS.filter(cmd => 
      cmd.startsWith(input.toLowerCase().trim())
    );
    
    if (matchingCommands.length === 1) {
      // If exactly one match, complete the command
      setInput(matchingCommands[0]);
      playSound('keystroke');
    } else if (matchingCommands.length > 1) {
      // If multiple matches, show suggestions
      const output = (
        <div className="py-1">
          <p className="terminal-text">Tab completion options:</p>
          <div className="pl-4 flex flex-wrap gap-x-4">
            {matchingCommands.map((cmd, index) => (
              <span key={index} className="terminal-highlight">{cmd}</span>
            ))}
          </div>
        </div>
      );
      setCommands([...commands, { input: input, output }]);
      playSound('execution');
    }
  };

  // Handle resume download
  const handleResumeDownload = () => {
    // Create a download link element
    const link = document.createElement('a');
    link.href = '/files/resume.pdf';
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Play success sound
    playSound('success');
  };

  const processCommand = (cmd: string) => {
    if (!cmd.trim()) return;
    
    const commandLower = cmd.toLowerCase().trim();
    const commandParts = commandLower.split(' ');
    const mainCommand = commandParts[0];
    const args = commandParts.slice(1);
    
    // Add command to history if it's not empty and not the same as the last command
    if (cmd.trim() !== '' && 
        (commandHistory.length === 0 || commandHistory[0] !== cmd)) {
      setCommandHistory([cmd, ...commandHistory]);
    }
    
    // Reset history index
    setHistoryIndex(-1);
    
    let output: React.ReactNode;
    
    // Play command execution sound
    playSound('execution');
    
    switch (mainCommand) {
      case 'help':
        output = (
          <div className="py-2">
            <p className="terminal-header font-bold">Available commands:</p>
            <ul className="pl-4">
              <li><span className="terminal-highlight">about</span> - Learn more about me</li>
              <li><span className="terminal-highlight">skills</span> - View my technical skills</li>
              <li><span className="terminal-highlight">projects</span> - Check out my projects</li>
              <li><span className="terminal-highlight">contact</span> - Get my contact information</li>
              <li><span className="terminal-highlight">github</span> - Display my recent GitHub activity</li>
              <li><span className="terminal-highlight">neofetch</span> - Display system information</li>
              <li><span className="terminal-highlight">resume</span> - Download my resume</li>
              <li><span className="terminal-highlight">ls</span> - List contents of the current directory</li>
              <li><span className="terminal-highlight">cd</span> - Change directory</li>
              <li><span className="terminal-highlight">cat</span> - View file contents</li>
              <li><span className="terminal-highlight">sound</span> - Toggle terminal sounds</li>
              <li><span className="terminal-highlight">clear</span> - Clear the terminal</li>
              <li><span className="terminal-highlight">exit</span> - Close the terminal (reloads page)</li>
            </ul>
          </div>
        );
        break;
      
      case 'about':
        output = (
          <div className="py-2">
            <h3 className="terminal-header font-bold text-lg">About Me</h3>
            <p className="my-2">
              I am a Computer Science student and a passionate Software Developer. 
              I specialize in creating modern web applications with clean and efficient code.
            </p>
            <p>
              My journey in tech started with a fascination for problem-solving and has evolved 
              into building solutions that make a difference.
            </p>
          </div>
        );
        break;
      
      case 'skills':
        output = (
          <div className="py-2">
            <h3 className="terminal-header font-bold text-lg">Technical Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              <div className="terminal-box">
                <p className="font-bold">Frontend</p>
                <ul className="pl-4 list-disc">
                  <li>React.js</li>
                  <li>Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
              <div className="terminal-box">
                <p className="font-bold">Backend</p>
                <ul className="pl-4 list-disc">
                  <li>Node.js</li>
                  <li>Express</li>
                  <li>MongoDB</li>
                  <li>PostgreSQL</li>
                </ul>
              </div>
              <div className="terminal-box">
                <p className="font-bold">Other</p>
                <ul className="pl-4 list-disc">
                  <li>Git/GitHub</li>
                  <li>Docker</li>
                  <li>AWS</li>
                  <li>CI/CD</li>
                </ul>
              </div>
            </div>
          </div>
        );
        break;
      
      case 'projects':
        output = (
          <div className="py-2">
            <h3 className="terminal-header font-bold text-lg">Projects</h3>
            <div className="space-y-4 mt-2">
              <div className="terminal-box">
                <h4 className="font-bold">Project Alpha</h4>
                <p className="text-sm opacity-80">A full-stack web application with real-time features</p>
                <p className="mt-1">Technologies: React, Node.js, Socket.io, MongoDB</p>
                <p className="mt-1 terminal-highlight cursor-pointer">github.com/safwanadnan/project-alpha</p>
              </div>
              <div className="terminal-box">
                <h4 className="font-bold">Data Visualizer</h4>
                <p className="text-sm opacity-80">Interactive dashboard for data visualization</p>
                <p className="mt-1">Technologies: D3.js, React, Express, PostgreSQL</p>
                <p className="mt-1 terminal-highlight cursor-pointer">github.com/safwanadnan/data-viz</p>
              </div>
              <div className="terminal-box">
                <h4 className="font-bold">Mobile Companion App</h4>
                <p className="text-sm opacity-80">Cross-platform mobile application</p>
                <p className="mt-1">Technologies: React Native, Firebase, Redux</p>
                <p className="mt-1 terminal-highlight cursor-pointer">github.com/safwanadnan/mobile-app</p>
              </div>
            </div>
          </div>
        );
        break;
      
      case 'contact':
        output = (
          <div className="py-2">
            <h3 className="terminal-header font-bold text-lg">Contact Information</h3>
            <div className="flex flex-col space-y-2 mt-2">
              <div className="flex items-center gap-2">
                <FiMail className="text-lg" />
                <span>safwan.adnan@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FiGithub className="text-lg" />
                <a href="https://github.com/safwanadnan" target="_blank" rel="noopener noreferrer" className="terminal-highlight">github.com/safwanadnan</a>
              </div>
              <div className="flex items-center gap-2">
                <FiLinkedin className="text-lg" />
                <a href="https://linkedin.com/in/safwanadnan" target="_blank" rel="noopener noreferrer" className="terminal-highlight">linkedin.com/in/safwanadnan</a>
              </div>
            </div>
          </div>
        );
        break;
      
      case 'resume':
        handleResumeDownload();
        output = (
          <div className="py-2">
            <p className="flex items-center gap-2">
              <FiDownload className="text-green-400" />
              <span className="terminal-text">Downloading resume...</span>
            </p>
            <p className="mt-2 text-sm">
              Resume has been downloaded to your computer.
            </p>
          </div>
        );
        break;
      
      case 'sound':
      case 'sounds':
      case 'mute':
      case 'unmute':
        toggleMute();
        output = (
          <div className="py-2">
            <p className="flex items-center gap-2">
              {isMuted ? (
                <>
                  <FiVolumeX className="text-yellow-400" />
                  <span>Sound effects are now disabled.</span>
                </>
              ) : (
                <>
                  <FiVolume2 className="text-green-400" />
                  <span>Sound effects are now enabled.</span>
                </>
              )}
            </p>
          </div>
        );
        break;
      
      case 'clear':
        setCommands([]);
        return;
      
      case 'exit':
        output = (
          <p className="terminal-warning">Closing terminal session...</p>
        );
        playSound('error');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        break;
      
      case 'ls':
        const path = args.length > 0 ? args[0] : currentDirectory;
        const normalizedPath = path.startsWith('/') ? path : `${currentDirectory}${currentDirectory === '/' ? '' : '/'}${path}`;
        
        if (fileSystem[normalizedPath]) {
          const items = fileSystem[normalizedPath];
          output = (
            <div className="py-2">
              <div className="terminal-header mb-2">
                <span className="font-bold">Directory contents of:</span> {normalizedPath}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {item.type === 'directory' ? (
                      <FiFolder className="text-blue-400" />
                    ) : (
                      <FiFile className={item.color || 'text-green-400'} />
                    )}
                    <span className={item.color || (item.type === 'directory' ? 'text-blue-400' : 'text-green-400')}>
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        } else {
          output = (
            <p className="terminal-error">Directory not found: {normalizedPath}</p>
          );
          playSound('error');
        }
        break;
      
      case 'cd':
        if (args.length === 0) {
          // cd without args goes to root
          setCurrentDirectory('/');
          output = <p className="terminal-text">Changed directory to: /</p>;
        } else {
          const target = args[0];
          let newPath = '';
          
          // Handle special cases
          if (target === '..') {
            // Go up one directory
            if (currentDirectory === '/') {
              // Already at root
              output = <p className="terminal-text">Already at root directory.</p>;
              break;
            }
            
            // Remove the last directory from the path
            const pathParts = currentDirectory.split('/').filter(Boolean);
            pathParts.pop();
            newPath = pathParts.length === 0 ? '/' : '/' + pathParts.join('/');
          } else if (target === '.') {
            // Current directory, do nothing
            newPath = currentDirectory;
          } else if (target === '~' || target === '/') {
            // Go to root
            newPath = '/';
          } else if (target.startsWith('/')) {
            // Absolute path
            newPath = target;
          } else {
            // Relative path
            newPath = `${currentDirectory === '/' ? '' : currentDirectory}/${target}`;
          }
          
          // Normalize path (remove double slashes, etc.)
          newPath = newPath.replace(/\/+/g, '/');
          if (!newPath.startsWith('/')) newPath = '/' + newPath;
          if (newPath !== '/' && newPath.endsWith('/')) newPath = newPath.slice(0, -1);
          
          // Check if path exists
          if (fileSystem[newPath]) {
            // Check if target is a directory
            const isDirectory = fileSystem[newPath].some(item => 
              item.type === 'directory' || item.type === 'file'
            );
            
            if (isDirectory) {
              setCurrentDirectory(newPath);
              output = <p className="terminal-text">Changed directory to: {newPath}</p>;
            } else {
              output = <p className="terminal-error">Not a directory: {newPath}</p>;
              playSound('error');
            }
          } else {
            output = <p className="terminal-error">Directory not found: {newPath}</p>;
            playSound('error');
          }
        }
        break;
      
      case 'cat':
        if (args.length === 0) {
          output = <p className="terminal-error">Usage: cat &lt;filename&gt;</p>;
          playSound('error');
        } else {
          const filename = args[0];
          let filePath = '';
          
          // Handle absolute or relative path
          if (filename.startsWith('/')) {
            filePath = filename;
          } else {
            filePath = `${currentDirectory === '/' ? '' : currentDirectory}/${filename}`;
          }
          
          // Normalize path
          filePath = filePath.replace(/\/+/g, '/');
          
          if (fileContents[filePath]) {
            output = (
              <div className="py-2 terminal-box">
                <div className="flex items-center gap-2 mb-2 pb-1 border-b border-green-500/30">
                  <FiFile className="text-green-400" />
                  <span className="text-green-400 font-bold">{filePath}</span>
                </div>
                <div>{fileContents[filePath]}</div>
              </div>
            );
          } else {
            // Check if it's a valid path but not a readable file
            const directory = filePath.substring(0, filePath.lastIndexOf('/')) || '/';
            const basename = filePath.split('/').pop() || '';
            
            if (fileSystem[directory] && fileSystem[directory].find(item => item.name === basename)) {
              // File exists but might be a directory
              const item = fileSystem[directory].find(item => item.name === basename);
              if (item && item.type === 'directory') {
                output = <p className="terminal-error">{filePath} is a directory, not a file</p>;
              } else {
                output = <p className="terminal-error">Cannot read file: {filePath}</p>;
              }
            } else {
              // File doesn't exist
              output = <p className="terminal-error">File not found: {filePath}</p>;
            }
            
            playSound('error');
          }
        }
        break;
      
      case 'github':
        output = <GitHubActivity username="safwanadnan" limit={5} />;
        break;
      
      case 'neofetch':
        output = <NeofetchDisplay />;
        break;
      
      case '':
        output = null;
        break;
      
      default:
        playSound('error');
        output = (
          <p className="terminal-error">Command not found: {cmd}. Type 'help' for available commands.</p>
        );
    }
    
    setCommands([...commands, { input: cmd, output }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Play keystroke sound for all keypresses
    if (e.key !== 'Tab' && e.key !== 'Enter' && !e.ctrlKey && !e.altKey && !e.metaKey) {
      playSound('keystroke');
    }
    
    if (e.key === 'Enter') {
      processCommand(input);
    } 
    else if (e.key === 'Tab') {
      e.preventDefault(); // Prevent focus change
      handleTabCompletion();
    }
    else if (e.key === 'ArrowUp') {
      e.preventDefault(); // Prevent cursor from moving to start
      
      // Navigate up through command history
      if (commandHistory.length > 0) {
        // If we're not already navigating, start at the beginning
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    }
    else if (e.key === 'ArrowDown') {
      e.preventDefault(); // Prevent cursor from moving to end
      
      // Navigate down through command history
      if (historyIndex > 0) {
        // Move one step down in history
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        // If at the most recent command, clear input
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-black border border-green-500 rounded-lg overflow-hidden shadow-lg shadow-green-500/20">
        <div className="flex items-center justify-between bg-black px-4 py-2 border-b border-green-500/50">
          <div className="flex items-center gap-2">
            <FiTerminal className="text-green-500" />
            <h2 className="text-green-500 font-bold">safwan@portfolio:{currentDirectory}</h2>
          </div>
          <button 
            onClick={toggleMute} 
            className="text-green-500 hover:text-green-400 transition-colors"
            aria-label={isMuted ? "Unmute terminal sounds" : "Mute terminal sounds"}
          >
            {isMuted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
          </button>
        </div>
        <div 
          ref={terminalRef}
          onClick={() => inputRef.current?.focus()}
          className="bg-black p-4 h-[70vh] overflow-y-auto font-mono text-sm md:text-base cursor-text terminal-container"
        >
          {/* Welcome message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <pre className="text-green-400 text-xs sm:text-sm lg:text-base whitespace-pre-wrap">
{`
  _____       __                       _____    _             
 / ____|     / _|                     |  __ \\  | |            
| (___   __ _| |___      ____ _ _ __  | |__) |_| |_ ___       
 \\___ \\ / _\` |  _\\ \\ /\\ / / _\` | '_ \\ |  ___/ _| __/ _ \\      
 ____) | (_| | |  \\ V  V / (_| | | | || |  | | | || (_) |_ _ _
|_____/ \\__,_|_|   \\_/\\_/ \\__,_|_| |_||_|  |_|_|\\__\\___(_|_|_)
                                                              
`}
            </pre>
            <p className="text-green-400 mt-2">{text}<Cursor cursorStyle="_" /></p>
            <p className="text-gray-400 mt-1 text-xs">Type 'help' to see available commands.</p>
            <p className="text-gray-400 text-xs">Use UP/DOWN arrows to navigate command history and TAB for autocompletion.</p>
          </motion.div>
          
          {/* Previous commands */}
          {commands.map((cmd, index) => (
            <div key={index} className="mb-2">
              <div className="command-line">
                <span className="command-prompt">$</span>
                <span className="command-text">{cmd.input}</span>
              </div>
              {cmd.output && <div className="pl-4 mt-1">{cmd.output}</div>}
            </div>
          ))}
          
          {/* Current input with terminal-style cursor */}
          <div className="command-line">
            <span className="command-prompt">$</span>
            <div className="flex items-center">
              <div className="relative inline-flex items-center">
                <span className="command-text">{input}</span>
                <span 
                  className={`terminal-cursor ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
                ></span>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="terminal-input"
                autoFocus
                aria-label="Terminal input"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 