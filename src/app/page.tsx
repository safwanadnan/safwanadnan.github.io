import Terminal from '@/components/Terminal';
import MatrixBackground from '@/components/MatrixBackground';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 bg-black">
      {/* Matrix-style background */}
      <MatrixBackground />
      
      <div className="w-full max-w-5xl flex flex-col items-center justify-center py-8 md:py-12">
        
        <div className="w-full mb-8">
          <Terminal />
        </div>
        
        <footer className="mt-8 text-gray-400 text-xs w-full max-w-4xl mx-auto flex items-center justify-between px-4">
          <div>
            <p>© {new Date().getFullYear()} Safwan Adnan. All rights reserved.</p>
            <p className="mt-1">Built with Next.js, TypeScript, and Tailwind CSS</p>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/safwanadnan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-500 transition-colors"
              aria-label="GitHub"
            >
              <FiGithub size={20} />
            </a>
            <a 
              href="https://linkedin.com/in/safwanadnan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-500 transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={20} />
            </a>
            <a 
              href="mailto:safwan.adnan@example.com" 
              className="text-gray-400 hover:text-green-500 transition-colors"
              aria-label="Email"
            >
              <FiMail size={20} />
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
