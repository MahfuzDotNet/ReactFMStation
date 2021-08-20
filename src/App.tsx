import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import StationCards from './components/StationCards';
import AddStation from './components/AddStation';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class App extends Component<any> {

  render() {

    return (
      <div className="App">
        <>
          <Router>
            <Container fluid>
              <Nav className="col-md-12 d-none d-md-block bg-light sidebar" >
                <Nav.Item>
                  <Nav.Link>
                    <Link to="/stations">FM Stations</Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/addstation">Add Station</Link>
                </Nav.Item>
              </Nav>
              <Row>
                <Col>
                  <Switch>
                    <Route path="/stations" component={StationCards} />
                    <Route path="/addstation" component={AddStation} />
                  </Switch>
                </Col>
              </Row>
            </Container>
          </Router>
        </>
      </div>
    );
  }
}

export default App;
