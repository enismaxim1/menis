interface Article {
    title: string;
    excerpt?: string;
    date: string;
    slug: string;
  }
  
  export const articles: Article[] = [
    // {
    //   title: "Why so bullish on AI agents?",
    //   excerpt: "In NYC it feels like everybody is bullish on AI agents. Go to any AI event, tell any VC the codeword “AI agents”, and they will stare you with reverence...",
    //   date: "2024-08-15",
    //   slug: "why-bullish-agents"
    // },
    {
      title: "Find Your People",
      excerpt: "The greatest work in science, technology, literature, and art has come from communities of people. Historically, breakthrough innovations and artistic revolutions emerged not from isolated genius...",
      date: "2024-08-14",
      slug: "find-your-people"
    },
    {
      title: "Software Engineers are Not Going to Make It",
      date: "2024-11-28",
      excerpt: "We are in the middle of an AI revolution. GitHub Copilot has already been measured to improve the productivity of software engineers by ~25%...",
      slug: "skills-in-post-agi-world"
    },
    {
      title: "The Last Automation",
      date: "2025-01-19",
      excerpt: "In the next year or two, the vast majority of workers in the tech industry will be replaced by AI. The process will be much slower and messier than many at Silicon Valley may expect, due to bottlenecks that have nothing to do with intelligence at all.",
      slug: "the-last-automation"
    }
  ];
  
  export async function getArticleContent(slug: string): Promise<string> {
    try {
        const response = await fetch(`/content/${slug}.txt`);
        if (!response.ok) {
            throw new Error('Article not found');
        }
        return await response.text();
    } catch (error) {
        console.error('Error loading article content:', error);
        throw error;
    }
  }