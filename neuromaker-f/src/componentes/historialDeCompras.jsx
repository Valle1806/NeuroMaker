import React from 'react'
import { Table } from 'reactstrap';
import axios from 'axios'


export default class HistorialDeCompras extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            cedula:'',
            productos : []
        }
    }

    componentWillMount(){
        const id_comprador= localStorage.getItem("id")
        this.setState({cedula: id_comprador})
        const mensaje = {
            cedula: id_comprador
        }
        axios.post('http://localhost:4000/usuario/obtenerCompras',mensaje)
        .then(res => {
            if(res.data.mensaje === "consulta exitosa"){
                this.setState({productos: res.data.data})
            }
        })
    }

    render(){
        return(
            <div className='seccionTabla'>
            <h1 className='tituloTabla'>Compras</h1>
            <p>Este es su historial de compras realizadas</p>
            <Table className='tablaRegistro'>
                <thead>
                    <tr>
                        <th>Nombre del Producto</th>
                        <th>Cantidad</th>
                        <th>Costo unitario</th>
                        <th>Fecha de compra</th>
                        <th>Codigo del vendedor</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.productos.map(producto =>{
                    return(
                        <tr>
                            <td>{producto.nombre}</td>
                            <td>{producto.cantidad}</td>
                            <td>{producto.costounitario}</td>
                            <td>{producto.fechacompra}</td>
                            <td>{producto.codvendedor}</td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            </div>
        )
    }
}