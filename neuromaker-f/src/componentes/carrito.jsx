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
            id_comprador:'',
            modal: false,
            sePuedeComprar:true,
            arregloAux:[],
            productosNormales:[],
            actualizacion: false
        }
        this.dropdownToggle = this.dropdownToggle.bind(this)
        this.toggle = this.toggle.bind(this);
    }


    componentWillMount() {
        const id_comprador= localStorage.getItem("id")
        this.setState({id_comprador: id_comprador})
        axios.post(`http://localhost:4000/carrito/consultarCarritos/${id_comprador}`)
        .then((response) => {
          if (response.data.mensaje === "Carrito encontrado") {
            this.setState({productos: response.data.data})
            this.setState({arregloAux: response.data.data})
            console.log(response.data.data)
          }
    
        }).catch((error) => {
            alert('Error de registro de Producto')
        })
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
            if(response.data.mensaje==="Producto eliminado"){
                alert("Producto eliminado")
                this.setState({
                    dropdownOpen: !this.state.dropdownOpen
                });
            }
            
    
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
                    <h4 className="product-price"><span className="qtyy">{product.cantidad}x</span><b>${product.costo}</b></h4>
                    
                    <button value={product.id_producto}
                        className="fa fa-times"
                        onClick={e =>this.eliminarProducto(e, "value")}
                    >
                       
                    </button>
                </div>
            </div>
        )
    }
    dropdownToggle(e) {
        if(!this.state.dropdownOpen){
        axios.post(`http://localhost:4000/carrito/consultarCarritos/${this.state.id_comprador}`)
        .then((response) => {
          if (response.data.mensaje === "Carrito encontrado") {
            this.setState({productos: response.data.data})
            this.setState({arregloAux: response.data.data})
            console.log(response.data.data)
          }
    
        }).catch((error) => {
            alert('Error de registro de Producto')
        })
        }
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    precioTotal() {
        let total = 0;
        if(this.state.sePuedeComprar){
        for (var i = 0; i < this.state.productos.length; i++) {
            total += this.state.productos[i].costo*this.state.productos[i].cantidad
        }
        return total;
        }else{
            return "Excedió existencias"
        }
    }
    toggle() {
        var arregloIds=[]
        console.log("productos props",this.state.productos)
        for(var i=0; i<this.state.productos.length; i++){
                arregloIds.push(this.state.productos[i].id_producto)
        }
        const mensaje1={
            ids: arregloIds
        }
        axios.post('http://localhost:4000/producto/consultarCantidadVentaProducto',mensaje1)
        .then((response) => {
            if (response.data.mensaje === "Productos encontrados") {
                this.setState({productosNormales: response.data.data})
                console.log(response.data.data)
              
                let arregloProductosAux=this.state.arregloAux
             for(var i=0; i<this.state.arregloAux.length;i++){
                 if(this.state.arregloAux[i].cantidad>response.data.data[i].existencias){
                    arregloProductosAux[i]["existencia"]="   Excedió existencias"
                    //this.setState({productosNormales[]:})
                    this.setState({sePuedeComprar:false})
                 }
             }
             this.setState({arregloAux: arregloProductosAux})
            }
        }).catch((error) => {
            console.log(error)
            alert('Error consultarCantidadVentaProducto')
        })
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        const numProductos = this.state.productos.length
        return (
            <div className="carrito">
                <center><i className="fa fa-shopping-cart"></i></center>
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
                                <a  onClick={this.toggle}>Comprar  <i className="fa fa-arrow-circle-right"></i></a>
                            </div> : ""
                        }
                    </DropdownMenu>
                </Dropdown>
                <ModalPagar modal={this.state.modal} productos={this.state.arregloAux}  productosNormales={this.state.productosNormales} total={this.precioTotal()} toggle={this.toggle}
                sePuedeComprar={this.state.sePuedeComprar}/>
            </div>





        );
    }
}
