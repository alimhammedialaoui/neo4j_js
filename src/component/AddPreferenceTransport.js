import React,{Component} from "react";

class AddPreferenceTransport extends Component{

    constructor(props) {
        super(props);
        this.state={
            moyenTransport:[],
            usager:props.usagerSelected,
            selectedMT:"",
            poids:0,
            isSelected : false,
            selectedItem : "23689j0"
        }
    }

    getMoyenTransport = () => {
        const neo4j = require('neo4j-driver')
        const driver = neo4j.driver(this.props.link, neo4j.auth.basic(this.props.username, this.props.password))
        const session = driver.session({database: "neo4j"});
        const query = `MATCH (n:MoyenTransport) RETURN n  as moyentransport`;
        session.run(query)
            .then((result) => {
                result.records.forEach((record) => {
                    var mt = this.state.moyenTransport;
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
                    <div className="form-group col-md-4">
                        <label>Usager</label>
                        <input type="text" value={this.props.usagerSelected.properties.nomComplet} disabled="true"
                               className="form-control"/>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputState">Moyen de transport</label>
                        <select className="form-control" value={this.state.selectedMT} onChange={ e=> this.setState({selectedMT: e.target.value})}>
                            {this.state.moyenTransport.map(mt => {

                                return (
                                    <option key={mt.properties.no} value={mt.properties.no}>{mt.properties.type}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group col-md-1">
                        <label htmlFor="inputState">Poids</label>
                        <select id="inputState" className="form-control" value={this.state.poids} onChange={ e=> this.setState({poids: e.target.value})}>
                            <option value={0} selected>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                        </select>
                    </div>
                </div>
                <button className="btn btn-primary col-md-2" onClick={this.postPreference}>Add preference</button>
                <span className="col-md-2"></span>
                <button className="btn btn-danger col-md-2">Cancel</button>
            </div>

        )
    }

    postPreference= async()=>{
        const neo4j = require('neo4j-driver')
        const driver = neo4j.driver(this.props.link, neo4j.auth.basic(this.props.username, this.props.password))
        const session = driver.session({database: "neo4j"});
        try {
            await session.run(
                `MATCH (a:Usager),(b:MoyenTransport) 
                WHERE a.cin= $CIN AND b.no = $NO
                CREATE (a)-[r:PREFERS { poids: $POIDS}]->(b)
                RETURN r.poids`,
                {
                    CIN: this.props.usagerSelected.properties.cin,
                    POIDS: this.state.poids,
                    NO: this.state.selectedMT
                }
            )
            console.log(this.state.selectedMT)


        } finally {
            await session.close()
        }
        // on application exit:
        await driver.close()
    }

}


export default AddPreferenceTransport;