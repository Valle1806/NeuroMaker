/* Por el momento solo se tiene el login como ejemplo */
import React from 'react'
import Header from './header'
import Footer from './footer'
import Producto from './producto'
import DetalleProducto from './detalle_ producto'
/*
Los componentes con estado deben ser clases
vea un ejemplo de componente sin estado en el
footer o header
*/


const listaProductos = (arreglo) => (
  
  arreglo.map(indice => (<Producto producto ={indice} key={indice.nombre}/>))
);


const Main = (props) => {
    //Aqui podemos hacer validaciones para retonar diferentes cosas
    console.log(props)
    if(props.escoger==="detalle"){
      return(
        <div>
          <Header/>
          <main>
            <DetalleProducto/>
          </main>
         <Footer/>
        </div>
      );
    }else{
    //El metodo retunr es necesario
    
    return (
      <div>
      <Header/>
        <main>
        {listaProductos(props.productos)}
      </main>
      <Footer/>
      </div>

    );}
  
}

export default Main;