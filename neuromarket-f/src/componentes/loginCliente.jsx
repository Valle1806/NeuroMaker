import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Button, FormGroup, Input } from 'reactstrap';
import '../estilos/loginCliente.css'

class LoginCliente extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            username: "",
            passwd: "",
        };
        this.handleOnchange = this.handleOnchange.bind(this);
        this.enviarSolicitud = this.enviarSolicitud.bind(this)

    }


    handleOnchange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    enviarSolicitud() {
      const mensaje = {
        username: this.state.username,
        passwd: this.state.passwd
        
      }
      console.log(mensaje);
      //Axios se encarga de hacer solicitudes de forma sencilla
      axios.post('http://localhost:4000/usuario/login', mensaje)
      .then((response) => {
        console.log(response.data);
        alert(JSON.stringify(response.data))
        this.props.login(true);
      })
    }

    
    

    render() {
        if (this.props.autenticado) {
            console.log("Esta logeado")

        }
        return (
            <div>
                <div id="espacio" />
                <div className="card card-1">
                    <div className="card-heading">
                        {/*<div id="mundo" />
                        <div id="taxi" />*/}
                    </div>
                    <div id="formularioLogin">
                        <h2>Iniciar Sesión</h2>
                        <br />
                        <FormGroup>
                        <i className="fa fa-user"></i>
                            <Input type="email" name="email"
                                onChange={this.handleOnchange('username')}
                                placeholder="Usuario" 
                                />

                        </FormGroup>
                        <br />
                        <FormGroup>
                        <i className="fa fa-lock"></i>
                            <Input type="password" name="password"
                                onChange={this.handleOnchange('passwd')}
                                placeholder="contrasena" />

                        </FormGroup>
                        <br />
                        <Button color="danger" block onClick={this.enviarSolicitud}>INGRESAR</Button>{' '}

                        <br /><br />
                        <span className="mensajito">¿Aun sin cuenta? <Link to={"/registro"} >registrare aqui</Link></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginCliente;