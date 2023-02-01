import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Component, createRef} from 'react';
import {extVigenereEncrypt, extVigenereDecrypt, extVigenereFileEncrypt, extVigenereFileDecrypt} from '../functions/vigenere-ext';

class ExtVigenere extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message : '',
            key : '',
            result : ''
        }
        this.fileInput = createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleEncrypt = () => {
        if(this.fileInput.current.files[0] == null) {
            let cypher = extVigenereEncrypt(this.state.message, this.state.key);
            this.setState({result: cypher});

        } else {
            const fr = new FileReader();
            fr.onload = () => {
                let cypher = extVigenereFileEncrypt(fr.result, this.state.key);
                this.setState({result: cypher});
                
            }
            fr.readAsArrayBuffer(this.fileInput.current.files[0]);

        }
        
    }

    handleDecrypt = () => {
        if(this.fileInput.current.files[0] == null) {
            let plainMsg = extVigenereDecrypt(this.state.message, this.state.key);
            this.setState({result: plainMsg});
        } else {
            const fr = new FileReader();
            fr.onload = () => {
                let cypher = extVigenereFileDecrypt(fr.result, this.state.key);
                this.setState({result: cypher});

            }
            fr.readAsArrayBuffer(this.fileInput.current.files[0]);
        }
        
    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    clearField = () => {
        this.fileInput.current.value = null;
    }

    handleSaveFile = () => {
        let blob = new Blob([this.state.result]);
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        if (this.fileInput.current.value == null) {
            link.download = 'cypher';
        } else {
            link.download = this.fileInput.current.files[0].name;
        }
        link.click();
    }

    render() {
    return (
        <Container>
            <h1 className="mb-5 mt-5">Extended Vigenere Cypher</h1>
            <Form className="mb-5">
                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Plain Text / Cypher Text</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="" name="message" value={this.state.message} onChange={this.handleInputChange}></Form.Control>
                    <Form.Label>Input File</Form.Label>
                    <Form.Control type="file" accept="" ref={this.fileInput}/>
                    <Button variant="outline-secondary" size="sm" type="button" onClick={this.clearField} className="mt-1 mb-4">Clear</Button>
                    <br/>
                    <Form.Label>Key</Form.Label>
                    <Form.Control type="text" placeholder="" name="key" value={this.state.key} onChange={this.handleInputChange}></Form.Control>
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
            <br/>
            <Button variant="primary" type="button" onClick={this.handleSaveFile}>Download as File</Button>

            <Container className="mb-5"></Container>
            
        </Container>
    )
    }
}

export default ExtVigenere;