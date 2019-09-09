import React from 'react';
import {
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button,
    UncontrolledDropdown
} from "reactstrap";
import { Link } from 'react-router-dom'

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
            clienteLogueado
        }
        this.dropdownToggle = this.dropdownToggle.bind(this)
    }


    componentWillMount() {

    }

    componentDidUpdate() {
    }

    eliminarProducto = (e) => {
        const valor = e.target.value
        this.setState(prevState => {
            const productos = prevState.productos.filter(producto => producto.id !== valor);
            return { productos };
        });
    }

    producto = (product, index) => {
        return (
            <div className="product-widget" key={product.id}>
                <div className="product-img">
                    <img src={product.imagen} alt="" />
                </div>
                <div className="product-body">
                    <h3 className="product-name">
                        <Link to={`/producto/${product.id}`}>{product.nombre}</Link>
                    </h3>
                    <h4 className="product-price">${product.precio}</h4>

                    <button value={product.id}
                        className="fa fa-trash product-delete"
                        onClick={this.eliminarProducto}
                    />
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
            total += this.state.productos[i].precio
        }
        return total;
    }

    handleOnBuyClik() {

        this.setState({
            openModal: !this.state.openModal
        })
    }

    render() {
        const numPorductos = this.state.productos.length
        return (
            <div className="carrito">
                <i className="fa fa-shopping-cart"></i>
                <div className="qty">3</div>
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
                            <small>{numPorductos}
                                {numPorductos !== 1 ?
                                    " productos agregados" :
                                    " producto agregado"}
                            </small>
                            <h5>{numPorductos ? `TOTAL ${this.precioTotal()}` : "Carrito vacio"}</h5>
                        </div>
                        {numPorductos ?
                            <div className="cart-btns">
                                <a onClick={this.handleOnBuyClik}>Comprar    <i className="fa fa-arrow-circle-right"></i></a>
                            </div> : ""
                        }

                    </DropdownMenu>
                </Dropdown>
            </div>





        );
    }
}
