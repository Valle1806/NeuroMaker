import React, { Component } from 'react';
import Main from './componentes/main'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Header from './componentes/header'
import LoginCliente from './componentes/loginClient'
import Regitro from './componentes/registroClient'
import Example from './componentes/usuario'
import { Fade } from 'reactstrap';
import Arituclo from './componentes/producto'
import DetalleProducto from './componentes/detalle_producto'
import axios from 'axios'
import Footer from './componentes/footer';
import BuscarPCategorias from './componentes/buscarPCategoria'
import PublicarProducto from './componentes/publicarProducto'

//En esta parte renderizamos lo prinipal
class App extends Component {
    constructor(props) {
        super(props)
        const token= localStorage.getItem("token")
        let clienteLogueado= true;
        if(token==null){
            clienteLogueado= false;
        }
        this.state = {
            clienteLogueado,
            productoSeleccionado: ''

        };
        this.handleChangeClienteLog = this.handleChangeClienteLog.bind(this)
        this.cambiarProdcutoSeleccionado = this.cambiarProdcutoSeleccionado.bind(this)
    }

    handleChangeClienteLog(valor) {
        this.setState({
            clienteLogueado: valor
        })
    }
    cambiarProdcutoSeleccionado(valor) {
        this.setState({ productoSeleccionado: valor })
    }



    render() {

        const propiedades = {
            tipo: "cc",
            numero: "",
            nombre: "",
            apellidos: "",
            correo: "",
            clave: "",
            direccion: "",
            nacimiento: "",
            cumpleanios: "",
            textoBoton: "REGISTRARME"
        };

        const propiedades2 = {
            tipo: "CC",
            numero: "12151518",
            nombre: "Esneider Manzano",
            apellidos: "Aranago",
            correo: "esneider.manzano@correounivalle.edu.co",
            clave: "stefierrote",
            direccion: "Cra 28 C # 54 - 123",
            nacimiento: "1995-10-18",
            cumpleanios: "1995-10-18",
            textoBoton: "ACTUALIZAR"
        };
        

        return (
            //En react, para dar estilos CSS usamos className en lugar de class
            <div className="App" >
                <BrowserRouter>
                    <Switch>
                    <Route path="/publicarProducto" render={()=>
                        this.state.clienteLogueado ?
                        (
                            <div>
                            <Fade in={true}>
                                <Header />
                                <PublicarProducto/>
                                <Footer/>
                            </Fade>
                            </div>
                        ): <Redirect to="/login" /> 
                    }
                        /> 
                        <Route path="/detalle/:id" render={() => (
                            <div>
                                <Fade in={true}>
                                    
                                    <DetalleProducto login={this.state.clienteLogueado} />
                                    <Footer />
                                </Fade>
                            </div>
                        )} >
                        </Route>
                        <Route exact path="/categoria/:categoria" render={() => (
                             
                             <div>
                                 <Fade in={true}>
                                     <BuscarPCategorias/>
                                 </Fade>
                             </div>
                         )} >
                         </Route>
                        <Route path="/login" render={() =>
                            this.state.clienteLogueado ?
                                <Redirect to="/" /> :
                                (<div>
                                    <Fade in={true} className="mt-3">
                                        <LoginCliente  />
                                    </Fade>
                                </div>
                                )}>
                        </Route>
                        <Route path="/registro" render={() =>
                            this.state.clienteLogueado ?
                                <Redirect to="/" /> :
                                (<div>
                                    <Fade in={true} className="mt-3">
                                        <Regitro />
                                    </Fade>
                                </div>
                                )}>
                        </Route>
                        <Route exact path="/:filtro" render={() => (
                             
                             <div>
                                 <Fade in={true}>
                                     <Main/>
                                 </Fade>
                             </div>
                         )} >
                         </Route>
 
                        <Route exact path="/" render={() => (
                            <div>
                                <Fade in={true}>
                                    <Main/>
                                </Fade>
                            </div>
                        )} >
                        </Route>
                    
                        
                    
                    </Switch>

                </BrowserRouter>
            </div>
        );
    }
}
export default App;