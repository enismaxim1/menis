import React, { useState, useEffect } from 'react';
import arxivLogo from '../assets/logos/arxiv.png';
import paperCache from '../data/cached_citations.json';

interface Paper {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  citations?: number;
}

const getCachedData = () => {
  const cached = localStorage.getItem('papersCache');
  return cached ? JSON.parse(cached) : paperCache;
};

const saveCacheData = (data: typeof paperCache) => {
  localStorage.setItem('papersCache', JSON.stringify(data));
};

const Research = () => {
  const [papers, setPapers] = useState<Paper[]>([]);

  // Example arXiv ID
  const arxivIds = ['2404.13813']; // Replace with your paper IDs

  useEffect(() => {
    // Immediately show cached data
    const cachedData = getCachedData();
    if (cachedData.papers.length > 0) {
      setPapers(cachedData.papers);
    }

    // Then fetch fresh data
    const fetchPapers = async () => {
      try {
        const papersData = await Promise.all(
          arxivIds.map(async (id) => {
            // Fetch arXiv data first
            const arxivResponse = await fetch(
              `https://export.arxiv.org/api/query?id_list=${id}`
            );
            const arxivData = await arxivResponse.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(arxivData, 'text/xml');
            console.log("xmlDoc", xmlDoc)

            // Get title from entry tag
            const title = xmlDoc.querySelector('entry > title')?.textContent?.trim() || '';

            // Fetch citation count from Semantic Scholar
            const semanticScholarResponse = await fetch(
              `https://api.semanticscholar.org/v1/paper/arXiv:${id}`
            );
            const semanticScholarData = await semanticScholarResponse.json();
            
            return {
              id,
              title,
              authors: Array.from(xmlDoc.querySelectorAll('author name')).map(
                (author) => author.textContent || ''
              ),
              abstract: xmlDoc.querySelector('summary')?.textContent || '',
              citations: semanticScholarData.numCitedBy,
            };
          })
        );
        setPapers(papersData);

        // Update cache with new data
        const newCache = {
          lastUpdated: new Date().toISOString(),
          papers: papersData
        } as typeof paperCache;
        saveCacheData(newCache);
      } catch (error) {
        console.error('Error fetching papers:', error);
        // No need for fallback here since we already showed cached data
      }
    };

    fetchPapers();
  }, [arxivIds]);

  return (
    <div className="page">
      <h1>Research</h1>
      
      <div className="papers">
        {papers.map((paper) => (
          <a
            key={paper.id}
            href={`https://arxiv.org/abs/${paper.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="article-preview job-entry"
          >
            <div className="job-logo-container">
              <img src={arxivLogo} alt="arXiv logo" className="company-logo" />
            </div>
            <div className="job-content">
              <h3 className="paper-title">{paper.title}</h3>
              <div className="paper-meta">
                by {paper.authors.join(', ')} · {new Date().getFullYear()} · 
                {paper.citations !== undefined && (
                  <span className="citations">Cited by {paper.citations}</span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Research;