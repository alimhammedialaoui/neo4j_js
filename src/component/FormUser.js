import React, {Component} from 'react';
import Api from "../api/call"

class FormUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nom:"",
            dateDeNaissance: "",
            handicap: "N",
            fonction: "",
            cin:""
        }
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    addUserApi = () => {
        const usager = {
            nom:this.state.nom,
            dateDeNaissance: this.state.dateDeNaissance,
            handicap: this.state.handicap,
            fonction: this.state.fonction,
            cin:this.state.cin
        }
        return Api.addUser(usager);
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
                        <td>Nom</td>
                        <input className="form form-control" style={this.styles.input}
                               name="nom"
                               value={this.nom}
                               onChange={this.changeHandler}  type={"text"}/>
                    </tr>
                    <br/>
                    <tr>
                        <td>Date de naissance</td>
                        <input className="form form-control" style={this.styles.input}
                            name="dateDeNaissance"
                            value={this.dateDeNaissance}
                            onChange={this.changeHandler}  type={"date"}/>
                    </tr>
                    <br/>
                    <tr>
                        <td>Cin</td>
                        <input className="form form-control" style={this.styles.input}
                               name="cin"
                               value={this.cin}
                               onChange={this.changeHandler} type={"text"}/>
                    </tr>
                    <br/>
                    <tr>
                        <td>Handicap</td>
                        <td>
                            <input   style={{...this.styles.input,marginInline: 30}}
                                   name="handicap"
                                   value={this.handicap}
                                   onChange={() =>
                                       this.setState({handicap: "O"})} type={"radio"}/>
                            <label>Oui</label>
                            <input style={{...this.styles.input,marginInline: 30}}
                                   name="handicap"
                                   value={this.handicap}
                                   onChange={() =>
                                       this.setState({handicap: "N"})} type={"radio"}/>
                            <label>Non</label>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Fonction</td>
                        <input className="form form-control"
                            style={{...this.styles.input}}
                            name="fonction"
                            value={this.fonction}
                            onChange={this.changeHandler} type={"text"}/>
                    </tr>
                </table>
                <button className="btn btn-info" style={{marginInline: 100, marginTop: 20, marginBottom: 20}} onClick={this.addUserApi}>Add
                    user
                </button>

            </div>
        );
    }
};

export default FormUser;
