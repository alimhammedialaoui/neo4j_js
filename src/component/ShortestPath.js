import React, {Component} from 'react';

class ShortestPath extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stations: [],
            selectedDeparture: "Station de correspondance Anoual Tramway",
            selectedArrival: "Station de correspondance Anoual Tramway",
            shortestPath: [],
            transitShown: false,
            firstTime : true
        }
    }

    componentDidMount() {
        return this.getStations();
    }

    render() {
        return (
            <div className="container">
                <h4>Afficher plus court chemin</h4><hr/>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label>Station de départ</label>
                        <select className="form-control" value={this.state.selectedDeparture}
                                onChange={e => this.setState({selectedDeparture: e.target.value})} >
                            {this.state.stations.map(departure => {

                                return (
                                    <option key={departure.properties.nom}
                                            value={departure.properties.nom}>{departure.properties.nom}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <label>Station d'arrivée</label>
                        <select className="form-control" value={this.state.selectedArrival}
                                onChange={e => this.setState({selectedArrival: e.target.value})}>
                            {this.state.stations.map(departure => {

                                return (
                                    <option key={departure.properties.nom}
                                            value={departure.properties.nom}>{departure.properties.nom}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <div style={{marginTop: 32}}>
                            <button className="btn btn-primary" onClick={() => this.getTransit()}>Search</button>
                        </div>
                    </div>
                </div>
                {console.log("Test " + this.state.shortestPath)}
                {(this.state.transitShown &&  this.state.shortestPath.length!==0) &&
                <>
                    <table className="table">
                        <thead className="thead-dark">
                        <tr>
                            <th className="text-center">Plus court chemin</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.shortestPath.map((station) => {
                            return (
                                <tr>
                                    <td className="align-middle text-center" key={station.properties.nom}>{station.properties.nom}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </>
                }
                {!this.state.firstTime &&  this.state.shortestPath.length===0 && <div className="text-center alert alert-warning">Aucun résultat</div>}
            </div>
        );
    }

    getTransit = () => {
        this.setState({transitShown: true,firstTime:false})
        return this.getShortestPath()
    }

    getStations = () => {
        const neo4j = require('neo4j-driver')
        const driver = neo4j.driver(this.props.link, neo4j.auth.basic(this.props.username, this.props.password))
        const session = driver.session({database: "neo4j"});
        const query = `MATCH (e:Station) return e as stations`;
        var stops = this.state.stations;
        session.run(query)
            .then((result) => {
                result.records.forEach((record) => {
                    // console.log(record.get('usager'));
                    stops.push(record.get('stations'))
                    // console.log(this.state.usagers)
                    this.setState({
                        stations: stops
                    })
                });

                session.close();
                driver.close();
            })
            .catch((error) => {
                console.error(error);
            });
    }


    getShortestPath = () => {
        const neo4j = require('neo4j-driver')
        const driver = neo4j.driver(this.props.link, neo4j.auth.basic(this.props.username, this.props.password))
        const session = driver.session({database: "neo4j"});
        const query = `match p=(BEGIN:Station)-[:FOLLOWED_BY*]->(END:Station)
                        where BEGIN.nom =$depart AND END.nom=$arrive
                        return BEGIN.nom +"\n"+ END.nom as inputs,nodes(p) as chemin,reduce(distance=0, r in relationships(p)| distance+(r.distance)) as distance
                        order by distance
                        LIMIT 1`;
        var path = this.state.shortestPath;
        console.log(this.state)
        session.run(query, {depart: this.state.selectedDeparture, arrive: this.state.selectedArrival})
            .then((result) => {
                if(result.records.length===0){
                    this.setState({shortestPath: []})
                }else{
                    result.records.forEach((record) => {
                        console.log("Chemin : " + record.get('chemin'));
                        path.push(record.get('chemin'))
                        console.log(record.get('chemin'))
                        this.setState({
                            shortestPath: record.get('chemin')
                        })
                    });
                }

                session.close();
                driver.close();
            })
            .catch((error) => {
                console.error(error);
            });
    }

}

export default ShortestPath;
