import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class MovieOverview extends Component {
  state = {
    showDetailsPopup: false,
  };
  render() {
    return (
      <>
        <Card onClick={() => this.openDetailsPopup()}>
          <Card.Img
            style={{ height: "200px", width: "300px" }}
            variant="top"
            src={this.props.movie.Poster}
          />
          <Card.Body>
            <Card.Title>{this.props.movie.Title}</Card.Title>
            <Card.Text>{this.props.movie.Plot}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Cast: {this.props.movie.Actors}</ListGroup.Item>
            <ListGroup.Item>
              Director: {this.props.movie.Director}
            </ListGroup.Item>
            <ListGroup.Item>Genre: {this.props.movie.Genre}</ListGroup.Item>
          </ListGroup>
        </Card>
        {this.state.showDetailsPopup ? (
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
              </Modal.Title>
            </Modal.Header>
          </Modal>
        ) : (
          ""
        )}
      </>
    );
  }
  openDetailsPopup = () => {
    console.log("here");
    this.setState(() => {
      return { showDetailsPopup: true };
    });
  };
}

export default MovieOverview;
