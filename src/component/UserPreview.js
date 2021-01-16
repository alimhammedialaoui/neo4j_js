import React, {Component} from 'react';
import FormMoyenDeTransport from "./FormMoyenDeTransport";
import FormUser from "./FormUser";
import AddPreferenceTransport from "./AddPreferenceTransport";

class UserPreview extends Component{

    state = {
        usagers:[],
        showAddForm: false,
        showPrefForm: false,
        showUpdForm: false,
    }
    render() {
        return(
            <div className="container">
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th>Nom complet</th>
                        <th>Handicap</th>
                        <th>Fonction</th>
                        <th>Date de naissance</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.usagers.map(usager =>{
                        return (<tr>
                            <td className="align-middle">{usager.properties.nomComplet}</td>
                            <td className="align-middle">{usager.properties.handicap}</td>
                            <td className="align-middle">{usager.properties.dateDeNaissance}</td>
                            <td className="align-middle">{usager.properties.fonction}</td>
                            <td>
                                <button className="btn btn-info">Update information</button>
                                |
                                <button className="btn btn-info" onClick={()=> {
                                    this.setState({
                                        showPrefForm: true
                                    })
                                    this.showPreferenceTrans(usager.properties.nomComplet)
                                }}>Add transport preference</button>
                            </td>
                        </tr>)
                    })}
                    </tbody>
                </table>
                {this.showPreferenceTrans && this.showPreferenceTrans}
            </div>
        )
    }

    componentDidMount(){
        this.getUsagers();
    }


    showPreferenceTrans=(nom)=>{
        return (
            <AddPreferenceTransport nomComplet={nom}/>
        )
    }

    getUsagers = () => {
        const neo4j = require('neo4j-driver')
        const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "1923"))
        const session = driver.session({database: "neo4j"});
        const query = `MATCH (n:Usager)-[r]->(m) return distinct n as usager`;
        session.run(query)
            .then((result) => {
                result.records.forEach((record) => {
                    var us=this.state.usagers;
                    console.log(record.get('usager'));
                    us.push(record.get('usager'))
                    this.setState({
                        usagers:us
                    })
                    console.log(this.state.usagers)
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
