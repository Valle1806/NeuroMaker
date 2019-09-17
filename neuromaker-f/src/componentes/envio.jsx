import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label , CustomInput} from 'reactstrap';
import compraE from '../descarga.png'

class ModalEnvio extends React.Component {
    constructor(props) {
        super(props);
        
    }

    
 
    render() {
        return (
            <div >
                <Modal isOpen={this.props.modal} toggle={this.props.toggle} className="modal-lg" >
                 <ModalHeader toggle={this.props.toggle}>Detalles de envío</ModalHeader>
                    <ModalBody>

                            <div>
                                <center><h1>Tu compra ha finalizado con exito</h1></center>
                                <br></br>
                                <center><img src={compraE} alt="" /></center>
                                <br></br>
                                <center><h5>Tu envío se encuentra en camino</h5></center>

                            </div>

                    </ModalBody>
                    <ModalFooter>
                      
                        <Button color="secondary" onClick={this.props.toggle}>Aceptar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalEnvio;