import {useState} from "react";

function AddPreferenceTransport(props){

    const [moyen,setMoyen] = useState([]);

    const getMoyenTransport = () => {
        const neo4j = require('neo4j-driver')
        const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "1923"))
        const session = driver.session({database: "neo4j"});
        const query = `MATCH (n:MoyenTransport) RETURN n  as moyentransport`;
        session.run(query)
            .then((result) => {
                result.records.forEach((record) => {
                    var us=moyen;
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


    return(
        <div>
            <p>{props.nomUsager}</p>
            <select>
                {props.moyensTransport.map(mt=>{
                    return(
                        <option>mt.type</option>
                    )
                })}
            </select>
            <select>
                <option>0</option>
                <option>1</option>
                <option>2</option>
            </select>
        </div>
    )

}


export default AddPreferenceTransport
