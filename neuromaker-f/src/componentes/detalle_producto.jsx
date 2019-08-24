import React, { Component } from 'react';
import axios from 'axios';
import { Button, FormGroup, Input, Container, Row, Col, Label } from 'reactstrap';
import Header from './header';
import Detalle from './descripcion_comentarioProducto';
import imagen from '../product01.png'
import { Spinner, Alert } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import Estrellas from './estrellas'




class DetalleProducto extends Component {
    constructor(props) {
        super(props);

        console.log(props)
        const idUsuario = localStorage.getItem("id")
        this.state = {
            match: props.match.params.id,
            login: props.login,
            idProducto: '',
            nombre: '',
            imagen: '',
            descripcion: '',
            precio: '',
            categoria: '',
            id_vendedor: '',
            existencias: '',
            calificacion: '',
            cantidad: 1,
            cargando: true,
            idUsuario,
            alert: false


        };
        this.handleOnchange = this.handleOnchange.bind(this)
        this.anadirCarrito = this.anadirCarrito.bind(this)
    }

    anadirCarrito() {
        const mensaje = {
            id_producto: this.state.idProducto,
            cantidad: this.state.cantidad,
            id_comprador: this.state.idUsuario,
            id_vendedor: this.state.id_vendedor
        }
        if(this.state.login){
        if(mensaje.cantidad<=this.state.existencias && mensaje.className>0){
        console.log(mensaje)
        axios.post('http://localhost:4000/carrito/registrarCarrito', mensaje)
            .then((response) => {
                this.setState({alert:true})
            })
        }else{
            alert("Ha excedido la cantidad existente")
        }
    }else{
        alert("Debe iniciar sesión")
    }
    }

    handleOnchange = input => e => {
        this.setState({ [input]: e.target.value });
    }
    componentWillMount() {
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.post(`http://localhost:4000/producto/consultarProducto/${this.props.match.params.id}`)
            .then((response) => {
                if (response.data.mensaje === "consulta exitosa") {
                    console.log(response.data.data)
                    this.setState({ idProducto: response.data.data[0].id });
                    this.setState({ nombre: response.data.data[0].nombre });
                    this.setState({ imagen: response.data.data[0].imagen });
                    this.setState({ descripcion: response.data.data[0].descripcion });
                    this.setState({ precio: response.data.data[0].costo });
                    this.setState({ categoria: response.data.data[0].categoria });
                    this.setState({ id_vendedor: response.data.data[0].vendedor });
                    this.setState({ existencias: response.data.data[0].cantidad })
                    this.setState({ calificacion: response.data.data[0].calificacion });
                    this.setState({ cargando: false })
                }

            })
    }
    mostrarAlerta = () => {
        if (this.state.alert) {
            return (
                <Alert color="success">
                    Prodcuto añadido exitosamente al carrito
                </Alert>
            )
        }
    }

    render() {

        const detalless = {
            descripcion: this.state.descripcion,
            match: this.state.match
        }

        if (this.state.cargando) {
            return (<div>

                {/*<Spinner style={{ position: 'relative', right: '40px', top: '50px' }} type="grow" color="primary" />*/}
                <Spinner type="grow" color="secondary" />
                <Spinner type="grow" color="success" />
                <Spinner type="grow" color="danger" />
                <Spinner type="grow" color="warning" />
                <Spinner type="grow" color="info" />
                <Spinner type="grow" color="light" />
                <Spinner type="grow" color="dark" />

            </div>);
        } else {
            return (
                <div>
                    {this.mostrarAlerta()}
                <div className="section">
                    
                    <div className="container">
                        <div className="row">
                            <Col md={1}>
                            </Col>
                            <Col md={5}>
                                <div className="product-preview">
                                    <img src={this.state.imagen} alt="" />
                                </div>

                            </Col>

                            <div className="col-md-5">
                                <div className="product-details">
                                    <h2 className="product-name">{this.state.nombre}</h2>
                                    <div>

                                        <Estrellas calificacion={this.state.calificacion} />

                                        <a className="review-link" href="#">{this.state.calificacion}/5 Añade tu calificacion</a>
                                    </div>
                                    <div>
                                        <h3 className="product-price">{"$" + this.state.precio} <del className="product-old-price">$990.00</del></h3>
                                        <span className="product-available">In Stock</span>
                                    </div>


                                    <div className="input-vendedor">
                                        Vendedor
                                    <div className="input-v">
                                            <input type="text" />
                                        </div>
                                    </div>
                                    <div className="add-to-cart">
                                        <div className="qty-label">
                                            Cantidad
									<div className="input-number">
                                                <input type="number" id="cantidad" min="1"
                                                    value={this.state.cantidad}
                                                    onChange={this.handleOnchange('cantidad')} />
                                            </div>
                                        </div>
                                        <button className="add-to-cart-btn" onClick={this.anadirCarrito}><i className="fa fa-shopping-cart"></i>Añadir al carrito</button>

                                    </div>

                                    <ul className="product-links">
                                        <li>Category:</li>
                                        <li><a href="#">{this.state.categoria}</a></li>
                                    </ul>


                                </div>
                            </div>

                            <Detalle {...detalless} />
                            
                        </div>
                    </div>
                </div>
                </div>

            )
        }
    }

}
export default withRouter(DetalleProducto);