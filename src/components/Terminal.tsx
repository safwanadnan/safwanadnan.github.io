'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import { FiTerminal, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

type Command = {
  input: string;
  output: React.ReactNode;
};

export default function Terminal() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [input, setInput] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
  };

  const processCommand = (cmd: string) => {
    const commandLower = cmd.toLowerCase().trim();
    
    let output: React.ReactNode;
    
    switch (commandLower) {
      case 'help':
        output = (
          <div className="py-2">
            <p className="terminal-header font-bold">Available commands:</p>
            <ul className="pl-4">
              <li><span className="terminal-highlight">about</span> - Learn more about me</li>
              <li><span className="terminal-highlight">skills</span> - View my technical skills</li>
              <li><span className="terminal-highlight">projects</span> - Check out my projects</li>
              <li><span className="terminal-highlight">contact</span> - Get my contact information</li>
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
      
      case 'clear':
        setCommands([]);
        return;
      
      case 'exit':
        output = (
          <p className="terminal-warning">Closing terminal session...</p>
        );
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        break;
      
      case '':
        output = null;
        break;
      
      default:
        output = (
          <p className="terminal-error">Command not found: {cmd}. Type 'help' for available commands.</p>
        );
    }
    
    setCommands([...commands, { input: cmd, output }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(input);
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
        <div className="flex items-center gap-2 bg-black px-4 py-2 border-b border-green-500/50">
          <FiTerminal className="text-green-500" />
          <h2 className="text-green-500 font-bold">safwan@portfolio:~</h2>
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