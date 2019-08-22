import React, { Component } from 'react';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Spinner } from 'reactstrap';
import classnames from 'classnames';


const Comentario = (props) => {
	return (
		<li>
			<div className="review-heading">
				<h5 className="name">{props.id_autor}</h5>
				<p className="date">{props.fecha}</p>

			</div>
			<div className="review-body">
				<p>{props.comentario}</p>
			</div>
			<hr />
		</li>
	);

}
const listaComentarios = (arreglo) => {
	if(arreglo.length!=0){
	return (arreglo.map((indice) => (<Comentario key={indice.id_autor} {...indice}/>)))
	}else{
		return "No existen comentarios sobre este producto"
	}
     
}



class DescripcionComentario extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			match: props.match,
			cargando: true,
			activeTab: '1',
			detalle: props.descripcion,
			comentarios: [
				{
				  nombre: ''
				}
			  ]
		}
		this.toggle = this.toggle.bind(this);
	}

	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}
	componentWillMount(){
		axios.post(`http://localhost:4000/producto/consultarComentarios/${this.state.match}`)
		.then((response) => {
			if (response.data.mensaje==="consulta exitosa") {			 
				this.setState({comentarios: response.data.data});
				this.setState({cargando:false});
			}

		})
	}
	render() {
		if(this.state.cargando){
			return(   <div>

			{/*<Spinner style={{ position: 'relative', right: '40px', top: '50px' }} type="grow" color="primary" />*/}
			<Spinner type="grow" color="secondary" />
			<Spinner type="grow" color="success" />
			<Spinner type="grow" color="danger" />
			<Spinner type="grow" color="warning" />
			<Spinner type="grow" color="info" />
			<Spinner type="grow" color="light" />
			<Spinner type="grow" color="dark" />
  
		  </div>);
		}else{
		return (
			
			//-- Product tab -->
			<div className="col-md-12">
				<div id="product-tab">
					<Nav tabs>
						<NavItem>
							<NavLink
								className={classnames({ active: this.state.activeTab === '1' })}
								onClick={() => { this.toggle('1'); }}>
								Detalles
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								className={classnames({ active: this.state.activeTab === '2' })}
								onClick={() => { this.toggle('2'); }}>
								Comentarios
							</NavLink>
						</NavItem>
					</Nav>
					<TabContent activeTab={this.state.activeTab} className="tab-content">
						<TabPane tabId="1">
							<div className="comentarios">
								<div className="row">
									<div className="col-md-12">
										<p>{this.state.detalle}</p>
									</div>
								</div>
							</div>

						</TabPane>
						<TabPane tabId="2">
							<div className="comentarios">
								<div className="row">
									<div className="col-md-6">
										<div id="reviews">
											<ul className="reviews">
											{listaComentarios(this.state.comentarios)}

												
											</ul>

										</div>
									</div>
									<div className="col-md-6">
										<div id="review-form">
											<form className="review-form">
												<textarea className="input" placeholder="Your Review"></textarea>

											</form>

										</div>
										<button className="primary-btn">Enviar</button>
									</div>

								</div>
							</div>

						</TabPane>

					</TabContent>

				</div>
			</div>

		);
	}
	}

}
export default DescripcionComentario;