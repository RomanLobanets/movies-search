import React, { Component } from 'react';
import styles from './SearchForm.module.css';

export default class SearchBar extends Component {
  state = {
    query: '',
  };
  handleChange = event => {
    this.setState({ query: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };
  render() {
    return (
      <header className={styles.search}>
        <form onSubmit={this.handleSubmit} className={styles.searchForm}>
          <button type="submit" className={styles.searchFormBtn}>
            <span className={styles.searchForm_btn_lable}>Search</span>
          </button>

          <input
            value={this.state.query}
            onChange={this.handleChange}
            className={styles.searchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search films"
          />
        </form>
      </header>
    );
  }
}
