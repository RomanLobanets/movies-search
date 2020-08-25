import React, { Component } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import QueryString from 'query-string';
import FetchApi from '../FetchApi/FetchApi.js';
import { NavLink } from 'react-router-dom';
import styles from './Movies.module.css';
export default class Movies extends Component {
  state = { results: null };
  componentDidMount() {
    const { query } = QueryString.parse(this.props.location.search);

    if (query) {
      FetchApi.getMoviesSearch(query)
        .then(res => res.results)
        .then(res => {
          this.setState({ results: res });
        });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = QueryString.parse(prevProps.location.search);
    const { query: Query } = QueryString.parse(this.props.location.search);
    if (prevQuery !== Query) {
      FetchApi.getMoviesSearch(Query)
        .then(res => res.results)
        .then(res => {
          this.setState({ results: res });
        });
    }
  }
  changeQuery = query => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `query=${query}`,
    });
  };
  render() {
    const { results } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.changeQuery}></SearchForm>
        {results && (
          <ul className={styles.Navigation_list}>
            {results.map(item => (
              <li className={styles.Navigation_item} key={item.id}>
                <NavLink
                  className={styles.Navigation_link}
                  activeClassName={styles.Navigation_link_active}
                  to={{
                    pathname: `movies/${item.id}`,
                    state: { from: this.props.location },
                  }}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}
