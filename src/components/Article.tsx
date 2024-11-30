import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { articles } from '../data/articles';
import { getArticleContent } from '../data/articles';
import ReactMarkdown from 'react-markdown';

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find(a => a.slug === slug);
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContent() {
      if (!article) return;
      
      try {
        setIsLoading(true);
        const articleContent = await getArticleContent(article.slug);
        setContent(articleContent);
      } catch (err) {
        setError('Failed to load article content');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadContent();
  }, [article]);

  if (!article) {
    return (
      <div className="page">
        <h1>Article Not Found</h1>
        <p>Sorry, the article you're looking for doesn't exist.</p>
        <Link to="/writing">← Back to Writing</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <article className="article-content">
        <h2>{article.title}</h2>
        <span className="article-date">
          {new Date(article.date).toLocaleDateString('en-US', { 
            month: 'long',
            year: 'numeric'
          })}
        </span>
        <div className="article-body">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <ReactMarkdown>
              {content}
            </ReactMarkdown>
          )}
        </div>
        <div className="article-footer">
          <Link to="/writing" className="view-all-articles" onClick={(e) => e.stopPropagation()}>
            Back to Writing <span className="arrow">→</span>
          </Link>
        </div>
      </article>
    </div>
  );
};

export default Article;