'use client';

export interface SystemInfo {
  os: string;
  browser: string;
  browserVersion: string;
  screenResolution: string;
  colorDepth: string;
  cpuThreads: number;
  language: string;
  timeZone: string;
  deviceType: string;
  darkMode: boolean;
  memoryUsage?: string;
  uptime?: string;
}

export const getSystemInfo = (): SystemInfo => {
  // Default values
  let info: SystemInfo = {
    os: 'Unknown OS',
    browser: 'Unknown Browser',
    browserVersion: '',
    screenResolution: '0x0',
    colorDepth: '0',
    cpuThreads: navigator.hardwareConcurrency || 1,
    language: navigator.language || 'en-US',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
    deviceType: 'Desktop',
    darkMode: false
  };

  // Detect OS
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf('Win') !== -1) info.os = 'Windows';
  else if (userAgent.indexOf('Mac') !== -1) info.os = 'MacOS';
  else if (userAgent.indexOf('Linux') !== -1) info.os = 'Linux';
  else if (userAgent.indexOf('Android') !== -1) info.os = 'Android';
  else if (userAgent.indexOf('iOS') !== -1 || /iPad|iPhone|iPod/.test(userAgent)) info.os = 'iOS';

  // Detect browser
  if (userAgent.indexOf('Chrome') !== -1 && userAgent.indexOf('Edg') === -1 && userAgent.indexOf('OPR') === -1) {
    info.browser = 'Chrome';
    const match = userAgent.match(/Chrome\/(\d+\.\d+)/);
    if (match) info.browserVersion = match[1];
  } else if (userAgent.indexOf('Firefox') !== -1) {
    info.browser = 'Firefox';
    const match = userAgent.match(/Firefox\/(\d+\.\d+)/);
    if (match) info.browserVersion = match[1];
  } else if (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1) {
    info.browser = 'Safari';
    const match = userAgent.match(/Version\/(\d+\.\d+)/);
    if (match) info.browserVersion = match[1];
  } else if (userAgent.indexOf('Edg') !== -1) {
    info.browser = 'Edge';
    const match = userAgent.match(/Edg\/(\d+\.\d+)/);
    if (match) info.browserVersion = match[1];
  } else if (userAgent.indexOf('OPR') !== -1) {
    info.browser = 'Opera';
    const match = userAgent.match(/OPR\/(\d+\.\d+)/);
    if (match) info.browserVersion = match[1];
  }

  // Screen resolution
  if (typeof window !== 'undefined') {
    info.screenResolution = `${window.screen.width}x${window.screen.height}`;
    info.colorDepth = `${window.screen.colorDepth}-bit`;
    
    // Detect if mobile
    info.deviceType = window.innerWidth <= 768 ? 'Mobile' : 'Desktop';
    
    // Detect dark mode
    info.darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // Try to estimate memory usage (not accurate, just for display)
  try {
    // @ts-ignore - Performance memory is not standard but available in some browsers
    if (performance && performance.memory) {
      // @ts-ignore
      const usedHeap = Math.round(performance.memory.usedJSHeapSize / (1024 * 1024));
      // @ts-ignore
      const totalHeap = Math.round(performance.memory.jsHeapSizeLimit / (1024 * 1024));
      info.memoryUsage = `${usedHeap}MB / ${totalHeap}MB`;
    }
  } catch (e) {
    // Silently fail if memory info is not available
  }

  // Calculate uptime (page load time)
  if (performance && performance.now) {
    const uptimeMs = performance.now();
    const seconds = Math.floor(uptimeMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    info.uptime = hours > 0 
      ? `${hours}h ${minutes % 60}m ${seconds % 60}s`
      : minutes > 0 
        ? `${minutes}m ${seconds % 60}s` 
        : `${seconds}s`;
  }

  return info;
};

export const getColoredLogo = (os: string): string => {
  switch (os) {
    case 'Windows':
      return `
█▀▀▀▀▀▀▀▀▀█  
█  ░▒   ░▒█  Windows
█░▒    ░▒ █  --------
█▒   ░▒   █  
█▄▄▄▄▄▄▄▄▄█  
`;
    case 'MacOS':
      return `
  ▄▄▄▄▄▄▄  
▄█████████▄  MacOS
████████████ ------
████████████
▀██████████▀
  ▀▀▀▀▀▀▀  
`;
    case 'Linux':
      return `
    .-.     
   /   \\    Linux
  |  o  |   -----
   \\___/    
`;
    case 'Android':
      return `
  ╲▁▁▁╱  
 ┌─┐ ┌─┐   Android
 │ └─┘ │   -------
 └─────┘  
`;
    case 'iOS':
      return `
  ▄▄▄▄▄  
 ██   ██   iOS
 ██ ⌂ ██   ---
 ██   ██  
  ▀▀▀▀▀  
`;
    default:
      return `
  ▄▄▄▄▄  
 █     █   System
 █  ▄  █   ------
 █     █  
  ▀▀▀▀▀  
`;
  }
}; 