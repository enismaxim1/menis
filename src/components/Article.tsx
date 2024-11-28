import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { articles } from '../data/articles';
import ReactMarkdown from 'react-markdown';

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find(a => a.slug === slug);

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
        <span className="article-date">
          {new Date(article.date).toLocaleDateString('en-US', { 
            month: 'long',
            year: 'numeric'
          })}
        </span>
        <div className="article-body">
          <ReactMarkdown>
            {article.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default Article;