import React, { Component } from 'react'
import logo from '../logo.png'
import { Link, Redirect } from 'react-router-dom'
import { Button} from 'reactstrap'
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
            redirect: false

        }
        this.handleOnchange= this.handleOnchange.bind(this)
    }
    handleOnchange = input => e => {
        this.setState({ [input]: e.target.value });
      }
    enviarABuscar=()=>{
        //return <Redirect to={`${window.location.origin + this.state.filtro}`}/>
       
        if(this.state.redirect){
            
             return <Redirect from={window.location.pathname} to={`/${this.state.filtro}`}/>
            
        }

    }
    setRedirect=()=>{
        this.setState({redirect:true})
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
                                    <Link to="/"> 
                                    <img src={logo} alt="" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="header-search">
                                <form>
                                    <select className="input-select">
                                        <option value="0">Categorias</option>
                                        <option value="1">Computadores</option>
                                        <option value="1">Celulares</option>
                                    </select>
                                    <input onChange={this.handleOnchange('filtro')} className="input" placeholder="Buscar producto" />
                                    
                                    <Button onClick={this.setRedirect} className="search-btn">Buscar</Button>
                                    {this.enviarABuscar()}
                                </form>
                            </div>
                        </div>

                        <div className="col-md-3 clearfix">
                            <div className="header-ctn">


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