import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import MovieOverview from "./components/Card";
import Button from "react-bootstrap/Button";
import React, { Component } from "react";
const axios = require("axios");

class App extends Component {
  state = {
    movieList: [],
    arr: [],
    formFields: { ids: "", title: "" },
    url: "http://www.omdbapi.com/?apikey=98dfb1e4",
  };
  render() {
    return (
      <div className="App">
        <Container fluid>
          <Row
            style={{ marginTop: "20px" }}
            className="justify-content-md-center mt"
          >
            <Col lg="3">
              <Form.Control
                placeholder="Search movie by IMDB ID"
                value={this.state.formFields.ids}
                onChange={(e) => this.setValueInFields(e.target.value, "id")}
              />
            </Col>
            <Col xs="2">
              <Button variant="primary" size="sm" onClick={this.getMovieById}>
                Search
              </Button>
            </Col>
            <Col lg="3">
              <Form.Control
                placeholder="Search movie by Title"
                value={this.state.formFields.title}
                onChange={(e) => this.setValueInFields(e.target.value, "title")}
              />
            </Col>
            <Col xs="2">
              <Button
                variant="primary"
                size="sm"
                onClick={this.getMovieByTitle}
              >
                Search
              </Button>
            </Col>
          </Row>
          <Row
            className="justify-content-md-center mt"
            style={{ marginTop: "20px" }}
          >
            {this.state.movieList.map((movie) => {
              return (
                <Col lg="4" key={movie.imdbID}>
                  <MovieOverview
                    movie={movie}
                    selected="selected"
                  ></MovieOverview>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    );
  }
  setValueInFields = (value, field) => {
    let obj = {};
    if (field === "title") {
      obj.title = value;
      obj.ids = "";
    } else {
      obj.ids = value;
      obj.title = "";
    }
    this.setState(() => {
      return { formFields: obj };
    });
  };
  emptyMovieList = () => {
    this.setState(() => {
      return { movieList: [], arr: [] };
    });
  };
  getMovieByTitle = () => {
    this.emptyMovieList();
    axios
      .get(this.state.url + "&t=" + this.state.formFields.title)
      .then((response) => {
        this.state.arr.push(response.data);
        this.setState(() => {
          return { movieList: this.state.arr };
        });
      });
  };
  getMovieById = () => {
    this.emptyMovieList();
    const idArr = this.state.formFields.ids.split(",");
    idArr.forEach((element) => {
      axios.get(this.state.url + "&i=" + element.trim()).then((response) => {
        this.state.arr.push(response.data);
        this.setState(() => {
          return { movieList: this.state.arr };
        });
      });
    });
  };
}

export default App;
