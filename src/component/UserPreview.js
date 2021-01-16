import React, {Component} from 'react';
import Api from "../api/call"



class UserPreview extends Component{

    state = {
        usagers:[]
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
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.usagers.map(usager =>{
                        return (<tr>
                            <td className="align-middle">{usager.nomComplet}</td>
                            <td className="align-middle">{usager.handicap}</td>
                            <td className="align-middle">{usager.fonction}</td>
                            <td>
                                <button className="btn btn-info">Update</button>
                                |
                                <button className="btn btn-info">Delete</button>
                            </td>
                        </tr>)
                    })}

                    </tbody>
                </table>
            </div>
        )
    }


    componentDidMount(){
        var us = Api.getUsagers()
        console.log(us)
        this.setState({
            usagers: us
        })
    }

    getUsagers = () => {
        const neo4j = require('neo4j-driver')

        const driver = neo4j.driver("neo4j://localhost:7687", neo4j.auth.basic("neo4j", "1923"))
// const session = driver.session()
        const session = driver.session({database: "neo4j"});
        const query = `MATCH (n:Usager)-[r]->(m) return distinct n as usager`;

        session.run(query)
            .then((result) => {
                result.records.forEach((record) => {
                    console.log(record.get('usager'));
                    this.setState({
                        usagers:record.get('usager')
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
