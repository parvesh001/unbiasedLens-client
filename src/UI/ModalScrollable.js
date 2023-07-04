import React from "react";
import ReactDOM from "react-dom";
import styles from "./ModalScrollable.module.scss";

const BackdropShadow = ({onClose}) => {
  return <div className={styles["backdrop"]} onClick={onClose}></div>;
};

const ModelContent = ({title, body, onClose}) => {
  return (
    <div className={styles.modalContent}>
      <div className={styles.modalHeader}>
        <h4 className={styles.modalTitle}>{title}</h4>
      </div>
      <div className={styles.modalBody}>{body}</div>
      <div className={styles.modalFooter}>
        <button className="btn btn-primary" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const ModalScrollable = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackdropShadow onClose={props.onClose} />,
        document.getElementById("model-root")
      )}
      {ReactDOM.createPortal(
        <ModelContent {...props}/>,
        document.getElementById("model-root")
      )}
    </React.Fragment>
  );
};
export default ModalScrollable;
