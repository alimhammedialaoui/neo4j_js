import React, {Component} from 'react';
import Api from "../api/call"

class MoyenDeTransport extends Component {
    state={
        moyen_transport:[]
    }
    
    

   
   
    
    
  
    

    
    render() {
        return (
            <div>
               <h3>Adnane M'barki is the best</h3><hr/>
                     {this._manyGenres}
               
            </div>
        );
    }
    getMoyens = () => {
        const neo4j = require('neo4j-driver')
    
        const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "0000"))
        const session = driver.session({database: "neo4j"});
        const query = `MATCH (n:MoyenDeTransport)-[r]->(m) return distinct n as moyen`;
    
        session.run(query)
            .then((result) => {
                result.records.forEach((record) => {
                    var us=this.state.usagers;
                    console.log(record.get('moyen'));
                    us.push(record.get('moyen'))
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

export default MoyenDeTransport;
