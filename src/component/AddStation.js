import React,{Component} from "react";

class AddStation extends Component{


    constructor(props) {
        super(props);
        this.state={
            moyenTransport:props.MoyenTransport,
            selectedMT:"",
            poids:0,
            heure:0,
            isSelected : false,
            selectedItem : "23689j0",
            stations:[]
        }
    }
    getStations = () => {
        const neo4j = require('neo4j-driver')
        const driver = neo4j.driver(this.props.link, neo4j.auth.basic(this.props.username, this.props.password));
        const session = driver.session({database: "neo4j"});
        const query = `MATCH (n:Station) RETURN n as station`;
        session.run(query)
            .then((result) => {
                result.records.forEach((record) => {
                    var us=this.state.stations;
                    console.log(record.get('station'));
                    us.push(record.get('station'))
                    this.setState({
                        stations:us
                    })
                    console.log(this.state.stations)
                });
                session.close();
                driver.close();
            })
            .catch((error) => {
                console.error(error);
            });
    }
   

   
    componentDidMount(){
        this.getStations()
    }

    render(){
        return(
            <div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label>Moyen De Transport</label>
                        <input type="text" value={this.props.MoyenSelected.properties.type} disabled="true"
                               className="form-control"/>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputState">Station</label>
                        <select className="form-control" value={this.state.selectedMT} onChange={ e=> this.setState({selectedMT: e.target.value})}>
                            {this.state.stations.map(mt => {

                                return (
                                    <option key={mt.properties.id} value={mt.properties.nom}>{mt.properties.nom}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputState">Heure</label>
                        {/* <select id="inputState" className="form-control" value={this.state.poids} onChange={ e=> this.setState({poids: e.target.value})}> */}
                        <input class="form-control " type="time"   onChange={ e=> this.setState({heure: e.target.value})}></input>
                        </div>
                 </div>
                <button className="btn btn-primary col-md-2" onClick={this.postStation}>Add Station</button>
                <span className="col-md-2"></span>
                <button className="btn btn-danger col-md-2">Cancel</button>
            </div>
        )
    }

    
    postStation= async()=>{
        const neo4j = require('neo4j-driver')
        const driver = neo4j.driver(this.props.link, neo4j.auth.basic(this.props.username, this.props.password));
        const session = driver.session({database: "neo4j"});
        console.log("heyy")
        try {
            console.log("heyy")
            await session.run(
                `MATCH (a:Station{nom:$nom}),(b:MoyenTransport{type:$type}) 
                CREATE (b)-[r:STOPS_AT{heureArriv:time($heure)}]->(a)
                RETURN r.heureArriv`,
                {
                    nom:this.state.selectedMT,
                    type:this.props.MoyenSelected.properties.type,
                    heure:this.state.heure
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


export default AddStation;
