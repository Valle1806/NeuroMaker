import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios'

 
const h = [
    {
        nombre: "Camara",
        descripcion: "Una buena camara xdxdxd",
        marca: "SONY",
        precio: "150000"
    },
    {
        nombre: "Cinturon",
        descripcion: "Correa a estas gonorreas",
        marca: "Quinta paja",
        precio: "15000000"
    }
]

class Articulo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nombre: "",
            imagen: "",
            fabricante: "",            
            descripcion: "",
            marca: "",
            precio: "",
            detalle: "",
            cantidad: "",
            pro: "",
            modificarProducto: {
                nombre: "",
                descripcion: "",
                marca: "",
                precio: "",
            },
            idNombreSubCategoria: "",
            subCategorias: [
                {
                    nombre: ""
                }
            ],
            productos: [
                {
                    nombre: ""
                }
            ]
        }
        this.onChange = this.onChange.bind(this) 
        this.ejemplo = this.ejemplo.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.onModifyChange = this.onModifyChange.bind(this)

        this.crearProducto = this.crearProducto.bind(this)
        this.getSubCategorias = this.getSubCategorias.bind(this)

    }

    getProductos(){
        axios.get('http://localhost:4000/api/productos')
        .then((response) => {
            //console.log(response.data.data)
            console.log(response.data.data)
            this.setState({
                subCategorias: response.data.data
            })
        })
    }

    getSubCategorias(){
        axios.get('http://localhost:4000/api/subcategorias')
        .then((response) => {
            //console.log(response.data.data)
            console.log(response.data.data)
            this.setState({
                subCategorias: response.data.data
            })
        })
    }

    componentDidMount(){
        this.getSubCategorias()
    }


    ejemplo(){
        
        //console.log("Que paso men")
        //h.map(indice => <option >{indice.nombre}</option>)
        /*
       for(var i in h){
            //<option>h[i].nombre</option>
            console.log(h[i].nombre)
        }
        */
    }

    crearProducto() {
        const mensaje = {
            nombre: this.state.nombre,
            imagen_url: this.state.imagen,
            empresa_fabricante: this.state.fabricante,            
            descripcion: this.state.descripcion,
            precio_unitario: this.state.precio,
            descuento: 0,
            iva: 19,
            unidades_disponibles: this.state.cantidad,
            detalles: this.state.detalle,
            id_subcategoria: this.state.idNombreSubCategoria,
        }
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.post('http://localhost:4000/api/productos', mensaje)
            .then((response) => {
                alert(JSON.stringify(response.data))
            })
    }

    onChange = input => e =>{ 
        this.setState({ [input]: e.target.value});
    }  

    onModifyChange = input => e =>{ 
        const { modificarProducto } = {...this.state};
        const currentState = modificarProducto;
        currentState[input] = e.target.value
        this.setState({
            modificarProducto: currentState    
        });
    }  

    onSelect(e) {         
        this.setState({modificarProducto: h[[e.target.value]]})
    }  
    
    render() {
        const subCategorias = this.state.subCategorias;
        const productos = this.state.productos;

        return (
            <div className="categorias">
                <div id="espacio" />
                <h2>Creacion de Productos</h2>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Nombre del producto</Label>
                        <Input type="text" name="email" id="nombrePoducto" 
                        placeholder="Nombre" 
                        onChange = {this.onChange('nombre')}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Imagen</Label>
                        <Input type="text" name="email" id="nombrePoducto" 
                        placeholder="URL" 
                        onChange = {this.onChange('imagen')}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Fabricante</Label>
                        <Input type="text" name="email" id="nombrePoducto" 
                        placeholder="URL" 
                        onChange = {this.onChange('fabricante')}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Cantidad</Label>
                        <Input type="text" name="email" id="marcaProducto" 
                        placeholder="Marca" 
                        onChange = {this.onChange('cantidad')}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Detalles</Label>
                        <Input type="text" name="email" id="marcaProducto" 
                        placeholder="Marca" 
                        onChange = {this.onChange('detalle')}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Precio del producto</Label>
                        <Input type="text" name="email" id="marcaProducto" 
                        placeholder="Precio" 
                        onChange = {this.onChange('precio')}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleText">Descripcion</Label>
                        <Input type="textarea" name="text" id="descripcion" 
                        onChange = {this.onChange('descripcion')}/>
                    </FormGroup>

                    <FormGroup>
                    <Input type="select" name="select" id="exampleSelect"
                        onChange={this.onChange('idNombreSubCategoria')}>
                        {subCategorias.map((indice, index) => 
                        <option key={index} 
                        value={indice.id_subcategoria}>{indice.nombre}</option>)}
                        </Input>

                    </FormGroup>

                    <div className="center">
                    <Button color="primary" onClick={this.crearProducto}>Crear</Button>
                    </div>
                </Form>


                <h2>Modificar Producto</h2>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Seleccionar producto</Label>
                            <Input type="select" name="select" id="exampleSelect" 
                            onChange={this.onSelect}>
                                {h.map((indice, index) => 
                                <option key={index} 
                                value={index}>{indice.nombre}</option>)}
                            </Input>                        
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Nombre del producto</Label>
                        <Input type="text" name="email" id="nombrePoducto"                         
                        placeholder="Nombre" 
                        onChange = {this.onModifyChange('nombre')}
                        value={this.state.modificarProducto.nombre}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Marca del producto</Label>
                        <Input type="text" name="email" id="marcaProducto" 
                        value={this.state.modificarProducto.marca}
                        placeholder="Marca" 
                        onChange = {this.onModifyChange('marca')}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Precio del producto</Label>
                        <Input type="text" name="email" id="marcaProducto" 
                        value={this.state.modificarProducto.precio}
                        placeholder="Precio" 
                        onChange = {this.onModifyChange('precio')}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleText">Descripcion</Label>
                        <Input type="textarea" name="text" id="descripcion"
                        value={this.state.modificarProducto.descripcion} 
                        onChange = {this.onModifyChange('descripcion')}
                        />
                    </FormGroup>

                    
                    <div className="center">
                    <Button color="primary">Modificar</Button>{' '}
                    <Button color="danger">Eliminar</Button>{' '}
                    </div>
                </Form>
            </div>
        )
    }
}

export default Articulo;