import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import axios from 'axios'

class ModalPagar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            id_comprador: '',
            usuario: {}

        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    componentWillMount(){
        const id_comprador= localStorage.getItem("id")
        const mensaje={
            id_comprador
        }
        this.setState({id_comprador: id_comprador})
        axios.post('http://localhost:4000/usuario/obtenerDatosUsuario',mensaje)
        .then((response) => {
            if (response.data.mensaje === "Usuario encontrado") {
                this.setState({usuario:response.data.data})
            }
        }).catch((error) => {
            alert('Error de registro de Producto')
        })
    }
    crearVenta(){
        const mensaje={
            id_comprador: this.state.id_comprador
        }
        axios.post('http://localhost:4000/venta/registrarVenta',mensaje)
        .then((response) => {
            if (response.data.mensaje === "Venta creada con exito") {
            
            }
        }).catch((error) => {
            alert('Error de registro de Producto')
        }) 
    }
 
    render() {
        return (
            <div >
                <a  color="danger" onClick={this.toggle}>Comprar  <i className="fa fa-arrow-circle-right"></i></a>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg" >
                 <ModalHeader toggle={this.toggle}>Detalle pedido y facturación</ModalHeader>
                    <ModalBody>

                        <div class="row">

                            <div class="col-md-5">
                                <div class="billing-details">
                                    <div class="section-title">
                                        <h3 class="title">Detalles de pedido</h3>
                                    </div>
                                    <div class="form-group">
                                        <Label for="nombre">Nombre*</Label>
                                        <input class="input" type="text" name="nombre" placeholder="Nombre" value={this.state.usuario.nombre}/>
                                    </div>
                                    
                                    <div class="form-group">
                                         <Label for="correo">Correo*</Label>
                                        <input class="input" type="email" name="correo" placeholder="Correo electronico" value={this.state.usuario.correo} />
                                    </div>
                                    <div class="form-group">
                                         <Label for="cod_postal">Cíodigo Postal*</Label>
                                        <input class="input" type="text" name="cod_postal" placeholder="Codigo postal"value={this.state.usuario.codigo_postal} />
                                    </div>
                                    <div class="form-group">
                                    <Label for="tarjeta">Número tarjeta*</Label>
                                        <input class="input" type="numero" name="tarjeta" placeholder="Numero de tarjeta" value={this.state.usuario.tarjeta} />
                                    </div>
                                    

                                </div>
                                </div>
                                <div class="col-md-7 order-details">
                                    <div class="section-title text-center">
                                        <h3 class="title">Tu orden</h3>
                                    </div>
                                    <div class="order-summary">
                                        <div class="order-col">
                                            <div><strong>PRODUCT</strong></div>
                                            <div><strong>TOTAL</strong></div>
                                        </div>
                                        <div class="order-products">
                                        {this.props.productos.map(indice => (
                                        <div class="order-col" key={indice.id_producto}>
                                                 <div>{indice.cantidad}x {indice.nombre}</div>
                                           <div>{indice.costo}</div>
                                        </div>
                                            ))}
                                            
                                            
                                        </div>
                                       
                                        <div class="order-col">
                                            <div><strong>TOTAL</strong></div>
                                            <div><strong class="order-total">${this.props.total}</strong></div>
                                        </div>
                                    </div>
                                    <div class="input-checkbox">
                                    <input type="checkbox" id="terms" />
                                    <label for="terms">
                                        <span></span>
                                        I've read and accept the <a href="#">terms & conditions</a>
                                    </label>
                                </div>
                                <a href="#" class="primary-btn order-submit">Realizar pedido</a>
                                </div>
                              
                            
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalPagar;