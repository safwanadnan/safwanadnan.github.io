'use client';
import { FiDownload } from 'react-icons/fi';
import Link from 'next/link';

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-black rounded-lg overflow-hidden border border-green-500 shadow-lg shadow-green-500/20">
        <div className="p-6 md:p-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-4xl font-bold terminal-text">Safwan Adnan</h1>
            <div className="flex gap-4">
              <Link 
                href="/"
                className="terminal-box py-2 px-3 hover:bg-green-500/10 transition-colors text-sm"
              >
                Back to Terminal
              </Link>
              <a 
                href="/files/resume.pdf" 
                download
                className="flex items-center gap-2 terminal-box py-2 px-3 hover:bg-green-500/10 transition-colors text-sm"
              >
                <FiDownload size={16} />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-bold mb-2 terminal-header">Professional Summary</h2>
              <p className="mb-4">
                Experienced software developer with a strong background in web technologies and 
                a passion for creating elegant, efficient solutions to complex problems.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-2 terminal-header">Technical Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="terminal-box">
                  <h3 className="font-bold mb-2">Frontend</h3>
                  <ul className="list-disc pl-5">
                    <li>React.js / Next.js</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>Framer Motion</li>
                  </ul>
                </div>
                <div className="terminal-box">
                  <h3 className="font-bold mb-2">Backend</h3>
                  <ul className="list-disc pl-5">
                    <li>Node.js</li>
                    <li>Express</li>
                    <li>MongoDB</li>
                    <li>PostgreSQL</li>
                  </ul>
                </div>
                <div className="terminal-box">
                  <h3 className="font-bold mb-2">Other</h3>
                  <ul className="list-disc pl-5">
                    <li>Git / GitHub</li>
                    <li>Docker</li>
                    <li>AWS</li>
                    <li>CI/CD Pipelines</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-2 terminal-header">Work Experience</h2>
              <div className="space-y-4">
                <div className="terminal-box">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-bold">Senior Developer</h3>
                    <p className="text-green-400">2022 - Present</p>
                  </div>
                  <p className="text-gray-400 mb-2">Tech Innovations Inc.</p>
                  <ul className="list-disc pl-5">
                    <li>Led development of a major web application with 50,000+ monthly users</li>
                    <li>Implemented CI/CD pipelines reducing deployment time by 70%</li>
                    <li>Mentored junior developers and conducted code reviews</li>
                  </ul>
                </div>
                
                <div className="terminal-box">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-bold">Full Stack Developer</h3>
                    <p className="text-green-400">2019 - 2022</p>
                  </div>
                  <p className="text-gray-400 mb-2">Digital Solutions LLC</p>
                  <ul className="list-disc pl-5">
                    <li>Developed and maintained multiple client web applications</li>
                    <li>Created RESTful APIs and microservices</li>
                    <li>Optimized database queries increasing performance by 40%</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-2 terminal-header">Education</h2>
              <div className="terminal-box">
                <div className="flex justify-between mb-2">
                  <h3 className="font-bold">Bachelor of Science in Computer Science</h3>
                  <p className="text-green-400">2015 - 2019</p>
                </div>
                <p className="text-gray-400">University of Technology</p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-2 terminal-header">Contact Information</h2>
              <div className="terminal-box">
                <ul className="space-y-2">
                  <li><span className="font-bold">Email:</span> safwanadnan19@gmail.com</li>
                  <li><span className="font-bold">GitHub:</span> github.com/safwanadnan</li>
                  <li><span className="font-bold">LinkedIn:</span> linkedin.com/in/safwanadnan</li>
                  <li><span className="font-bold">Location:</span> San Francisco, CA</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 