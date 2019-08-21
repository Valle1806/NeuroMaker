import React, { Component } from 'react';
import axios from 'axios';
import { Button, FormGroup, Input, Container, Row, Col, } from 'reactstrap';
import Header from './header';
import Detalle from './descripcion_comentarioProducto';
import imagen from '../product01.png'
import { withRouter } from 'react-router-dom'
class DetalleProducto extends Component {
    constructor(props) {
        super(props);



        this.state = {
            match: props.match.params.id,
            login: props.login,
            nombre: '',
            imagen: '',
            descripcion: '',
            precio: '',
            categoria: '',
            id_vendedor: '',
            existencias: ''


        };
    }
    componentWillMount() {
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.post(`http://localhost:4000/producto/consultarProducto/${this.props.match.params.id}`)
            .then((response) => {
                console.log(response.data.data[0])
                if (response.data.mensaje==="consulta exitosa") {
                   
                    this.setState({ nombre: response.data.data[0].nombre });
                    this.setState({ imagen: response.data.data[0].imagen });
                    this.setState({ descripcion: response.data.data[0].descripcion });
                    this.setState({ precio: response.data.data[0].costo });
                    this.setState({ categoria: response.data.data[0].categoria });
                    this.setState({ id_vendedor: response.data.Vendedor }); //DEBE SER ID, NO NOMBRE
                    //this.setState({ existencias: response.data.existencias }) FAAAAAAAAAAAAAALTAAAAAAA
                  
                }

            })
    }

    
    render() {
       
        const detalless={
            descripcion: this.state.descripcion,
            comentarios: ''
        }
        return (

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
                                    <div className="product-rating">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star-o"></i>
                                    </div>
                                    <a className="review-link" href="#">10 Comentario(s) | Añade tu comentario</a>
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
                                            <input type="number" />
                                        </div>
                                    </div>
                                    <button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i>Añadir al carrito</button>

                                </div>

                                <ul className="product-links">
                                    <li>Category:</li>
                                    <li><a href="#">{this.state.categoria}</a></li>
                                </ul>


                            </div>
                        </div>

                        <Detalle match={this.state.match}/>
                    </div>
                </div>
            </div>


        )
    }

}
export default withRouter(DetalleProducto);