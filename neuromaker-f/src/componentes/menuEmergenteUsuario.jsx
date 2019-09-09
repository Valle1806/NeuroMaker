import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";
import { Link } from 'react-router-dom'

export default class MenuEmergente extends React.Component {
  constructor(props) {
    super(props)
    const nombreU = localStorage.getItem("nombre")
    this.state = {
      isOpen: false,
      nombreU
    }
    this.dropdownToggle = this.dropdownToggle.bind(this)
  }
  cerrarCesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("nombre");
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
            {this.state.nombreU}
          </DropdownToggle>
          <DropdownMenu className="emergente-dropdown">
            <Link to={"/actualizar"}>
            <DropdownItem >Perfil</DropdownItem>
            </Link>
            <Link to={"/"}  >
              <DropdownItem onClick={this.cerrarCesion}>Cerrar Sesión</DropdownItem>
            </Link>
          </DropdownMenu>
        </Dropdown>

      </div>
    );
  }
}