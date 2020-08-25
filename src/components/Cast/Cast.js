import React, { Component } from 'react';
import FetchApi from '../FetchApi/FetchApi.js';
import styles from './Cast.module.css';

export default class Cast extends Component {
  state = {
    cast: null,
    img: 'https://image.tmdb.org/t/p/w500',
    imgdefault:
      'http://www.clker.com/cliparts/d/L/P/X/z/i/no-image-icon-md.png',
  };
  componentDidMount() {
    FetchApi.getMoviesCast(this.props.match.params.moviesId)
      .then(res => res.cast)
      .then(results => this.setState({ cast: results }));
  }
  render() {
    const { cast, img, imgdefault } = this.state;
    return (
      <>
        {cast && (
          <div className={styles.cast_wrp}>
            <ul className={styles.cast_list}>
              {cast.length > 0 ? (
                cast.map(item => (
                  <li className={styles.cast_item} key={item.cast_id}>
                    <img
                      className={styles.cast_img}
                      src={
                        item.profile_path ? img + item.profile_path : imgdefault
                      }
                      alt=""
                    />
                    <div>
                      <p className={styles.cast_char}>
                        Character:
                        <span className={styles.cast_info}>
                          {item.character}
                        </span>
                      </p>
                      <p className={styles.cast_name}>
                        Actor:
                        <span className={styles.cast_info}>{item.name}</span>
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <div>There are no reviews on this film</div>
              )}
            </ul>
          </div>
        )}
      </>
    );
  }
}
