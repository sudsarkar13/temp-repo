const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

interface GitHubStats {
  totalCommits: number;
  collaborations: number;
  joinedYear: number;
}

export const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;

export async function getGithubStats(username: string): Promise<GitHubStats> {
  try {
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            totalCommitContributions
            restrictedContributionsCount
          }
          createdAt
          contributionsCollection {
            contributionYears
          }
          repositories(first: 100, privacy: PUBLIC) {
            totalCount
            nodes {
              collaborators {
                totalCount
              }
              isFork
            }
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub data');
    }

    const data = await response.json();
    
    // Get all contribution years
    const years = data.data.user.contributionsCollection.contributionYears;
    let totalCommits = 0;

    // Calculate total collaborations
    const repositories = data.data.user.repositories.nodes;
    const collaborations = repositories.reduce((total: number, repo: any) => {
      if (repo.collaborators && !repo.isFork) {
        return total + repo.collaborators.totalCount;
      }
      return total;
    }, 0);

    // Get joined year
    const joinedYear = new Date(data.data.user.createdAt).getFullYear();

    // Fetch contributions for each year
    for (const year of years) {
      const yearQuery = `
        query($username: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $username) {
            contributionsCollection(from: $from, to: $to) {
              totalCommitContributions
              restrictedContributionsCount
            }
          }
        }
      `;

      const yearResponse = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: yearQuery,
          variables: {
            username,
            from: `${year}-01-01T00:00:00Z`,
            to: `${year}-12-31T23:59:59Z`,
          },
        }),
      });

      const yearData = await yearResponse.json();
      const yearContributions = 
        yearData.data.user.contributionsCollection.totalCommitContributions +
        yearData.data.user.contributionsCollection.restrictedContributionsCount;
      
      totalCommits += yearContributions;
    }

    return {
      totalCommits,
      collaborations,
      joinedYear
    };
  } catch (error) {
    // console.error('Error fetching GitHub stats:', error);
    return {
      totalCommits: 0,
      collaborations: 0,
      joinedYear: new Date().getFullYear()
    };
  }
} 