import PropTypes from "prop-types";
import styles from "./Button.module.css";
import React, { Component } from "react";
class Button extends Component {
  componentDidMount() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }
  render() {
    return (
      <button
        type="button"
        className={styles.Button}
        onClick={this.props.onFetchImages}
      >
        Load more
      </button>
    );
  }
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Button;
