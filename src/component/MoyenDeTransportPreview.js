import React, {Component} from 'react';
import Api from "../api/call"
import FormMoyenDeTransport from "./FormMoyenDeTransport";
import MoyenDeTransport from "./MoyenDeTransport";
import AddPreferenceTransport from "./AddPreferenceTransport";


class MoyenDeTransportPreview extends Component {

        state = {
            moyens:[],
            showAddForm: false,
            showPrefForm: false,
            showUpdForm: false,
            nom: ""
        }


    render() {
        return (
            <div>
               <div className="container">
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th>No</th>
                        <th>constructeur</th>
                        <th>Année mise en service</th>
                        <th>type</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.moyens.map(usager =>{
                        return (<tr>
                            <td className="align-middle">{usager.properties.no}</td>
                            <td className="align-middle">{usager.properties.constructeur}</td>
                            {/*<td className="align-middle">{usager.properties.dateDeNaissance}</td>*/}
                            <td className="align-middle">{usager.properties.anneeMiseEnService}</td>
                            <td className="align-middle">{usager.properties.type}</td>
                            <td>
                              
                                
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
                {/* {this.state.showPrefForm && <AddPreferenceTransport nomComplet={this.state.nom} usagerSelected={this.state.selectedusager}/>} */}
                {/*{this.state.showPrefForm && <div> <hr/> <label>{this.state.nom}</label><AddPreferenceTransport nomComplet={this.state.nom}/></div>}*/}
            </div>
            </div>

        );

    }
     componentDidMount(){
        this.getUsagers();
    }
    getUsagers = () => {
        const neo4j = require('neo4j-driver')
        const driver = neo4j.driver(this.props.link, neo4j.auth.basic(this.props.username, this.props.password))
        const session = driver.session({database: "neo4j"});
        const query = `MATCH (n:MoyenTransport) return distinct n as moyen`;
        session.run(query)
            .then((result) => {
                result.records.forEach((record) => {
                    var us=this.state.moyens;
                    console.log(record.get('moyen'));
                    us.push(record.get('moyen'))
                    this.setState({
                        moyens:us
                    })
                    console.log(this.state.moyens)
                });
                session.close();
                driver.close();
            })
            .catch((error) => {
                console.error(error);
            });
    }


};


export default MoyenDeTransportPreview;
