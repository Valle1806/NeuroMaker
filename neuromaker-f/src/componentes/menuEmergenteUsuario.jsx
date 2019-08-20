import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";
import { Link } from 'react-router-dom'

export default class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.dropdownToggle = this.dropdownToggle.bind(this)
  }
  cerrarCesion() {
    localStorage.removeItem("token");
    window.location.reload(); 
    
  }
  dropdownToggle(e) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  //<Route path={`/:topicId`} component={Config}/>
  render() {
    
    return (
      
      <div>
        <Dropdown isOpen={this.state.dropdownOpen}
          toggle={e => this.dropdownToggle(e)}
          className="clienteOpciones">
          <DropdownToggle caret nav>
            NombreUsuario
        </DropdownToggle>
          <DropdownMenu right>

            <DropdownItem >Perfil</DropdownItem>
            <Link to={"/"}  >
            <DropdownItem onClick={this.cerrarCesion}>Cerrar Sesión</DropdownItem>
            </Link>
          </DropdownMenu>
        </Dropdown>

      </div>
    );
  }
}