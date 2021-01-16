import React, {Component} from "react";
import FormUser from "./FormUser";

class FormMoyenDeTransport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            numero: "",
            constructeur: "",
            anneemiseenservice: ""
        }
    }

    changeHandler = (event) => {
            this.setState({
                [event.target.name]: event.target.value
            })
    }

    addUserApi = () => {
        const moyenDeTransport = {
            type: this.state.type,
            numero: this.state.numero,
            constructeur: this.state.constructor,
            anneemiseenservice: this.state.anneemiseenservice
        }

        return Api.addMoyenDeTransport(moyenDeTransport);
    }

    render() {
            return (
                <div>
                    <label>Type</label>
                    <input
                        name="type"
                        value={this.type}
                        onChange={this.changeHandler}/><br/>
                    <input
                        name="numero"
                        value={this.numero}
                        onChange={this.changeHandler}/><br/>

                     <input
                        name="constructeur"
                        value={this.constructor}
                        onChange={this.changeHandler}/><br/>

                    <input
                        name="anneemiseenservice"
                        value={this.anneemiseenservice}
                        onChange={this.changeHandler}/><br/>

                    <button type="submit">Add Transport</button>


                </div>
            );
        }

};

export default FormMoyenDeTransport;

