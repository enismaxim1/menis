interface Article {
    id: number;
    title: string;
    content: string;
    excerpt?: string;
    date: string;
    slug: string;
  }
  
  export const articles: Article[] = [
    {
      id: 1,
      title: "Understanding React Hooks",
      excerpt: "React Hooks are a powerful feature introduced in React 16.8 that allow you to use state and other React features without writing a class component...",
      content: `
# Understanding React Hooks

React Hooks are a powerful feature introduced in React 16.8 that allow you to use state and other React features without writing a class component.

## Why Hooks?

Hooks solve several problems:
- Reusing stateful logic between components
- Reducing complexity in components
- Avoiding class confusion

## Common Hooks

### useState
\`\`\`jsx
const [state, setState] = useState(initialValue);
\`\`\`

### useEffect
\`\`\`jsx
useEffect(() => {
  // Side effect code
}, [dependencies]);
\`\`\`

A wise man once told me:
> Those who can't, teach.
      `,
      date: "2024-04-20",
      slug: "understanding-react-hooks"
    },
    {
      id: 2,
      title: "Why is it so hard to build with AI?",
      content: "People suck at building with AI",
      date: "2024-03-20",
      slug: "ai-is-overrated"
    },
    {
      id: 3,
      title: "What skills are valuable in a post-AGI world?",
      content: "Assume that AI fully solves all technical problems. Employees at OpenAI, Anthropic, and the entirety of San Francisco think is going to be how our world looks in a matter of years. What skills will be valuable in this world?",
      date: "2024-02-20",
      slug: "skills-in-post-agi-world"
    },
  ];