import React, {Component} from "react";
import Api from "../api/call.js";

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

    addMoyenDeTransportApi = () => {
        const moyenDeTransport = {
            type: this.state.type,
            numero: this.state.numero,
            constructeur: this.state.constructeur,
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
                    <label>Numero</label>
                    <input
                        name="numero"
                        value={this.numero}
                        onChange={this.changeHandler}/><br/>

                    <label>Constructeur</label>
                     <input
                        name="constructeur"
                        value={this.constructeur}
                        onChange={this.changeHandler}/><br/>

                    <label>Année de mise en service</label>
                    <input
                        name="anneemiseenservice"
                        value={this.anneemiseenservice}
                        onChange={this.changeHandler}/><br/>

                    <button style={{marginInline: 100, marginTop: 20, marginBottom: 20}} onClick={this.addMoyenDeTransportApi}>Add
                        Transport
                    </button>
                    <button style={{marginInline: 100, marginTop: 20, marginBottom: 20}} onClick={()=> console.log(this.state)}>Click
                    </button>


                </div>
            );
        }

};

export default FormMoyenDeTransport;

