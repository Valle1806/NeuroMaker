import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import '../estilos/registroClient.css'
import axios from 'axios'

class Registro extends React.Component {
    constructor(props){
        super(props)        
        this.state={
            numero: props.numero,
            nombre: props.nombre,
            apellidos: props.apellidos,
            correo: props.correo,
            clave: props.clave,
            cod_postal: props.cod_postal,
            direccion: props.direccion,
            nacimiento: props.nacimiento,
            cumpleanios: props.cumpleanios
        };
        this.handleOnChange = this.handleOnChange.bind(this) 
        this.enviar = this.enviar.bind(this);

    }

    handleOnChange = input => e =>{ 
        this.setState({ [input]: e.target.value});
      }  

    handleRadioChange = changeEvent => {
    this.setState({
        tipo: changeEvent.target.value
    });
    }

    enviar() {
        const mensaje = {
            documento: this.state.tipo,
            numero: this.state.numero,
            nombre: this.state.nombre + ' ' + this.state.apellidos,
            clave: this.state.clave,
            direccion: this.state.direccion,
            nacimiento: this.state.nacimiento,
            cumpleanios: this.state.cumpleanios,
            correo: this.state.correo
        }
    
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.post('http://localhost:5000/usuario/create', mensaje)
        .then((response) => {
          alert(JSON.stringify(response.data))
        })
    }

    render() {
        return (
            <Form className="registro">
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="numero">Numero *</Label>
                            <Input type="text" id="numero" placeholder="Su identificacion..." 
                            value={this.state.numero}  
                            onChange = {this.handleOnChange('numero')}/>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="password">Contraseña *</Label>
                            <Input type="password" name="password" id="password" placeholder="clave de acceso" 
                            value={this.state.clave}  
                            onChange = {this.handleOnChange('clave')}/>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="nombre">Nombre *</Label>
                            <Input type="text" id="nombre" placeholder="Su nombre" 
                            value={this.state.nombre}  
                            onChange = {this.handleOnChange('nombre')}/>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="apellidos">Apellidos *</Label>
                            <Input type="text" id="apellidos" placeholder="Su apellido" 
                            value={this.state.apellidos}                            
                            onChange = {this.handleOnChange('apellidos')}/>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="correo">Correo *</Label>
                            <Input type="email" name="email" id="correo" placeholder="correo electronico" 
                            value={this.state.correo}  
                            onChange = {this.handleOnChange('correo')}/>
                        </FormGroup>
                    </Col>
                    
                </Row>
                <hr/>
                <Row form>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="cod_postal">Código Postal</Label>
                            <Input type="text" id="cod_postal" placeholder="Su código postal..." 
                            value={this.state.cod_postal}  
                            onChange = {this.handleOnChange('cod_postal')}/>
                        </FormGroup>
                    </Col>
                    <Col md={8}>
                         <FormGroup>
                            <Label for="direccion">Direccion *</Label>
                            <Input type="text" name="direccion" id="direccion" placeholder="Ej: Cra 28 N 23-B4" 
                            value={this.state.direccion}  
                            onChange = {this.handleOnChange('direccion')}/>
                        </FormGroup>
                    </Col>
                </Row>
                
        
                <div className="center">
                    <Button color="danger" onClick={this.enviar}>
                        {this.props.textoBoton}
                    </Button>
                </div>
            </Form>
        );
    }
}

export default Registro;