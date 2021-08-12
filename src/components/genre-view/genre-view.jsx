import React from "react";
import PropTypes from "prop-types";
import "./genre-view.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Row className="genre-view">
        <Col className="d-flex" md={12}>
          <div className="genre-view_wrapper">
            <h2 className="genre-view_name">{genre.Name}</h2>
            <p className="genre-view_label">
              Bio:
              <span className="genre-view_text"> {genre.Description}</span>
            </p>
            <div className="d-flex align-items-center">
              <button
                className="genre-view_button"
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

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string
  }).isRequired
};

export default GenreView;
