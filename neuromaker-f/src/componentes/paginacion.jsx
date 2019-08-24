import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

/*
const PaginacionItem = (props) => {
    return (
       
        <PaginationItem>
                    <PaginationLink>
                        {props.pagina}
                    </PaginationLink>
        </PaginationItem>
       
    )
}
*/
/*
    var aux = [];
    for(var x=1; x<=cantidad; x++){
        aux.push(x);
    }
    console.log(aux)
*/
/*
const pintarPaginas = (props, funcion) => { 
    console.log(props)
    var aux = [];
    for(var x=1; x<=props.paginas; x++){
        aux.push(x);
    }
    console.log(props);
return(
    aux.map(indice => (
      <PaginacionItem key={indice} pagina={indice}  onClick = {()=>this.props.funcion(indice)}/>  
    ))
  
)};
*/
export default class Paginacion extends React.Component {
    constructor(props){
        super(props);
        this.state={
            redireccionar: false,
            nel:''
        }
        this.setRedireccionar=this.setRedireccionar.bind(this)
        this.pintarPaginas=this.pintarPaginas.bind(this)
    }

    pintarPaginas = (paginas, funcion) => { 
        
     };
    setRedireccionar (e){
        
       
        this.props.funcion(e.target.value)
       
       
    }

    render() {

        var aux = [];
        for(var x=1; x<=this.props.paginas; x++){
            aux.push(x);
        }
       
        return (
            <Pagination aria-label="Page navigation example">
                <PaginationItem>
                    <PaginationLink first value={1} onClick = {e => this.setRedireccionar(e, "value")}/>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink previous value={parseInt(this.props.numPagina)-1} onClick = {e => this.setRedireccionar(e, "value")}/>
                </PaginationItem>
                { 
                    aux.map(indice => (
                    <PaginationItem key={indice}>
                        <PaginationLink value={indice} onClick = {e => this.setRedireccionar(e, "value")}>
                            {indice}
                        </PaginationLink>
                    </PaginationItem>
       
                       ))                                        
                }
                <PaginationItem>
                    <PaginationLink next value={parseInt(this.props.numPagina)+1} onClick = {e => this.setRedireccionar(e, "value")}/>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink last value={this.props.paginas} onClick = {e => this.setRedireccionar(e, "value")}/>
                </PaginationItem>
            </Pagination>
        );
    }
}