import React, {Component} from 'react';
import StationsTransitPreview from "./StationsTransitPreview";

class StationsTransit extends Component{
    neo4j = require('neo4j-driver');
    driver = this.neo4j.driver("bolt://localhost:7687", this.neo4j.auth.basic("neo4j", "1234"));
    session = this.driver.session({database: "neo4j"});
    state={
        stations1:[],
        stations2:[],
        stationDepart:"",
        stationArrivee:"",
        showTransitStations:false
    }

    getStations=()=>{
        const query = `MATCH (n:Station) return distinct n as stations`;
        this.session.run(query)
            .then((result) => {
                result.records.forEach((record) => {
                    var st1=this.state.stations1;
                    var st2=this.state.stations2;
                    st1.push(record.get('stations'));
                    st2.push(record.get('stations'));
                    this.setState({
                        stationDepart:st1[0].properties.nom,
                        stationArrivee:st2[0].properties.nom,
                        stations1:st1,
                        stations2:st2
                    })
                });
                this.session.close();
                this.driver.close();
            })
            .catch((error) => {
                console.error(error);
            });

    }

    componentDidMount() {
        this.getStations();
    }

    render(){
        return (
            <div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputDepart">Station de depart</label>
                        <select className="form-control" value={this.state.stationDepart} onChange={ e => this.setState({stationDepart: e.target.value})}>
                            {this.state.stations1.map(st => {
                                return (
                                    <option key={st.properties.nom} value={st.properties.nom}>{st.properties.nom}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputArrivee">Station d'arrivee</label>
                        <select className="form-control" value={this.state.stationArrivee} onChange={ e => this.setState({stationArrivee: e.target.value})}>
                            {this.state.stations2.map(st => {
                                return (
                                    <option key={st.properties.nom} value={st.properties.nom}>{st.properties.nom}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <button className="btn btn-primary col-md-2" onClick={()=>{this.setState({showTransitStations:true});}}>Parcourir</button>
                {this.state.showTransitStations && <StationsTransitPreview stationDepart={this.state.stationDepart} stationArrivee={this.state.stationArrivee}/>}
            </div>
        )
    }
}
export default StationsTransit;
