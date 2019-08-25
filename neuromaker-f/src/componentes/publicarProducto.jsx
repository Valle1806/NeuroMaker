import { Col, Row, Button, Form, FormGroup, Label, Input, CustomInput, Badge, Fade, CardTitle } from 'reactstrap';
import '../estilos/publicarProducto.css'
import axios from 'axios'
import React from 'react'



class PublicarProducto extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null,
            nombre: props.nombre,
            imagen: props.imagen,
            descripcion: props.descripcion,
            costo: props.costo,
            descuento: props.descuento,
            id_vendedor: props.id_vendedor,
            existencias: props.existencias,
            categoria: 1,
            categorias:[]
        }
    }

    componentWillMount = (e) => {
        this.setState({imagen:'empty.jpg'})

        axios.post('http://localhost:4000/categoria/consultarCategorias')
        .then((response) => {
        if (response.data.mensaje === "Categoria encontrada") {
            this.setState({categorias: response.data.data})
        }

        })
    }

    handleOnChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    enviar = () => {
        const data = {
            nombre: this.state.nombre,
            imagen: this.state.imagen,
            descripcion: this.state.descripcion,
            costo: this.state.costo,
            descuento: this.state.descuento,
            id_vendedor: '1151957133',
            existencias: this.state.existencias,
            categoria: 1
        }
        
        axios.post('http://localhost:4000/producto/publicarProducto', data)
            .then((response) => {
                if(response.data.mensaje==='Producto registrado'){
                    alert(response.data)
                    alert(JSON.stringify(response))
                }
                
            }).catch((error) => {
                alert('Error de registro de Producto')
            })
    }

    onSeleccionImagen = e => {
        e.preventDefault();
        this.setState({ file: e.target.files[0] });
        const formData = new FormData();
        console.log(e.target.files[0])
        formData.append('inputImage', e.target.files[0]);
        const config = {
            cabecera: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:4000/uploadImage", formData, config)
            .then((response) => {
                //alert(JSON.stringify(response.data.path))
                this.setState({imagen:response.data.path})
                console.log(this.state.imagen)
            }).catch((error) => {
            });
    }

    

    getClasificaciones = () => {
        const clasificaciones = axios.post('https://localhost:4000/clasificacion/consultarClasificaciones')
        console.log(clasificaciones)
    }

    render() {
        return (
            <FormGroup className="publicacion">
                <Fade in={true}>
                    <Row><h1>Publicar producto</h1></Row>
                </Fade>
                <Row form>
                    <Col md={6}>
                        <img id="logo" value={this.state.imagen} 
                        src={`http://localhost:4000/uploads/${this.state.imagen}`}
                        className="imagen" />
                        <FormGroup>
                            <Input className="file" type="file" name="inputImagen" placeholder='Categoria' onChange={this.onSeleccionImagen} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Input id='nombre' placeholder='Nombre'
                                value={this.state.nombre}
                                onChange={this.handleOnChange('nombre')} />
                        </FormGroup>
                        <FormGroup>
                            <Input id="costo" placeholder='Costo unitario'
                                value={this.state.costo}
                                onChange={this.handleOnChange('costo')} />
                        </FormGroup>
                        <FormGroup>
                            <Input type="select" name='categoria'>
                                <option value={0} >Categorias</option>
                                {this.state.categorias.map(indice=>(<option key={indice.id-1} value={indice.id} >{indice.nombre}</option>))}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Input type="number" min="10" max="90" step="5" placeholder="Descuento"
                                value={this.state.descuento} onChange={this.handleOnChange('descuento')} />
                        </FormGroup>
                        <FormGroup>
                            <Input type="number" min="1" step="1" placeholder="Existencias"
                                value={this.state.existencias} onChange={this.handleOnChange('existencias')} />
                        </FormGroup>
                        <FormGroup>
                            <Input type="textarea" placeholder="Descripción del producto" noresize
                                value={this.state.descripcion} onChange={this.handleOnChange('descripcion')} />
                        </FormGroup>
                        
                    </Col>
                </Row>
                <hr />
                <Row form>
                    <div className="center">
                        <Button color="info" onClick={this.enviar}>
                            Publicar producto
                        </Button>
                    </div>
                </Row>

            </FormGroup>
        );
    }
}

export default PublicarProducto;