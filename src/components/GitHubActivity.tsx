'use client';
import { useState, useEffect } from 'react';
import { FiGithub, FiCode, FiClock, FiFolder } from 'react-icons/fi';
import { fetchGitHubActivity, GitHubCommit, getFormattedDate } from '@/services/github';

interface GitHubActivityProps {
  username: string;
  limit?: number;
}

export default function GitHubActivity({ username, limit = 5 }: GitHubActivityProps) {
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCommits = async () => {
      try {
        setLoading(true);
        const data = await fetchGitHubActivity(username, limit);
        setCommits(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch GitHub activity');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCommits();
  }, [username, limit]);

  if (loading) {
    return (
      <div className="py-2">
        <div className="flex items-center gap-2 mb-2">
          <FiGithub className="text-green-400" />
          <p className="terminal-header font-bold">Loading GitHub activity...</p>
        </div>
        <div className="terminal-box animate-pulse">
          <div className="h-4 bg-green-800/20 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-green-800/20 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error || commits.length === 0) {
    return (
      <div className="py-2">
        <div className="flex items-center gap-2 mb-2">
          <FiGithub className="text-red-400" />
          <p className="terminal-error font-bold">
            {error || `No GitHub activity found for ${username}`}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-2">
      <div className="flex items-center gap-2 mb-3">
        <FiGithub className="text-green-400" />
        <p className="terminal-header font-bold">Recent GitHub Activity</p>
      </div>
      
      <div className="space-y-3">
        {commits.map((commit, index) => (
          <div key={commit.sha} className="terminal-box">
            <div className="flex justify-between mb-1">
              <div className="flex items-center gap-1">
                <FiFolder className="text-blue-400" />
                <span className="text-blue-400">{commit.repository?.name}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <FiClock />
                <span>{getFormattedDate(commit.commit.author.date)}</span>
              </div>
            </div>
            
            <p className="mb-1 text-sm break-words">
              {commit.commit.message.length > 80
                ? commit.commit.message.substring(0, 80) + '...'
                : commit.commit.message}
            </p>
            
            <div className="flex justify-between items-center text-xs mt-2">
              <div className="flex items-center gap-1">
                <FiCode className="text-green-400" />
                <span className="text-gray-400">
                  {commit.sha.substring(0, 7)}
                </span>
              </div>
              <a 
                href={commit.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="terminal-highlight text-xs hover:underline"
              >
                View commit
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 