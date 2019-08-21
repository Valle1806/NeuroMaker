import React, { Component } from 'react';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';


const Comentario = (props) => {
	console.log(props);
	return (
		<li>
			<div className="review-heading">
				<h5 className="name">Estemen</h5>
				<p className="date">{props.fecha}</p>

			</div>
			<div className="review-body">
				<p>{props.comentario}</p>
			</div>
			<hr />
		</li>
	);

}




class DescripcionComentario extends Component {
	constructor(props) {
		super(props);
		this.state = {
			match: props.match,
			activeTab: '1',
			detalle: "",
			comentarios: [
				{
				  nombre: ''
				}
			  ]
		}
		console.log(this.props.descripcion)
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
			   console.log(response.data.data);
				this.setState({comentarios: response.data.data});
			  
			}

		})
	}
	render() {
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
										<p>{this.state.detalles}</p>
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
											{/*this.state.comentarios.map((indice) => (<Comentario key={indice.id_autor} coment={indice}/>))*/}

												<li>
													<div className="review-heading">
														<h5 className="name">John</h5>
														<p className="date">27 DEC 2018, 8:0 PM</p>
													</div>
													<div className="review-body">
														<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
													</div>
													<hr />
												</li>
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
export default DescripcionComentario;