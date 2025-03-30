'use client';

export interface GitHubCommit {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  repository?: {
    name: string;
  };
}

export const fetchGitHubActivity = async (username: string, limit: number = 5) => {
  try {
    // Fetch user's public events
    const response = await fetch(
      `https://api.github.com/users/${username}/events/public`
    );
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const events = await response.json();
    
    // Filter push events (commits)
    const pushEvents = events.filter(
      (event: any) => event.type === 'PushEvent'
    );
    
    // Extract commit information
    const commits: GitHubCommit[] = [];
    
    for (const event of pushEvents) {
      const repoName = event.repo.name.split('/')[1];
      
      for (const commit of event.payload.commits) {
        if (commits.length >= limit) break;
        
        commits.push({
          sha: commit.sha,
          html_url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
          commit: {
            message: commit.message,
            author: {
              name: event.actor.display_login,
              date: event.created_at
            }
          },
          repository: {
            name: repoName
          }
        });
      }
      
      if (commits.length >= limit) break;
    }
    
    return commits;
  } catch (error) {
    console.error('Error fetching GitHub activity:', error);
    return [];
  }
};

export const getFormattedDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}; 