import { Route, NavLink } from 'react-router-dom';
import React, { Component, Suspense, lazy } from 'react';

import FetchApi from '../FetchApi/FetchApi.js';
import Loader from '../Loader';

import styles from './ShowDetails.module.css';

const Cast = lazy(() => import('../Cast/Cast'));
const Reviews = lazy(() => import('../Reviews/Reviews'));

export default class ShowDetails extends Component {
  state = {
    movie: null,
    img: 'https://image.tmdb.org/t/p/w500/',
  };
  componentDidMount() {
    FetchApi.getMoviesId(this.props.match.params.moviesId).then(results =>
      this.setState({ movie: results }),
    );
  }
  handleGoBack = () => {
    if (this.props.location.state && this.props.location.state.from) {
      this.props.history.push(this.props.location.state.from);
    }
  };
  render() {
    const { movie, img } = this.state;
    return (
      <>
        <button
          className={styles.btn}
          type="button"
          onClick={this.handleGoBack}
        >
          back
        </button>
        {movie && movie.hasOwnProperty('poster_path') && (
          <div className={styles.details}>
            <div className={styles.wrp}>
              <div className={styles.img_wrp}>
                <img
                  className={styles.img}
                  src={img + movie.poster_path}
                  alt=""
                />
              </div>
              <div className={styles.info_wrp}>
                <h2 className={styles.details_name}>
                  {movie.original_name || movie.original_title}(
                  {movie.first_air_date
                    ? movie.first_air_date.slice(0, 4)
                    : movie.release_date.slice(0, 4)}
                  )
                </h2>
                <p className={styles.details_score}>
                  User score: {Math.floor(movie.popularity)}%
                </p>
                <p className={styles.details_overview}>Overview</p>
                <p className={styles.details_overview_des}>{movie.overview}</p>
                <p className={styles.details_gen}>Genres</p>
                <ul className={styles.details_gen_list}>
                  {movie.genres.map(item => (
                    <li className={styles.details_gen_item} key={item.id}>
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.details_additional}>
              <h2 className={styles.details_additional_title}>
                Additional information
              </h2>
              <ul className={styles.details_additional_list}>
                <li className={styles.details_additional_list_item}>
                  <NavLink
                    className={styles.additional_link}
                    activeClassName={styles.additional_link_active}
                    exact
                    to={{
                      pathname: `/movies/${this.props.match.params.moviesId}/cast`,
                      state: this.props.location.state,
                    }}
                  >
                    Cast
                  </NavLink>
                </li>
                <li className={styles.details_additional_list_item}>
                  <NavLink
                    className={styles.additional_link}
                    activeClassName={styles.additional_link_active}
                    exact
                    to={{
                      pathname: `/movies/${this.props.match.params.moviesId}/review`,
                      state: this.props.location.state,
                    }}
                  >
                    Reviews
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        )}
        <Suspense fallback={<Loader></Loader>}>
          <Route
            exact
            path={`${this.props.match.path}/cast`}
            component={Cast}
          />
          <Route
            exact
            path={`${this.props.match.path}/review`}
            component={Reviews}
          />
        </Suspense>
      </>
    );
  }
}
