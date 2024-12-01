import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { articles } from '../data/articles';

const Writing = () => {
  const location = useLocation();
  const isWritingPage = location.pathname === '/writing';
  const idArticles = articles.map((article, index) => ({
    ...article,
    id: index + 1
  }));
  const sortedArticles = [...idArticles].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  const displayedArticles = isWritingPage ? sortedArticles : sortedArticles.slice(0, 2);

  return (
    <div className="page writing-page">
      <h2>Writing</h2>
      <div className="articles-list">
        {displayedArticles.map((article) => (
          <Link 
            key={article.id} 
            to={`/writing/${article.slug}`}
            className="article-preview"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{article.title}</h3>
            <span className="article-date">
              {new Date(article.date).toLocaleDateString('en-US', { 
                month: 'long',
                year: 'numeric'
              })}
            </span>
            <p>{article.excerpt || "Click to read more..."}</p>
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