import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Component, createRef} from 'react';
import {hillEncrypt, hillDecrypt} from "../functions/hill";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Hill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message : '',
            key_a : 656,
            key_b : 414,
            key_c : 443,
            key_d : 637,
            key_e : 434,
            key_f : 374,
            key_g : 644,
            key_h : 485,
            key_i : 483,
            result : '',
            fake_result : '',
            spaced: 'no-space'
        }
        this.fileInput = createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleEncrypt = () => {
        if(this.fileInput.current.files[0] == null) {
            let cypher = hillEncrypt(this.state.message, this.state.key_a, this.state.key_b, this.state.key_c, this.state.key_d, this.state.key_e, this.state.key_f, this.state.key_g, this.state.key_h, this.state.key_i);
            this.setState({result: cypher});
            this.setState({fake_result: cypher});


        } else {
            const fr = new FileReader();
            fr.onload = () => {
                this.setState({message: fr.result});
                let cypher = hillEncrypt(this.state.message, this.state.key_a, this.state.key_b, this.state.key_c, this.state.key_d, this.state.key_e, this.state.key_f, this.state.key_g, this.state.key_h, this.state.key_i);
                this.setState({result: cypher});
                this.setState({fake_result: cypher});
    
            }
            fr.readAsText(this.fileInput.current.files[0]);

        }
        this.setState({spaced: 'no-space'});
    }

    handleDecrypt = () => {
        if(this.fileInput.current.files[0] == null) {
            let plainMsg = hillDecrypt(this.state.message, this.state.key_a, this.state.key_b, this.state.key_c, this.state.key_d, this.state.key_e, this.state.key_f, this.state.key_g, this.state.key_h, this.state.key_i);
            this.setState({result: plainMsg});
            this.setState({fake_result: plainMsg});

        } else {
            const fr = new FileReader();
            fr.onload = () => {
                this.setState({message: fr.result});
                let cypher = hillDecrypt(this.state.message, this.state.key_a, this.state.key_b, this.state.key_c, this.state.key_d, this.state.key_e, this.state.key_f, this.state.key_g, this.state.key_h, this.state.key_i);
                this.setState({result: cypher});
                this.setState({fake_result: cypher});
    
            }
            fr.readAsText(this.fileInput.current.files[0]);
        }
        
    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        if (name === 'spaced') this.handleSpace(e);
    }

    handleSpace = (e) => {
        if (e.target.value === 'spaced') {
            let r = this.state.result.replace(/(.{5})/g,"$& ");
            this.setState({result: r});
        } else {
            this.setState({result: this.state.fake_result});
        }
    }

    clearField = () => {
        this.fileInput.current.value = null;
    }

    handleSaveFile = () => {
        let blob = new Blob([this.state.fake_result],
                { type: "text/plain;charset=utf-8" });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "cypher.txt";
        link.click();
    }

    render() {
    return (
        <Container>
            <h1 className="mb-5 mt-5">Hill Cypher</h1>
            <Form className="mb-5">
                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Plain Text / Cypher Text</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="" name="message" value={this.state.message} onChange={this.handleInputChange}></Form.Control>
                    <Form.Label>Input File</Form.Label>
                    <Form.Control type="file" accept=".txt" ref={this.fileInput}/>
                    <Button variant="outline-secondary" size="sm" type="button" onClick={this.clearField} className="mt-1 mb-4">Clear</Button>
                    <br/>
                    <Form.Label>Key</Form.Label>
                    <Container>
                        <Row xs={3}>
                            <Col>
                                <Form.Label></Form.Label>
                                <Form.Control type="number" pattern="[0-9]*" placeholder="" name="key_a" value={this.state.key_a} onChange={this.handleInputChange}></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label></Form.Label>
                                <Form.Control type="number" pattern="[0-9]*" placeholder="" name="key_b" value={this.state.key_b} onChange={this.handleInputChange}></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label></Form.Label>
                                <Form.Control type="number" pattern="[0-9]*" placeholder="" name="key_c" value={this.state.key_c} onChange={this.handleInputChange}></Form.Control>
                            </Col>
                        </Row>
                        <Row xs={3}>
                            <Col>
                                <Form.Label></Form.Label>
                                <Form.Control type="number" pattern="[0-9]*" placeholder="" name="key_d" value={this.state.key_d} onChange={this.handleInputChange}></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label></Form.Label>
                                <Form.Control type="number" pattern="[0-9]*" placeholder="" name="key_e" value={this.state.key_e} onChange={this.handleInputChange}></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label></Form.Label>
                                <Form.Control type="number" pattern="[0-9]*" placeholder="" name="key_f" value={this.state.key_f} onChange={this.handleInputChange}></Form.Control>
                            </Col>
                        </Row>
                        <Row xs={3}>
                            <Col>
                                <Form.Label></Form.Label>
                                <Form.Control type="number" pattern="[0-9]*" placeholder="" name="key_g" value={this.state.key_g} onChange={this.handleInputChange}></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label></Form.Label>
                                <Form.Control type="number" pattern="[0-9]*" placeholder="" name="key_h" value={this.state.key_h} onChange={this.handleInputChange}></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label></Form.Label>
                                <Form.Control type="number" pattern="[0-9]*" placeholder="" name="key_i" value={this.state.key_i} onChange={this.handleInputChange}></Form.Control>
                            </Col>
                        </Row>
                    </Container>
                </Form.Group>

                <Container className="d-flex gap-3">
                    <Button variant="primary" type="button" onClick={this.handleEncrypt}>
                        Encrypt
                    </Button>
                    <Button variant="secondary" type="button" onClick={this.handleDecrypt}>
                        Decrypt
                    </Button>
                </Container>
            </Form>
            <br/>
            
            <Form.Label>Output</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="" readOnly name="result" value={this.state.result}/>
            <Container>
                <Form.Group className="mb-3">                
                    <Form.Check inline label="No Space" type="radio" value="no-space" name="spaced" onChange={this.handleInputChange} checked={this.state.spaced === 'no-space'}/>
                    <Form.Check inline label="Spaced" type="radio" value="spaced" name="spaced" onChange={this.handleInputChange} checked={this.state.spaced === 'spaced'}/>
                </Form.Group>
            </Container><br/>
            <Button variant="primary" type="button" onClick={this.handleSaveFile}>Download as File</Button>

            <Container className="mb-5"></Container>
            
        </Container>
    )
    }
}

export default Hill;