import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios'

class Categorias extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categorias: {},
            nuevaCategoria: "",
            nuevoNombre: "",
            idNuevoNombre: "", 
            nuevaSubCategoria: "",
            categorias: [
                {
                    nombre: ""
                }
            ],
            newSubTagName: "",
            idNuevoNombreSubCategoria: "",
            subCategorias: [
                {
                    nombre: ""
                }
            ]
        }
        this.getCategorias = this.getCategorias.bind(this)
        this.crearCategoria = this.crearCategoria.bind(this)
        this.actualizarCategoria = this.actualizarCategoria.bind(this)
        this.borrarCategoria = this.borrarCategoria.bind(this)
        this.getSubCategorias = this.getSubCategorias.bind(this)
        this.crearSubCategoria = this.crearSubCategoria.bind(this)
        this.actualizarSubCategoria = this.actualizarSubCategoria.bind(this)
        this.borrarSubCategoria = this.borrarSubCategoria.bind(this)
        this.onChange = this.onChange.bind(this) 
        this.onSelect = this.onSelect.bind(this)
        this.onModifyChange = this.onModifyChange.bind(this)

    }

    
    getCategorias(){
        axios.get('http://localhost:4000/api/categorias')
        .then((response) => {
            //console.log(response.data.data)
            console.log(response.data.data)
            this.setState({
                categorias: response.data.data
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
        this.getCategorias()
        this.getSubCategorias()
    }

    /*
    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.categorias != nextState.categorias){
            console.log("Son diferentes")
            return true
        }else{
            this.getCategorias()
            return false
        }
      }
*/

    crearCategoria() {
        const mensaje = {
            nombre: this.state.nuevaCategoria,
        }
        
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.post('http://localhost:4000/api/categorias', mensaje)
            .then((response) => {
                alert(JSON.stringify(response.data))
                this.getCategorias()
        })
    }

    actualizarCategoria() {
        const mensaje = {
            id_categoria: this.state.idNuevoNombre,
            nombre: this.state.nuevoNombre
        }
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.put('http://localhost:4000/api/categorias/update', mensaje)
            .then((response) => {
                alert(JSON.stringify(response.data))
                this.getCategorias()
        })
        
    }

    borrarCategoria(){
        const id_categoria = this.state.idNuevoNombre;
        
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.delete('http://localhost:4000/api/categorias/' + id_categoria)
            .then((response) => {
                alert(JSON.stringify(response.data))
                this.getCategorias()
        })
    }

    crearSubCategoria() {
        const mensaje = {
            nombre: this.state.nuevaSubCategoria,
            id_categoria: this.state.idNuevoNombre
        }
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.post('http://localhost:4000/api/subcategorias', mensaje)
            .then((response) => {
                alert(JSON.stringify(response.data))
                this.getSubCategorias()
        })
    }

    actualizarSubCategoria() {
        const id_subcategoria =  this.state.idNuevoNombreSubCategoria;
        const mensaje = {
            nombre: this.state.newSubTagName
        }
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.put('http://localhost:4000/api/subcategorias/' + id_subcategoria, mensaje)
            .then((response) => {
                alert(JSON.stringify(response.data))
                this.getSubCategorias()
        })        
    }

    borrarSubCategoria(){
        const id_subcategoria = this.state.idNuevoNombreSubCategoria;
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.delete('http://localhost:4000/api/subcategorias/' + id_subcategoria)
            .then((response) => {
                alert(JSON.stringify(response.data))
                this.getSubCategorias()
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
        this.setState({modificarProducto: this.state.categorias[[e.target.value]]})
    }   
    
    render() {
        const categorias = this.state.categorias;
        const subCategorias = this.state.subCategorias;
        //console.log(categorias)
        return (
            <div className="categorias">
                <div id="espacio" />
                <h2>Gestion de Categorias</h2>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Crear categoria</Label>
                        <Input type="text" name="email" id="crearCategoria" 
                        placeholder="nombre de la categoria" 
                        onChange = {this.onChange('nuevaCategoria')}/>
                        <Button color="primary" onClick={this.crearCategoria}>Crear</Button>{' '}
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Modificar categoria</Label>
                        <Input type="select" name="select" id="exampleSelect"
                        onChange={this.onChange('idNuevoNombre')}>
                        {categorias.map((indice, index) => 
                        <option key={index} 
                        value={indice.id_categoria}>{indice.nombre}</option>)}
                        </Input>
                        <Input type="text" name="email" id="modificarCategoria" 
                        onChange={this.onChange('nuevoNombre')}placeholder="Nuevo nombre" />
                        <Button color="primary" onClick={this.actualizarCategoria}>Modificar</Button>{' '}
                        <Button color="danger" onClick={this.borrarCategoria}>Eliminar</Button>{' '}
                    </FormGroup>

                </Form>
                <br />
                <h2>Gestion de Subcategorias</h2>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Crear Subcategoria</Label>
                        <Input type="select" name="select" id="exampleSelect"
                        onChange={this.onChange('idNuevoNombre')}>
                        {categorias.map((indice, index) => 
                        <option key={index} 
                        value={indice.id_categoria}>{indice.nombre}</option>)}
                        </Input>
                        <Input type="text" name="email" id="crearCategoria" 
                        placeholder="nombre de la subcategoria" 
                        onChange = {this.onChange('nuevaSubCategoria')}/>
                        <Button color="primary" onClick={this.crearSubCategoria} >Crear</Button>{' '}
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Modificar subcategoria</Label>
                        <Input type="select" name="select" id="exampleSelect"
                        onChange={this.onChange('idNuevoNombreSubCategoria')}>
                        {subCategorias.map((indice, index) => 
                        <option key={index} 
                        value={indice.id_subcategoria}>{indice.nombre}</option>)}
                        </Input>
                        <Input type="text" name="email" id="modificarCategoria" 
                        placeholder="Nuevo nombre" 
                        onChange = {this.onChange('newSubTagName')}/>
                        <Button color="primary" onClick={this.actualizarSubCategoria}>Modificar</Button>{' '}
                        <Button color="danger" onClick={this.borrarSubCategoria}>Eliminar</Button>{' '}

                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default Categorias;