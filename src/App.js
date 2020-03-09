import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { json } from 'd3';
import Table from './Table.js'
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
      this.setState({data:data})
      console.log(this.state.data)
    })
    .catch(error=>{
      console.log(error)
    })
  }
  updateData = (data) =>{
    this.setState({
      data:data
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
            <Col md={12} xs={12}>{this.renderChart()}</Col>
            <Col md={12} xs={12}><Table data={this.state.data}  updateData={this.updateData}/></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
