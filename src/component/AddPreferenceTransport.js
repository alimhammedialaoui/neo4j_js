import React,{Component} from "react";

class AddPreferenceTransport extends Component{

    constructor(props) {
        super(props);
        this.state={
            moyenTransport:[],
            usager:props.usagerSelected
        }
    }

    getMoyenTransport = () => {
        const neo4j = require('neo4j-driver')
        const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "Oussama2"))
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

    componentDidMount(){
        this.getMoyenTransport()
    }

    render(){
        return(
            <div>
                <div className="form-row">
                    {/*<p>{this.state.usager.properties.nomComplet}</p>*/}
                    <div className="form-group col-md-4">
                        <label>Usager</label>
                        <input type="text" value={this.state.usager.properties.nomComplet} disabled="true"
                               className="form-control"/>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputState">Moyen de transport</label>
                        <select className="form-control">
                            {this.state.moyenTransport.map(mt => {
                                return (
                                    <option>{mt.properties.type}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group col-md-1">
                        <label htmlFor="inputState">Poids</label>
                        <select id="inputState" className="form-control">
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </div>
                </div>
                <button className="btn btn-primary">Confirm identity</button>
            </div>

        )
    }

    postPreference=()=>{

    }
}


export default AddPreferenceTransport;
