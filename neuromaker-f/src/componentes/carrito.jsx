import React from 'react';
import {
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button,
    UncontrolledDropdown
} from "reactstrap";
import { Link } from 'react-router-dom'
import axios from 'axios';
import ModalPagar from './comprar'
export default class Carrito extends React.Component {
    constructor(props) {
        super(props)
        const token = localStorage.getItem("token")
        let clienteLogueado = true;
        if (token == null) {
            clienteLogueado = false;
        }
        this.state = {
            number: 0,
            isOpen: false,
            productos: [],
            clienteLogueado,
            id_comprador:''
        }
        this.dropdownToggle = this.dropdownToggle.bind(this)
        this.handleOnBuyClik= this.handleOnBuyClik.bind(this)
    }


    componentWillMount() {
        const id_comprador= localStorage.getItem("id")
        this.setState({id_comprador: id_comprador})
        axios.post(`http://localhost:4000/carrito/consultarCarritos/${id_comprador}`)
        .then((response) => {
          if (response.data.mensaje === "Carrito encontrado") {
            this.setState({productos: response.data.data})
            
          }
    
        }).catch((error) => {
            alert('Error de registro de Producto')
        })
    }

    componentDidUpdate() {
    }

    eliminarProducto = (e) => {
        const valor = e.target.value
        console.log(valor)
        const mensaje={
            id_producto: valor,
            id_comprador: this.state.id_comprador
        }
        axios.post('http://localhost:4000/carrito/borrarProductoCarrito',mensaje)
        .then((response) => {
            this.setState(prevState => {
                const productos = prevState.productos.filter(producto => producto.id !== valor);
                return { productos };
            });
    
        }).catch((error) => {
            alert('Error de registro de Producto')
        })
       
    }

    producto = (product, index) => {
        return (
            <div className="product-widget" key={product.id_producto}>
                <div className="product-img">
                    <img src={`http://localhost:4000/uploads/${product.imagen}`} alt="" />
                </div>
                <div className="product-body">
                    <h3 className="product-name">
                        <Link to={`/producto/${product.id}`}>{product.nombre}</Link>
                    </h3>
                    <h4 className="product-price"><span class="qtyy">{product.cantidad}x</span><b>${product.costo}</b></h4>
                    
                    <button value={product.id_producto}
                        className="delete"
                        onClick={e =>this.eliminarProducto(e, "value")}
                    >
                        <i class="fa fa-times"></i>
                    </button>
                </div>
            </div>
        )
    }
    dropdownToggle(e) {
    
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    precioTotal() {
        let total = 0;
        for (var i = 0; i < this.state.productos.length; i++) {
            total += this.state.productos[i].costo*this.state.productos[i].cantidad
        }
        return total;
    }

    handleOnBuyClik() {

        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        const numProductos = this.state.productos.length
        return (
            <div className="carrito">
                <i className="fa fa-shopping-cart"></i>
                <div className="qty">{numProductos}</div>
                <Dropdown isOpen={this.state.dropdownOpen}
                    toggle={e => this.dropdownToggle(e)}
                   >
                    <DropdownToggle className="nombre-cart"caret nav>
                        Carrito
                     </DropdownToggle>
                    <DropdownMenu right className="cart-dropdown">
                        <div className="cart-list">
                            {this.state.productos.map((producto, index) => (
                                this.producto(producto, index)
                            ))}
                        </div>
                        <div className="cart-summary">
                            <small>{numProductos}
                                {numProductos !== 1 ?
                                    " productos agregados" :
                                    " producto agregado"}
                            </small>
                            <h5>{numProductos ? <b>TOTAL ${this.precioTotal()}</b> : <b>"Carrito vacio"</b>}</h5>
                        </div>
                        {numProductos ?
                            <div className="cart-btns">
                                <a></a>
                                <a><ModalPagar productos={this.state.productos}  total={this.precioTotal()}/></a>
                            </div> : ""
                        }

                    </DropdownMenu>
                </Dropdown>
            </div>





        );
    }
}
