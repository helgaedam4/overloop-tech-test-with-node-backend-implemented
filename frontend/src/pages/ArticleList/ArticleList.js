import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

import { ROUTE_ARTICLE_PREFIX, ROUTE_ARTICLE_CREATE } from '../../constants';
import { listArticles } from '../../services/articles';

function ArticleList() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const data = await listArticles();
            console.log('LIST ARTICLE DATA = ', data)
            setArticles(data);
        };

        fetchArticles();
    }, []);

    const renderArticles = () => articles.map((article) => {
        const { id, title, author } = article;

        return (
          <tr key={id}>
            <td>
              <Link to={`${ROUTE_ARTICLE_PREFIX}/${id}`}>{title}</Link>
            </td>
            <td>
              <Link
                to={`${ROUTE_ARTICLE_PREFIX}/${id}`}
              >{author && `${author.firstName} ${author.lastName}`}</Link>
            </td>
          </tr>
        );
    });

    return (
      <div className="ArticleList">
        <h1>Articles</h1>
        <Link className="d-block mb-3" to={ROUTE_ARTICLE_CREATE}>
          Create a new Article
        </Link>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>{renderArticles()}</tbody>
        </Table>
      </div>
    );
}

export default ArticleList;
