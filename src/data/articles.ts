interface Article {
    id: number;
    title: string;
    excerpt?: string;
    date: string;
    slug: string;
  }
  
  export const articles: Article[] = [
    {
      id: 1,
      title: "Why so bullish on AI agents?",
      excerpt: "In NYC it feels like everybody is bullish on AI agents. Go to any AI event, tell any VC the codeword “AI agents”, and they will stare you with reverence...",
      date: "2024-08-15",
      slug: "why-bullish-agents"
    },
    {
      id: 2,
      title: "Find Your People",
      excerpt: "The greatest work in science, technology, literature, and art has come from communities of people. Historically, breakthrough innovations and artistic revolutions emerged not from isolated genius...",
      date: "2024-08-14",
      slug: "find-your-people"
    },
    {
      id: 3,
      title: "Software Engineers are Not Going to Make It",
      date: "2024-11-28",
      excerpt: "We are in the middle of an AI revolution. GitHub Copilot has already been measured to improve the productivity of software engineers by ~25%...",
      slug: "skills-in-post-agi-world"
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