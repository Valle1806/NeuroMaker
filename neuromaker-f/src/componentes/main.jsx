/* Por el momento solo se tiene el login como ejemplo */
import React from 'react'
import Header from './header'
import Footer from './footer'
import Producto from './producto'
import DetalleProducto from './detalle_ producto'
import axios from 'axios'
import { Spinner } from 'reactstrap';
/*
Los componentes con estado deben ser clases
vea un ejemplo de componente sin estado en el
footer o header
*/


const listaProductos = (arreglo) => (
  
  arreglo.map(indice => (<Producto producto ={indice} key={indice.nombre}/>))
);

class Main  extends React.Component {
  constructor(props){
    super(props);
    this.state={
      cargando: true,
      caso: props.eleccion,
      productos: [
        {
          nombre:''
        }
      ]
    }
  }
  componentWillMount() {
    
    //Axios se encarga de hacer solicitudes de forma sencilla
   axios.post('http://localhost:4000/producto/traer')
   .then((response) => {
     
   
     if(response.data.mensaje==="Producto encontrado"){
     
       this.setState({productos:response.data.data}) 
       this.setState({cargando:false})
       console.log(this.state.productos);
     }

   })
  }

  renderSwitch(param) {
    switch(param) {
      case 'detalle':
        return(
          <DetalleProducto/>
        );
      default:
        return (
          
            listaProductos(this.state.productos)
          
        );
    }
  }

  render(){
    if(this.state.cargando){
      return (
        //Falta centrarlo
        <div>
          
      {/*<Spinner style={{ position: 'relative', right: '40px', top: '50px' }} type="grow" color="primary" />*/}
          <Spinner type="grow" color="secondary" />
          <Spinner type="grow" color="success" />
          <Spinner type="grow" color="danger" />
          <Spinner type="grow" color="warning" />
          <Spinner type="grow" color="info" />
          <Spinner type="grow" color="light" />
          <Spinner type="grow" color="dark" />
         
        </div>
      );
    }else{
      return(
      
        <div>
            <Header/>
            <main>
              {this.renderSwitch(this.state.caso)}
            </main>
          <Footer/>
          </div>  
      );
    }
  }
    
  
}

export default Main;