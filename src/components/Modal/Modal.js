import React, { Component } from "react";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";
const modalRoot = document.querySelector("#modal-root");
class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        this.props.onClose();
      }
    });
  }
  render() {
    return createPortal(
      <div className={styles.Overlay}>
        <div className={styles.Modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
export default Modal;