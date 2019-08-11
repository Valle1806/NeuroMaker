import React, { Component }  from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import LoginCliente from './componentes/loginCliente';
import RegistroUsuario from './componentes/registroUsuario';
import { Fade } from 'reactstrap';

//En esta parte renderizamos lo prinipal
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
        clienteLogueado: false
    };
    this.handleChangeClienteLog = this.handleChangeClienteLog.bind(this)
  } 
  handleChangeClienteLog(valor){
    this.setState({
      clienteLogueado: valor
    })
  }

render() {
  return(
      //En react, para dar estilos CSS usamos className en lugar de class
       <div className="App" >
            <BrowserRouter>
              
                <Route path="/login" render={() => 
                    this.state.clienteLogueado ? 
                    <Redirect to="/"/> :
                    (<div>
                    <Fade in={true} className="mt-3">                
                    <LoginCliente login={this.handleChangeClienteLog.bind(this)}/>
                    </Fade>
                    </div>
                    )}>
                </Route>
                <Route path="/create" render={() => 
                    this.state.clienteLogueado ? 
                    <Redirect to="/"/> :
                    (<div>
                    <Fade in={true} className="mt-3">                
                    <RegistroUsuario/>
                    </Fade>
                    </div>
                    )}>
                </Route>
            </BrowserRouter>
        </div>
  );
}
}

export default App;
