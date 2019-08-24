/* Por el momento solo se tiene el login como ejemplo */
import React from 'react'
import Header from './header'
import Footer from './footer'
import Producto from './producto'
import axios from 'axios'
import Paginacion from './paginacion'
import { Spinner } from 'reactstrap';
import { Route, Link, withRouter } from 'react-router-dom'
/*
Los componentes con estado deben ser clases
vea un ejemplo de componente sin estado en el
footer o header
*/



const listaProductos = (arreglo) => (
  arreglo.map(indice => (
    <Link key={indice.id} to={`/detalle/${indice.id}`} ><Producto producto={indice} key={indice.id} /></Link>

  ))

);



class Main extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token")
    let clienteLogueado = true;
    if (token == null) {
      clienteLogueado = false;
    }
    this.state = {
      clienteLogueado,
      cargando: true,
      productos: [
        {
          nombre: ''
        }
      ],
      paginas: '',
      numPagina: 1,
      paginaProductos: [
        {
          nombre: ''
        }
      ]
    }
    this.handleOnchange=this.handleOnchange.bind(this)
  }

  handleOnchange =  (valor) => {
    console.log(valor);
    if(valor != 0 && valor <= this.state.paginas){
      console.log(valor)
      let nel = [];
      for(var x=((valor * 4) - 4); x<(valor * 4) && x<this.state.productos.length; x++){
        nel.push(this.state.productos[x]);
      }
      this.setState({numPagina: valor, paginaProductos: nel});
    }
  }

  componentWillMount() {
    console.log(this.props)
    if(this.props.match.params.filtro != null){
        //Axios se encarga de hacer solicitudes de forma sencilla
      axios.post(`http://localhost:4000/producto/filtrarProductos/${this.props.match.params.filtro}`)
      .then((response) => {

        if (response.data.mensaje === "consulta exitosa") {
          
          this.setState({ productos: response.data.data })
          this.setState({paginas: Math.ceil((this.state.productos.length)/4)})
          this.setState({ cargando: false })
        }

      })
    }else{
        //Axios se encarga de hacer solicitudes de forma sencilla
      axios.post('http://localhost:4000/producto/consultarProductos')
      .then((response) => {

        if (response.data.mensaje === "consulta exitosa") {

          this.setState({ productos: response.data.data })
          this.setState({paginas: Math.ceil((this.state.productos.length)/4)})
          this.setState({ cargando: false })
          var aux = response.data.data.slice(0,4);
          this.setState({paginaProductos:  aux})
        }

      })
      }
  }


  render() {
    if (this.state.cargando) {
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
    } else {
      return (

        <div>
          <Header />
          <main>
            {listaProductos(this.state.paginaProductos)}
            <div>
              <Paginacion paginas = {this.state.paginas} 
              funcion = {this.handleOnchange} numPagina = {this.state.numPagina}/>
            </div>
          </main>
          <Footer />
        </div>
      );
    }
  }


}

export default withRouter(Main);