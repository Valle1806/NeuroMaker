import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import '../estilos/registroClient.css'
import axios from 'axios'
import logo from '../logo.png'
import { Link } from 'react-router-dom'

class Registro extends React.Component {
    constructor(props) {
        super(props)
        const token= localStorage.getItem("token");
        let clienteLogueado= true;
        let textoBoton= 'Actualizar';
        if(token==null){
            textoBoton= 'Registrar'
            clienteLogueado= false;
        }
        this.state = {
            cedula: "",
            nombre:"",
            apellidos: "",
            correo: "",
            clave: "",
            cod_postal: "",
            direccion: "",
            tarjeta: "",
            comision: "",
            clienteLogueado,
            textoBoton
        };
        this.handleOnChange = this.handleOnChange.bind(this)
        this.enviar = this.enviar.bind(this);
        

    }

    handleOnChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    handleRadioChange = changeEvent => {
        this.setState({
            tipo: changeEvent.target.value
        });
    }

    

    enviar() {
        const mensaje = {
            cedula: this.state.cedula,
            clave: this.state.clave,
            nombre: this.state.nombre + ' ' + this.state.apellidos,
            direccion: this.state.direccion,
            codigo_postal: this.state.cod_postal,
            tarjeta: this.state.tarjeta,
            correo: this.state.correo,
            estado: 1,
            comision: this.state.comision
           
        }
        console.log(mensaje)

        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.post('http://localhost:4000/usuario/registrarUsuario', mensaje)
            .then((response) => {
                alert(JSON.stringify(response.data))
                if(response.data.mensaje==="Usuario creado exitosamente"){
                    window.location.reload();
                    localStorage.setItem("token", "18182A2ISJ292101");
                }
            })
    }

    render() {
        return (
            <div>
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>


                </div>
                <Form className="registro">
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="cedula">Numero cédula*</Label>
                                <Input type="text" id="cedula" placeholder="Su identificacion..."
                                    value={this.state.numero}
                                    onChange={this.handleOnChange('cedula')} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="clave">Contraseña *</Label>
                                <Input type="password" name="clave" id="clave" placeholder="clave de acceso"
                                    value={this.state.clave}
                                    onChange={this.handleOnChange('clave')} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="nombre">Nombre *</Label>
                                <Input type="text" id="nombre" placeholder="Su nombre"
                                    value={this.state.nombre}
                                    onChange={this.handleOnChange('nombre')} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="apellidos">Apellidos *</Label>
                                <Input type="text" id="apellidos" placeholder="Su apellido"
                                    value={this.state.apellidos}
                                    onChange={this.handleOnChange('apellidos')} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="correo">Correo *</Label>
                                <Input type="email" name="email" id="correo" placeholder="correo electronico"
                                    value={this.state.correo}
                                    onChange={this.handleOnChange('correo')} />
                            </FormGroup>
                        </Col>

                    </Row>
                    <hr />
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="cod_postal">Código Postal*</Label>
                                <Input type="text" id="cod_postal" placeholder="Su código postal..."
                                    value={this.state.cod_postal}
                                    onChange={this.handleOnChange('cod_postal')} />
                            </FormGroup>
                        </Col>
                        <Col md={8}>
                            <FormGroup>
                                <Label for="direccion">Direccion *</Label>
                                <Input type="text" name="direccion" id="direccion" placeholder="Ej: Cra 28 N 23-B4"
                                    value={this.state.direccion}
                                    onChange={this.handleOnChange('direccion')} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={5}>
                            <FormGroup>
                                <Label for="tarjeta">Número de tarjeta*</Label>
                                <Input type="numero" id="tarjeta" placeholder="Su número de tarjeta..."
                                    value={this.state.tarjeta}
                                    onChange={this.handleOnChange('tarjeta')} />
                            </FormGroup>
                        </Col>
                        <Col md={5}>
                            <FormGroup>
                                <Label for="comision">Porcentaje comison de ventas*</Label>
                                <Input type="numero" id="comision" placeholder="Su número de tarjeta..."
                                    value={this.state.comision}
                                    onChange={this.handleOnChange('comision')} />
                            </FormGroup>
                        </Col>
                    </Row>

                    <div className="center">
                        <Button color="danger" onClick={this.enviar}>
                            {this.state.textoBoton}
                        </Button>
                        <br /><br />
                        <span className="mensajito">¿Ya tienes cuenta? <Link to={"/login"} >Inicia sesión</Link></span>
                    </div>
                </Form>
            </div>
        );
    }
}

export default Registro;