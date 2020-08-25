import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import FetchApi from '../FetchApi/FetchApi.js';
import styles from './Home.module.css';
export default class Home extends Component {
  state = {
    movies: [],
  };
  componentDidMount() {
    FetchApi.getMovies().then(results => this.setState({ movies: results }));
  }

  render() {
    return (
      <ul className={styles.Navigation_list}>
        <h2>Trending today</h2>
        {this.state.movies.length > 0 &&
          this.state.movies.map(item => (
            <li className={styles.Navigation_item} key={item.id}>
              <NavLink
                className={styles.Navigation_link}
                activeClassName={styles.Navigation_link_active}
                exact
                to={{
                  pathname: `movies/${item.id}`,
                  state: { from: this.props.location },
                }}
              >
                {item.name || item.original_title}
              </NavLink>
            </li>
          ))}
      </ul>
    );
  }
}
