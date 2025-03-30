'use client';
import { useState, useEffect } from 'react';
import { getSystemInfo, getColoredLogo, SystemInfo } from '@/services/system-info';
import { FiMonitor, FiCpu, FiGlobe, FiClock } from 'react-icons/fi';

export default function NeofetchDisplay() {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);

  useEffect(() => {
    // Get system information on component mount
    setSystemInfo(getSystemInfo());
  }, []);

  if (!systemInfo) {
    return <div className="py-2 terminal-text">Loading system information...</div>;
  }

  const logo = getColoredLogo(systemInfo.os);

  return (
    <div className="py-2">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="terminal-text whitespace-pre font-mono text-xs md:text-sm">
          {logo}
        </div>
        
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2">
            <span className="terminal-highlight font-bold">safwan@portfolio</span>
            <span className="text-gray-400">--------------</span>
          </div>
          
          <div className="grid grid-cols-1 gap-1">
            <div className="flex items-center gap-2">
              <span className="terminal-highlight font-bold mr-1">OS:</span>
              <span>{systemInfo.os}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="terminal-highlight font-bold mr-1">Browser:</span>
              <span>{systemInfo.browser} {systemInfo.browserVersion}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="terminal-highlight font-bold mr-1">Resolution:</span>
              <span>{systemInfo.screenResolution} ({systemInfo.colorDepth})</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="terminal-highlight font-bold mr-1">CPU Threads:</span>
              <span>{systemInfo.cpuThreads}</span>
            </div>
            
            {systemInfo.memoryUsage && (
              <div className="flex items-center gap-2">
                <span className="terminal-highlight font-bold mr-1">Memory:</span>
                <span>{systemInfo.memoryUsage}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <span className="terminal-highlight font-bold mr-1">Language:</span>
              <span>{systemInfo.language}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="terminal-highlight font-bold mr-1">Timezone:</span>
              <span>{systemInfo.timeZone}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="terminal-highlight font-bold mr-1">Device Type:</span>
              <span>{systemInfo.deviceType}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="terminal-highlight font-bold mr-1">Dark Mode:</span>
              <span>{systemInfo.darkMode ? 'Enabled' : 'Disabled'}</span>
            </div>
            
            {systemInfo.uptime && (
              <div className="flex items-center gap-2">
                <span className="terminal-highlight font-bold mr-1">Uptime:</span>
                <span>{systemInfo.uptime}</span>
              </div>
            )}
          </div>
          
          <div className="terminal-box mt-3 text-xs">
            <div className="flex items-center gap-2 mb-1">
              <FiMonitor className="text-green-400" />
              <span className="text-green-400 font-bold">Terminal Portfolio</span>
            </div>
            <p>Powered by Next.js, TypeScript, and Tailwind CSS</p>
            <p className="mt-1">Made with ❤️ by Safwan Adnan</p>
          </div>
        </div>
      </div>
    </div>
  );
} 