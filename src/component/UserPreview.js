import React, {Component} from 'react';

class UserPreview extends Component{

    state = {
        usagers:[]
    }
    render() {
        return(
            <div className="container">
                {/*<p>{this.state.usagers}</p>*/}
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
                            <td className="align-middle">{usager.properties.nomComplet}</td>
                            <td className="align-middle">{usager.properties.handicap}</td>
                            <td className="align-middle">{usager.properties.fonction}</td>
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
        this.getUsagers();

    }

    getUsagers = () => {
        const neo4j = require('neo4j-driver')

        const driver = neo4j.driver("neo4j://localhost:7687", neo4j.auth.basic("neo4j", "Oussama2"))
// const session = driver.session()
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
