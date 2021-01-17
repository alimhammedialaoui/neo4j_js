import React, {Component} from 'react';
import AddPreferenceTransport from "./AddPreferenceTransport";

class UserPreview extends Component{

    state = {
        usagers:[],
        showAddForm: false,
        showPrefForm: false,
        showUpdForm: false,
        nom: "",
        selectedusager:{}
    }

    render() {
        return(
            <div className="container">
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th className="text-center">Nom complet</th>
                        <th className="text-center">CIN</th>
                        <th className="text-center">Handicap</th>
                        <th className="text-center">Date de naissance</th>
                        <th className="text-center">Fonction</th>
                        <th className="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.usagers.map(usager =>{
                        return (<tr>
                            <td className="align-middle text-center">{usager.properties.nomComplet}</td>
                            <td className="align-middle text-center">{usager.properties.cin}</td>
                            <td className="align-middle text-center">{usager.properties.handicap}</td>
                            <td className="align-middle text-center">{usager.properties.dateDeNaissance}</td>
                            <td className="align-middle text-center">{usager.properties.fonction}</td>
                            <td className="text-center">
                                <button className="btn btn-info" onClick={()=> {
                                    if(this.state.showPrefForm===true){
                                        this.setState({
                                            nom: usager.properties.nomComplet,
                                            selectedusager:usager
                                        })
                                    }else {
                                        this.setState({
                                            showPrefForm: !this.state.showPrefForm,
                                            nom: usager.properties.nomComplet,
                                            selectedusager:usager
                                        })
                                    }
                                    console.log(this.state.showPrefForm)
                                }}>Add transport preference</button>
                            </td>
                        </tr>)
                    })}
                    </tbody>
                </table>
                {
                    this.state.showPrefForm &&
                    <AddPreferenceTransport
                        nomComplet={this.state.nom}
                        usagerSelected={this.state.selectedusager}
                        link={this.props.link}
                        username={this.props.username}
                        password={this.props.password}/>}
            </div>
        )
    }

    componentDidMount(){
        this.getUsagers();
    }

    getUsagers = () => {
        const neo4j = require('neo4j-driver')
        const driver = neo4j.driver(this.props.link, neo4j.auth.basic(this.props.username, this.props.password))
        const session = driver.session({database: "neo4j"});
        const query = `MATCH (n:Usager) return distinct n as usager`;
        session.run(query)
            .then((result) => {
                result.records.forEach((record) => {
                    var us=this.state.usagers;
                    us.push(record.get('usager'))
                    this.setState({
                        usagers:us
                    })
                });
                session.close();
                driver.close();
            })
            .catch((error) => {
                console.error(error);
            });
    }
}
export default UserPreview
