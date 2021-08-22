import "./director-view.scss";

import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Row className="director-view">
        <Col className="d-flex" md={12}>
          <div className="director-view_wrapper">
            <h2 className="director-view_name">{director.Name}</h2>
            <p className="director-view_label">
              Bio:
              <span className="director-view_text"> {director.Bio}</span>
            </p>
            <div className="d-flex align-items-center">
              <button
                className="director-view_button"
                onClick={() => {
                  onBackClick(null);
                }}
              >
                Back
              </button>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}