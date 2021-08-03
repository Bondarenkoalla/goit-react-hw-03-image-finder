import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Searchbar.module.css";
import { toast } from "react-toastify";
class Searchbar extends Component {
  state = {
    searchPictureName: "",
  };
  onInputChange = (event) => {
    this.setState({
      searchPictureName: event.currentTarget.value.toLowerCase(),
    });
  };
  onFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.searchPictureName.trim() === "") {
      return toast("Введите имя картинки");
    }
    this.props.onSubmit(this.state.searchPictureName);
    this.setState({ searchPictureName: "" });
  };
  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.onFormSubmit}>
          <button type="submit" className={styles.SearchForm_button}>
            <span className={styles.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={styles.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchPictureName}
            onChange={this.onInputChange}
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
