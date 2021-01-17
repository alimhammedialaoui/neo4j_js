import React, {Component} from 'react';
import Api from "../api/call"
import FormMoyenDeTransport from "./FormMoyenDeTransport";
import MoyenDeTransport from "./MoyenDeTransport";
import AddStation from "./AddStation";


class MoyenDeTransportPreview extends Component {
    neo4j = require('neo4j-driver')
   driver = this.neo4j.driver("bolt://localhost:7687", this.neo4j.auth.basic("neo4j", "1234"))
     session = this.driver.session({database: "neo4j"});
        state = {
            moyens:[],
            stations:[],
            showAddForm: false,
            showPrefForm: false,
            showUpdForm: false,
            nom: "",
            selectedmoyen:{}
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
                    {this.state.moyens.map(moyen =>{
                        return (<tr>
                            <td className="align-middle">{moyen.properties.no}</td>
                            <td className="align-middle">{moyen.properties.constructeur}</td>
                            {/*<td className="align-middle">{usager.properties.dateDeNaissance}</td>*/}
                            <td className="align-middle">{moyen.properties.anneeMiseEnService}</td>
                            <td className="align-middle">{moyen.properties.type}</td>
                            <td>
                              
                                
                                <button className="btn btn-info" onClick={()=> {
                                    if(this.state.showPrefForm===true){
                                        this.setState({
                                            nom: moyen.properties.type,
                                            selectedmoyen:moyen
                                        })
                                    }else {
                                        this.setState({
                                            showPrefForm: !this.state.showPrefForm,
                                            type: moyen.properties.type,
                                            selectedmoyen:moyen
                                        })
                                    }
                                    console.log(this.state.showPrefForm)
                                }}>Add Station</button>
                            </td>
                        </tr>)
                    })}
                    </tbody>
                </table>
                {this.state.showPrefForm && <AddStation nomComplet={this.state.nom} MoyenSelected={this.state.selectedmoyen}/>} 
               {/* {this.state.showPrefForm && <div> <hr/> <label>{this.state.nom}</label><AddStation nomComplet={this.state.nom}/></div>} */}
            </div>
            </div>

        );

    }
    componentDidMount(){
        this.getUsagers();
    }

    getUsagers = () => {
     
        const query = `MATCH (n:MoyenTransport) return distinct n as moyen`;
        this.session.run(query)
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
                this.session.close();
                this.driver.close();
            })
            .catch((error) => {
                console.error(error);
            });
    }



};


export default MoyenDeTransportPreview;
