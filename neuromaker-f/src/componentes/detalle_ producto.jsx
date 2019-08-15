import React, { Component } from 'react';
import axios from 'axios';
import { Button, FormGroup, Input, Container, Row, Col,   } from 'reactstrap';
import Detalle from './descripcion_comentarioProducto';
import imagen from '../product01.png'
class DetalleProducto extends Component{
    constructor(props){
        super(props);
        this.state={
          
        };
    }

    render(){
        return(
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 col-md-push-2">
                            
						    <div id="product-main-img">
                                <div className="product-preview">
                                    <img src={imagen} alt=""/>
                                </div>
						    </div>
					    </div>
                        <div className="col-md-5">
                            <div className="product-details">
                                <h2 className="product-name">product name goes here</h2>
                                <div>
                                    <div class="product-rating">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </div>
                                   
                                </div>
                                <div>
                                    <h3 className="product-price">$980.00 <del class="product-old-price">$990.00</del></h3>
                                    <span className="product-available">En Stock</span>
                                </div>
                                <div>

                                </div>
                                <div className="qty-label">
                                        <div className="texto"><span>Cant</span></div>
                                            <input className="numero" type="number"/>
                                </div>
                                    <br/>
                                <div className="add-to-cart">
                                   
                                    <button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> Añadir al carrito</button>
                                </div>
                                <ul className="product-links">
                                    <li>Category:</li>
                                    <li><a href="#">Headphones</a></li>
                                    <li><a href="#">Accessories</a></li>
                                </ul>
                            </div>
                        </div>
                        <Detalle/>
                
                     </div>
                </div>    
            </div> 
              


        )
    }

}
export default DetalleProducto;