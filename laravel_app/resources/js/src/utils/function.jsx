import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { clog } from './index';

export const formatBreadcrumb = (array) => {
  const breadcrumb = [];
  // eslint-disable-next-line no-restricted-syntax,no-plusplus
  for (let i = 0; i < array.length; i++) {
    if (array[i].path && i < array.length - 2) {
      breadcrumb.push({
        // eslint-disable-next-line react/react-in-jsx-scope
        title: <Link to={array[i].path}>{array[i].title}</Link>,
        key: array[i].key,
      });
    } else {
      breadcrumb.push({
        title: array[i].title,
        key: array[i].key,
      });
    }
  }
  return breadcrumb;
};

export const getBreadcrumb = (breadcrumbNameMap) => {
  if (Object.keys(breadcrumbNameMap).length === 0) return [];
  const location = useLocation();
  const pathSnippets = location.search.split('/').filter((i) => i);
  // clog(pathSnippets);
  return pathSnippets.map((_, index) => {
    const url = `${pathSnippets.slice(0, index + 1).join('/')}`;
    let key = url;
    if (url.includes('&id=')) {
      const urlSplit = url.split('&').filter((i) => i);
      // clog(urlSplit);
      for (let i = 0; i < urlSplit.length; i += 1) {
        if (urlSplit[i].includes('id=')) {
          urlSplit[i] = 'id={id}';
        }
      }
      key = urlSplit.join('&');
    }
    return {
      key: url,
      title: <Link to={url}>{breadcrumbNameMap[key]}</Link>,
    };
  });
};

export const generateUrl = (uri) => `/${uri}`;


