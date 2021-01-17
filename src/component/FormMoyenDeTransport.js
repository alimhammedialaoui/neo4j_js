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

    styles ={
        input:{
            borderRadius:5
        }
    }

    render() {
            return (
                <div>
                    <table>
                        <tr>
                            <td>Type</td>
                            <input style={this.styles.input}
                                   name="type"
                                   value={this.type}
                                   onChange={this.changeHandler} type={"text"}/>
                        </tr>
                        <br/>
                        <tr>
                            <td>Numero</td>
                            <input style={this.styles.input}
                                   name="numero"
                                   value={this.numero}
                                   onChange={this.changeHandler} type={"text"}/>
                        </tr>
                        <br/>
                        <tr>
                            <td>Constructeur</td>
                            <input style={this.styles.input}
                                   name="constructeur"
                                   value={this.constructeur}
                                   onChange={this.changeHandler} type={"text"}/>
                        </tr>
                        <br/>
                        <tr>
                            <td>Année de mise en service</td>
                            <input style={this.styles.input}
                                   name="anneemiseenservice"
                                   value={this.anneemiseenservice}
                                   onChange={this.changeHandler} type={"text"}/>
                        </tr>
                    </table>
                    <button style={{marginInline: 100, marginTop: 20, marginBottom: 20}} onClick={this.addMoyenDeTransportApi}>Add
                        Transport
                    </button>

                </div>
            );
        }

};

export default FormMoyenDeTransport;

