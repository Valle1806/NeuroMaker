import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label , CustomInput} from 'reactstrap';
import axios from 'axios'
import ModalEnvio from './envio'

class ModalPagar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id_comprador: '',
            usuario: {},
            productos: this.props.productos,
            modal: false
        };
        this.crearVenta=this.crearVenta.bind(this)
        this.toggle=this.toggle.bind(this)
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
                var productosAux=this.props.productos

                for(var i=0; i<productosAux.length; i++){
                    productosAux[i]['id_venta']= response.data.data.id;
                }
                axios.post('http://localhost:4000/detalle_venta/registrarDetalle',productosAux).then((response)=>{
                    if(response.data.mensaje === "Detalle de venta registrado"){
                 
                        var productosNormales= this.props.productosNormales
                        console.log("NIOOOOO",productosNormales)
                        console.log(productosAux)
                        for(var i=0; i<productosNormales.length; i++){
                            if(productosNormales[i].existencias!=0){
                           productosNormales[i].existencias= productosNormales[i].existencias-productosAux[i].cantidad
                        }
                        }
                        axios.post('http://localhost:4000/producto/restarCantidadVentaProducto',productosNormales).then((response)=>{
                            if(response.data.mensaje === "Existencia actualizada"){
                                console.log("actualizo existencia")
                            
                                axios.post('http://localhost:4000/carrito/borrarProductosCarrito',mensaje)
                                .then((response) => {
                                    if(response.data.mensaje === "Carrito eliminado"){
                                        console.log("Elimino productos carrito")
                                        this.props.toggle()
                                        this.toggle()
                                    }
                                })
                            }

                        })
                    }
                }).catch((error) => {
                alert('Error de venta, intentelo mas tarde')
        }) 
                
            }
        }).catch((error) => {
            alert('Error de registro de Producto')
        }) 
    }
    
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    
 
    render() {
        return (
            <div >
                <Modal isOpen={this.props.modal} toggle={this.props.toggle} className="modal-lg" >
                 <ModalHeader toggle={this.props.toggle}>Detalle pedido y facturación</ModalHeader>
                    <ModalBody>

                        <div className="row">

                            <div className="col-md-5">
                                <div className="billing-details">
                                    <div className="section-title">
                                        <h3 className="title">Detalles de pedido</h3>
                                    </div>
                                    <div className="form-group">
                                        <Label for="nombre">Nombre*</Label>
                                        <input className="input" type="text" name="nombre" placeholder="Nombre" defaultValue={this.state.usuario.nombre} disabled/>
                                    </div>
                                    
                                    <div className="form-group">
                                         <Label for="correo">Correo*</Label>
                                        <input className="input" type="email" name="correo" placeholder="Correo electronico" defaultValue={this.state.usuario.correo} />
                                    </div>
                                    <div className="form-group">
                                         <Label for="cod_postal">Cíodigo Postal*</Label>
                                        <input className="input" type="text" name="cod_postal" placeholder="Codigo postal" defaultValue={this.state.usuario.codigo_postal} />
                                    </div>
                                    <div className="form-group">
                                        <Label for="tarjeta">Número tarjeta*</Label>
                                        <input className="input" type="numero" name="tarjeta" placeholder="Numero de tarjeta" defaultValue={this.state.usuario.tarjeta} />
                                    </div>
                                    

                                </div>
                                </div>
                                <div className="col-md-7 order-details">
                                    <div className="section-title text-center">
                                        <h3 className="title">Tu orden</h3>
                                    </div>
                                    <div className="order-summary">
                                        <div className="order-col">
                                            <div><strong>PRODUCTO</strong></div>
                                            <div><strong>TOTAL</strong></div>
                                        </div>
                                        <div className="order-products">
                                        {this.props.productos.map(indice => (
                                        <div className="order-col" key={indice.id_producto}>
                                                 <div>{indice.cantidad}x {indice.nombre}</div><div className="iscompra">{this.props.sePuedeComprar ? "":indice.existencia}</div>
                                           <div>{indice.costo}</div>
                                        </div>
                                            ))}
                                            
                                            
                                        </div>
                                       
                                        <div className="order-col">
                                            <div><strong>TOTAL</strong></div>
                                            <div><strong className="order-total">${this.props.total}</strong></div>
                                        </div>
                                    </div>
                                    <CustomInput type="checkbox" id="exampleCustomCheckbox" >
                                    he leído y acepto los <a href="#">terms & conditions</a>
						        	</CustomInput>
                                    {this.props.sePuedeComprar ?                         
                                <a onClick={this.crearVenta}className="primary-btn order-submit">Realizar pedido</a>
                            : <div><br></br>Ha excedido existencias en algun producto, corrige y vuelve a intentar</div>
                            }
                                </div>
                              
                            
                        </div>

                    </ModalBody>
                    <ModalFooter>
                   
                        <Button color="secondary" onClick={this.props.toggle}>Cancelar</Button>:
                        
                
                    </ModalFooter>
                </Modal>
                <ModalEnvio modal={this.state.modal} toggle={this.toggle}/>
            </div>
        );
    }
}

export default ModalPagar;