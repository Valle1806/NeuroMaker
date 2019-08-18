import React ,{ Component } from 'react';
import axios from 'axios';
import {  TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
class DescripcionComentario  extends Component{
   constructor(props){
	   super(props);
	   this.state={
		activeTab: '1'
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
    render(){
        return(
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
					<TabContent activeTab={this.state.activeTab} className= "tab-content">
        			    <TabPane tabId="1">
								<div className="comentarios">
									<div className="row">
										<div className="col-md-12">
											<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
										</div>
									</div>
								</div>
							
					    </TabPane>
						<TabPane tabId="2">
								<div className= "comentarios">
									<div className="row">
										<div className="col-md-6">
											<div id="reviews">
												<ul className="reviews">
													<li>
														<div className="review-heading">
															<h5 className="name">John</h5>
															<p className="date">27 DEC 2018, 8:0 PM</p>
														
														</div>
														<div className="review-body">
															<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
														</div>
														<hr/>
													</li>
													<li>
														<div className="review-heading">
															<h5 className="name">John</h5>
															<p className="date">27 DEC 2018, 8:0 PM</p>
															
														</div>
														<div className="review-body">
															<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
														</div>
														<hr/>
													</li>
													<li>
														<div className="review-heading">
															<h5 className="name">John</h5>
															<p className="date">27 DEC 2018, 8:0 PM</p>
														</div>
														<div className="review-body">
															<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
														</div>
														<hr/>
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