import React, { Component } from 'react'
import logo from '../logo.png'
import { Link } from 'react-router-dom'
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
            clienteLogueado
        }
    }
    menuOIngreso(opcion) {
        if (opcion) {
            return <MenuEmergente />
        } else {
            return <div>
                <Link to="/login">
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
                                <a href="#" className="logo">
                                    <img src={logo} alt="" />
                                </a>
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
                                    <input className="input" placeholder="Buscar producto" />
                                    <button className="search-btn">Buscar</button>
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

                                <div className="menu-toggle">
                                    <a href="#">
                                        <i className="fa fa-bars"></i>
                                        <span>Menu</span>
                                    </a>
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