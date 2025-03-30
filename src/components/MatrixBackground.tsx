'use client';
import { useEffect, useRef } from 'react';

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Matrix characters - using extended set for hacker look
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~`;@';
    
    // Set up columns
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to track the y position of each column
    const drops: number[] = [];
    
    // Initialize drops at random positions
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    // Animation speed
    const speed = 1;
    let lastTime = 0;

    // Draw the characters
    const draw = (time: number) => {
      if (time - lastTime > 50) {
        // Semi-transparent background to create fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < drops.length; i++) {
          // Random character
          const char = chars[Math.floor(Math.random() * chars.length)];
          
          // Varying green colors for matrix effect
          const green = Math.floor(Math.random() * 155 + 100);
          ctx.fillStyle = `rgba(0, ${green}, 0, 0.8)`;
          
          // Draw the character
          ctx.font = `${fontSize}px monospace`;
          ctx.fillText(char, i * fontSize, drops[i] * fontSize);
          
          // Move the drop down
          drops[i] += speed;
          
          // Reset drop when it reaches bottom or randomly
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
        }
        
        lastTime = time;
      }
      
      requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-20"
    />
  );
} 