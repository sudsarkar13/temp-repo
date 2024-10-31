const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

export async function getGithubCommitCount(username: string): Promise<number> {
  try {
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            totalCommitContributions
            restrictedContributionsCount
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
    const totalCommits = 
      data.data.user.contributionsCollection.totalCommitContributions +
      data.data.user.contributionsCollection.restrictedContributionsCount;

    return totalCommits;
  } catch (error) {
    console.error('Error fetching GitHub commits:', error);
    return 0;
  }
} 