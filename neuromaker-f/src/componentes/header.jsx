import React, { Component } from 'react'
import logo from '../logo.png'
import { Link, Redirect } from 'react-router-dom'
import { Button} from 'reactstrap'
import axios from 'axios'
import MenuEmergente from "./menuEmergenteUsuario";
//Header simple
class Header extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("token")
        let clienteLogueado = true;
        if (token == null) {
            clienteLogueado = false;
        }
        this.state = {
            clienteLogueado,
            filtro: '',
            redirect: false,
            redirectC: false,
            redirectP: false,
            categoria: 1,
            categorias:[

            ]

        }
        this.handleOnchange= this.handleOnchange.bind(this)
        this.setRedirectCategoria=this.setRedirectCategoria.bind(this)

    }
    handleOnchange = input => e => {
        this.setState({ [input]: e.target.value });
      }
    enviarABuscar=()=>{
        //return <Redirect to={`${window.location.origin + this.state.filtro}`}/>
       
        if(this.state.redirect){
            window.location= `/${this.state.filtro}`;
           //  return <Redirect from={window.location.pathname} to={`/${this.state.filtro}`}/>
           
        }

    }
    publicarProducto=()=>{
        //return <Redirect to={`${window.location.origin + this.state.filtro}`}/>
       
        if(this.state.redirectP){
            window.location= "/publicarProducto";
           //  return <Redirect from={window.location.pathname} to={`/${this.state.filtro}`}/>
           
        }

    }
    setRedirect=()=>{
        this.setState({redirect:true})
    }
    setRedirecP=()=>{
        this.setState({redirectP:true})
    }
    setRedirectCategoria( e) {
        console.log(e.target.value)
        this.setState({ categoria: e.target.value });
        this.setState({redirectC:true})
      }
    enviarABuscarCategoria=()=>{
        //return <Redirect to={`${window.location.origin + this.state.filtro}`}/>
     
        if(this.state.redirectC){
            window.location= `/categoria/${this.state.categoria}`;
           //  return <Redirect from={window.location.pathname} to={`/${this.state.filtro}`}/>
           
        }

    }
   

    componentWillMount(){
        //Axios se encarga de hacer solicitudes de forma sencilla
    axios.post('http://localhost:4000/categoria/consultarCategorias')
    .then((response) => {
      if (response.data.mensaje === "Categoria encontrada") {
        this.setState({categorias: response.data.data})
      }

    })
    }
    
    menuOIngreso(opcion) {
        if (opcion) {
            return <MenuEmergente />
        } else {
            return <div>
                <Link className="link-header" to="/login">
                    <span>Ingresar</span>
                </Link>
            </div>
        }
    }

    render() {
        return (
            <div id="header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="header-logo">
                                <div  className="logo">
                                    <Link  to="/"> 
                                    <img src={logo} alt="" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="header-search">
                                <form>
                                    <select className="input-select" onChange={this.setRedirectCategoria}>
                                        <option value={0} >Categorias</option>
                                        {this.state.categorias.map(indice=>(<option key={indice.id-1} value={indice.id} >{indice.nombre}</option>))}
                                       
                                    </select>
                                    {this.enviarABuscarCategoria()}
                                    <input onChange={this.handleOnchange('filtro')} className="input" placeholder="Buscar producto" />
                                    
                                    <Button onClick={this.setRedirect} className="search-btn">Buscar</Button>
                                    {this.enviarABuscar()}
                                   
                                </form>
                            </div>
                        </div>

                        <div className="col-md-3 clearfix">
                            
                            <div className="header-ctn">
                            <Button onClick={this.setRedirectP} className="btn-publicar">Publicar</Button>
                                    {this.publicarProducto()}
                            
                                {// Carrito
                                }


                                <div className="ingresarCliente">
                                    <i className="fa fa-user"></i>
                                    {this.menuOIngreso(this.state.clienteLogueado)}

                                </div>

                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Header;