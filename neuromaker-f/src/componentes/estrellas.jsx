import React, { Component } from 'react';
import { Input, Label } from 'reactstrap'
import RatingStar from 'react-rating';

class Estrellas extends Component {
    constructor(props) {
        super(props);
        console.log(props.calificacion)
        this.state = {
            calificacion: props.calificacion
        };
        this.estrellaPresionada = this.estrellaPresionada.bind(this)
    }

    estrellaPresionada = changeEvent => {
        this.setState({
            calificacion: changeEvent.target.value
        });
    }
   
    render() {

        return (
            <div className="product-rating">
                <p className="calificacion">
                    <Input onChange={this.estrellaPresionada} id="radio1" type="radio" name="estrellas" value="5" checked={this.state.calificacion == 5} />
                    <Label for="radio1">★</Label>
                    <Input onChange={this.estrellaPresionada} id="radio2" type="radio" name="estrellas" value="4" checked={this.state.calificacion == 4} />
                    <Label for="radio2">★</Label>
                    <Input onChange={this.estrellaPresionada} id="radio3" type="radio" name="estrellas" value="3" checked={this.state.calificacion == 3} />
                    <Label for="radio3">★</Label>
                    <Input onChange={this.estrellaPresionada} id="radio4" type="radio" name="estrellas" value="2" checked={this.state.calificacion == 2} />
                    <Label for="radio4">★</Label>
                    <Input onChange={this.estrellaPresionada} id="radio5" type="radio" name="estrellas" value="1" checked={this.state.calificacion == 1} />
                    <Label for="radio5">★</Label>
                </p>
            </div>
        );
    }
}
export default Estrellas;