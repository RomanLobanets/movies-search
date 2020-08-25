import React, { Component } from 'react';
import FetchApi from '../FetchApi/FetchApi.js';
import styles from './Reviews.module.css';

export default class Cast extends Component {
  state = {
    results: null,
  };
  componentDidMount() {
    FetchApi.getMoviesReview(this.props.match.params.moviesId)
      .then(res => res.results)
      .then(res => {
        this.setState({ results: res });
      });
  }
  render() {
    const { results } = this.state;
    return (
      <>
        {results && (
          <ul className={styles.rev_wrp}>
            {results.length > 0 ? (
              results.map(item => (
                <li className={styles.rev_item} key={item.id}>
                  <h2 className={styles.rev_autor}>Author: {item.author}</h2>
                  <p className={styles.rev_cont}>
                    Review<br></br> {item.content}
                  </p>
                </li>
              ))
            ) : (
              <div>There are no reviews on this film</div>
            )}
          </ul>
        )}
      </>
    );
  }
}
