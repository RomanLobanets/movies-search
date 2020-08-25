import React, { Suspense, lazy } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import styles from './App.module.css';
import Loader from '../Loader';

const Home = lazy(() => import('../Home/Home'));
const Movies = lazy(() => import('../Movies/Movies'));
const ShowDetails = lazy(() => import('../ShowDetails/ShowDetails'));
const App = () => (
  <>
    <ul className={styles.Navigation_list}>
      <li className={styles.Navigation_item}>
        <NavLink
          className={styles.Navigation_link}
          activeClassName={styles.Navigation_link_active}
          exact
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={styles.Navigation_link}
          activeClassName={styles.Navigation_link_active}
          to="/movies"
        >
          Movies
        </NavLink>
      </li>
    </ul>
    <Suspense fallback={<Loader></Loader>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/movies" component={Movies} />
        <Route path="/movies/:moviesId" component={ShowDetails} />
      </Switch>
    </Suspense>
  </>
);
export default App;
