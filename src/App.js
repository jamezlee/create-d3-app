import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { json } from 'd3';

import ChartWrapper from './ChartWrapper';
const url = "https://udemy-react-d3.firebaseio.com/children.json"

class App extends Component {
  state ={
    data:[]
  }

  componentDidMount(){
    json(url)
    .then(data=>{
      console.log(data)
      this.setState({
        data: data
      })
    })
    .catch(error=>{
      console.log(error)
    })
  }

  renderChart(){
    if(this.state.data.length == 0){
      return "no data"
    }
    return <ChartWrapper data={this.state.data} />
  }
  render() {
    return (
      <div>
        <Navbar bg="light">
          <Navbar.Brand>CreateD3App</Navbar.Brand>
        </Navbar>
        <Container>
          <Row>
            <Col md={6} xs={12}>{this.renderChart()}</Col>
            <Col md={6} xs={12}></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
