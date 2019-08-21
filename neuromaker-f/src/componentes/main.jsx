/* Por el momento solo se tiene el login como ejemplo */
import React from 'react'
import Header from './header'
import Footer from './footer'
import Producto from './producto'
import axios from 'axios'
import { Spinner } from 'reactstrap';
import { Route, Link } from 'react-router-dom'
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
      ]
    }
  }
  componentWillMount() {

    //Axios se encarga de hacer solicitudes de forma sencilla
    axios.post('http://localhost:4000/producto/consultarProductos')
      .then((response) => {

        if (response.data.mensaje === "consulta exitosa") {

          this.setState({ productos: response.data.data })
          this.setState({ cargando: false })
        }

      })
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
            {listaProductos(this.state.productos)}
          </main>
          <Footer />
        </div>
      );
    }
  }


}

export default Main;