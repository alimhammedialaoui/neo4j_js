import {useState} from "react";

class AddPreferenceTransport extends Component{
    state={
        moyenTransport:[],
        nomUsager:""
    }

    constructor(props) {
        super();
        this.setState({
            nomUsager:props.nomUsager
        })
    }
    // [moyen,setMoyen] = useState([]);

    getMoyenTransport = () => {
        const neo4j = require('neo4j-driver')
        const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "1923"))
        const session = driver.session({database: "neo4j"});
        const query = `MATCH (n:MoyenTransport) RETURN n  as moyentransport`;
        session.run(query)
            .then((result) => {
                result.records.forEach((record) => {
                    var mt = this.state.moyenTransport;
                    // console.log(record.get('moyen'));
                    mt.push(record.get('moyentransport'))
                    this.setState({
                        moyenTransport: mt
                    })
                    console.log(this.state.moyenTransport)
                });
                session.close();
                driver.close();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render(){
        return(
            <div>
                <p>{this.state.nomUsager}</p>
                <select>
                    {this.state.moyensTransport.map(mt=>{
                        return(
                            <option>mt.properties.type</option>
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

}


export default AddPreferenceTransport
