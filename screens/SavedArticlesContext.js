import React, { createContext, useState } from 'react';

// Membuat konteks untuk menyimpan artikel
export const SavedArticlesContext = createContext();

export const SavedArticlesProvider = ({ children }) => {
  const [savedArticles, setSavedArticles] = useState([]);

  const addArticle = (article) => {
    setSavedArticles((prev) => [...prev, article]);
  };

  const removeArticle = (articleTitle) => {
    setSavedArticles((prev) =>
      prev.filter((savedArticle) => savedArticle.title !== articleTitle)
    );
  };

  return (
    <SavedArticlesContext.Provider
      value={{ savedArticles, addArticle, removeArticle }}
    >
      {children}
    </SavedArticlesContext.Provider>
  );
};
