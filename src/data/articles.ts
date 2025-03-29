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
    // {
    //   title: "Software Engineers are Not Going to Make It",
    //   date: "2024-11-28",
    //   excerpt: "We are in the middle of an AI revolution. GitHub Copilot has already been measured to improve the productivity of software engineers by ~25%...",
    //   slug: "skills-in-post-agi-world"
    // },
    {
      title: "The Last Automation",
      date: "2025-01-19",
      excerpt: "During the Industrial Revolution, we didn't replace horse-drawn carriages by building robot horses - we built cars. Similarly, the strengths of humans and AI are distinct. And when the big labs build AGI, this will still be true. So why are we still trying to build AI that directly substitutes human engineers?",
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