'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiTerminal } from 'react-icons/fi';

export default function NotFound() {
  const [countdown, setCountdown] = useState(5);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const glitchText = (text: string) => {
    return (
      <div className="glitch mb-4 text-xl md:text-3xl font-bold terminal-error">
        {text}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-500 p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl text-center terminal-box p-8"
      >
        <FiTerminal className="mx-auto mb-4 text-5xl terminal-error" />
        
        {glitchText("ERROR 404")}
        
        <div className="mb-6 terminal-text">
          <p className="mb-2 text-xl">FILE_NOT_FOUND</p>
          <p className="text-sm md:text-base opacity-80">The requested file does not exist in this directory.</p>
        </div>
        
        <pre className="text-left bg-black/50 p-3 rounded mb-6 text-xs md:text-sm overflow-x-auto">
{`> SYSTEM: Attempting to locate requested resource...
> SYSTEM: Error occurred during file lookup.
> SYSTEM: Security protocol initiated.
> SYSTEM: Redirecting to home directory in ${countdown} seconds...`}
        </pre>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="terminal-box hover:bg-green-500/10 transition-colors py-2 px-4"
          >
            Return to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="terminal-box hover:bg-green-500/10 transition-colors py-2 px-4"
          >
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
} 