import React from 'react'
import {Input, Label} from 'reactstrap'
import Estrellas from './estrellas'

const Producto = (props) =>{
    
    return(

        
        
    <div className="product" >
        
            <div className="product-img">
            <img src={`http://localhost:4000/uploads/${props.producto.imagen}`} className="App-logo" alt="logo"/>
                <div className="product-label">
                    {//<span className="sale">-30%</span>
                    }
                    {props.producto.cantidad==0 ?
                    <span className="agotado">Agotado</span>:
                    <span className="new">Nuevo </span>
                    
                    }
                </div>
            </div>
            <div className="product-body">
                <p className="product-category">{props.producto.categoria}</p>
                <h3 className="product-name">{props.producto.nombre}</h3>
                <h4 className="product-price">{'$'+props.producto.costo} <del className="product-old-price">{//$990.00
                }</del></h4>
                <div className="product-rating">  {/*fa fa-star */}
                   <Estrellas calificacion={props.producto.calificacion}/>
                </div>
            </div>
            <div className="add-to-cart">
                <button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> Añadir al carrito</button>
            </div>
        </div>

    );
}

export default Producto;