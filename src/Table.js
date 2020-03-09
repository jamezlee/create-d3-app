import React,{Component, Fragment}from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap';

class Table extends Component{

    constructor(props){
        super(props)
        this.state={
            name:'',
            height:'',
            age:''
        }
        console.log(this.props)

    }
    handleOnChange = (event) => {
        console.log(event.target.name)
        const {  value, name } = event.target
       this.setState({
            [name]: value 
       })
    }
    handleSubmit = () =>{
        this.props.updateData([...this.props.data, this.state])
        this.setState({
            fullname:'',
            height:'',
            age:''

        })
    }
    handleRemove = (event) => {
       
        const NewData = this.props.data.filter(d=>{
            // event.target.name
            return d.name != event.target.name
        })
        console.log(NewData)
        this.props.updateData(NewData)

    }
    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps)
    //     this.setState({
    //         data:nextProps.data
    //     })
        
	// }
    renderRows() {
        console.log(this.props.data)
        if (this.props.data.length > 0) {
            return(
                this.props.data.map((student,index) =>{
                    return(
                        <Row key={index}
                        >
                            <Col xs={3}>{student.name}</Col>
                            <Col xs={3}>{student.height}</Col>
                            <Col xs={3}>{student.age}</Col>
                            <Col xs={3}><Button
                            variant={"danger"}
                            type={"button"}
                            size={"lg"}
                            name={student.name}
                            onClick={this.handleRemove}
                            
                            >
                            Remove
                            </Button></Col>
                        </Row>                    
                    )
                })
            )
        }
        
    }
    render() {
        const {name,height, age}= this.state
        return(
            <Fragment>
               
                <Row>
                    <Col xs={3}>
                        {name}
                        <Form.Control 
                        placeholder={"Name"}
                        name={"name"}
                        value={name}
                        onChange={this.handleOnChange}
                        />
                    </Col>
                    <Col xs={3}>
                    {height}
                        <Form.Control 
                        placeholder={"Height"}
                        name={"height"}
                        value={height}
                        onChange={this.handleOnChange}
                        />
                    </Col>
                    <Col xs={3}>
                    {age}
                        <Form.Control 
                        placeholder={"AGE"}
                        name={"age"}
                        value={age}
                        onChange={this.handleOnChange}
                        />
                    </Col>
                    <Col xs={3}>
                        <Button
                        variant={"primary"}
                        type={"button"}
                        size={"lg"}
                        onClick={this.handleSubmit}
                        >
                        Ether
                        </Button>
                    </Col>
                </Row>

                {this.renderRows()}
                
            </Fragment>
            
        )
    }


}

export default Table