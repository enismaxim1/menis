import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { articles } from '../data/articles';  // Import the articles data

const Writing = () => {
  const location = useLocation();
  const isWritingPage = location.pathname === '/writing';
  const displayedArticles = isWritingPage ? articles : articles.slice(0, 2);

  return (
    <div className="page writing-page">
      <h1>Writing</h1>
      <div className="articles-list">
        {displayedArticles.map((article) => (
          <Link 
            key={article.id} 
            to={`/writing/${article.slug}`}
            className="article-preview"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{article.title}</h2>
            <span className="article-date">
              {new Date(article.date).toLocaleDateString('en-US', { 
                month: 'long',
                year: 'numeric'
              })}
            </span>
            <p>{article.excerpt || article.content.slice(0, 200)}...</p>
          </Link>
        ))}
      </div>
      {!isWritingPage && (
        <Link to="/writing" className="view-all-articles" onClick={(e) => e.stopPropagation()}>
          View all articles <span className="arrow">→</span>
        </Link>
      )}
    </div>
  );
};

export default Writing;