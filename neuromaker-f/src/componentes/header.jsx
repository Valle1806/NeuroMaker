import React from 'react'
import logo from '../logo.png'
import {Link} from 'react-router-dom'
import {Button} from 'reactstrap'
//Header simple
const Header = (props) => {
    return(
        <div id="header">
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className="header-logo">
                        <a href="#" className="logo">
                            <img src={logo} alt=""/>
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
                            <input className="input" placeholder="Buscar producto"/>
                            <button className="search-btn">Buscar</button>
                        </form>
                    </div>
                </div>

                <div className="col-md-3 clearfix">
                    <div className="header-ctn">
                        
                        <div className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                <i className="fa fa-shopping-cart"></i>
                                <span>Your Cart</span>
                                <div className="qty">3</div>
                            </a>
                            <div className="cart-dropdown">
                                <div className="cart-list">
                                    <div className="product-widget">
                                        <div className="product-img">
                                            <img src="./img/product01.png" alt=""/>
                                        </div>
                                        <div className="product-body">
                                            <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                            <h4 className="product-price"><span className="qty">1x</span>$980.00</h4>
                                        </div>
                                        <button className="delete"><i className="fa fa-close"></i></button>
                                    </div>

                                    <div className="product-widget">
                                        <div className="product-img">
                                            <img src="./img/product02.png" alt=""/>
                                        </div>
                                        <div className="product-body">
                                            <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                            <h4 className="product-price"><span className="qty">3x</span>$980.00</h4>
                                        </div>
                                        <button className="delete"><i className="fa fa-close"></i></button>
                                    </div>
                                </div>
                                <div className="cart-summary">
                                    <small>3 Item(s) selected</small>
                                    <h5>SUBTOTAL: $2940.00</h5>
                                </div>
                                <div className="cart-btns">
                                    <a href="#">View Cart</a>
                                    <a href="#">Checkout  <i className="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div>
                        </div>

                        <div className="ingresarCliente">
                            <i className="fa fa-user"></i>
                            <Link to="/login">
                                <span>Ingresar</span>
                                </Link>
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
    )
}
export default Header;