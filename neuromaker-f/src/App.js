import React, {Component} from 'react';
import Main from './componentes/main'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Header from './componentes/header'
import LoginCliente from './componentes/loginClient'
import Regitro from './componentes/registroClient'
import Example from './componentes/usuario'
import { Fade } from 'reactstrap';
import Categoria from './componentes/categorias'
import Arituclo from './componentes/articulo'
import DetalleProducto from './componentes/detalle_ producto'
import axios from 'axios'
import Footer from './componentes/footer';

//En esta parte renderizamos lo prinipal
class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            clienteLogueado: false,
            productoSeleccionado: ''
            
        };
        this.handleChangeClienteLog = this.handleChangeClienteLog.bind(this)
        this.cambiarProdcutoSeleccionado= this.cambiarProdcutoSeleccionado.bind(this)
    }

    handleChangeClienteLog(valor){
        this.setState({
            clienteLogueado: valor
        })
    }
    cambiarProdcutoSeleccionado(valor){
        this.setState({productoSeleccionado:valor})
    }

   

render(){
    
    const propiedades={
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

    const propiedades2={
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
    const eleccion={
        login: this.state.clienteLogueado
    }

    return (
        //En react, para dar estilos CSS usamos className en lugar de class
        <div className="App" >
            <BrowserRouter>
                 <Switch>
                    
                   
                <Route path="/detalle/:id" render={() =>(
                    <div>
                    <Fade in={true}>
                    <Header/>
                    <DetalleProducto login={this.state.clienteLogueado}/>
                    <Footer/>
                    </Fade>
                    </div>
                )} >
                </Route>
                <Route path="/login" render={() => 
                    this.state.clienteLogueado ? 
                    <Redirect to="/"/> :
                    (<div>
                    <Fade in={true} className="mt-3">                
                    <LoginCliente login={this.handleChangeClienteLog}/>
                    </Fade>
                    </div>
                    )}>
                </Route>
                <Route  path="/" render={() =>(
                    <div>
                    <Fade in={true}>
                    <Main {...eleccion} />
                    </Fade>
                    </div>
                )} >
                </Route>

                <Route path="/registro" render={() => 
                    this.state.clienteLogueado ? 
                    <Redirect to="/" /> : 
                    (<div>
                    <Fade in={true} className="mt-3">    
                    <Regitro 
                    login={this.state.clienteLogueado} 
                    />
                    </Fade>
                    </div>
                    )}>
                </Route>
                
                <Route path="/config" render={() => 
                    this.state.clienteLogueado ? (<div>                                    
                    <Header {...this.props} />
                    <Regitro />
                    </div>) : <Redirect to="/" />}>
                </Route>

                <Route path="/categorias" render={() => 
                    this.state.adminLogueado ? (<div>                                    
                    <Categoria {...this.props} />                   
                    </div>) : <Redirect to="/" />}>
                </Route>

                <Route path="/productos" render={() => 
                    this.state.adminLogueado ? (<div>                                    
                    <Arituclo {...this.props} />                   
                    </div>) : <Redirect to="/" />}>
                </Route>
                </Switch>

            </BrowserRouter>
        </div>
    );
}
}
export default App;