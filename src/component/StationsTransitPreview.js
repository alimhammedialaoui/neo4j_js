import React, {Component} from 'react';

class StationsTransitPreview extends Component{

    state={
        stationsTransit:[],
        distance: 0
    }

    componentDidMount() {
        this.getStationTransit()
    }

    getStationTransit= async ()=>{
        const neo4j = require('neo4j-driver');
        const driver = neo4j.driver(this.props.link, neo4j.auth.basic(this.props.username, this.props.password))
        const session = driver.session({database: "neo4j"});
        await session.run(
            `match p=(BEGIN:Station)-[:FOLLOWED_BY*]->(END:Station)
            where BEGIN.nom =$DEPART AND END.nom=$ARRIVEE
            return [n in nodes(p)|n.nom] as chemin,reduce(dis=0, u in relationships(p)| dis +(u.distance)) as distance`,
            {
                DEPART:this.props.stationDepart,
                ARRIVEE:this.props.stationArrivee,
            })
            .then((result) => {
                result.records.forEach((record) => {
                    this.setState({
                        stationsTransit:record.get('chemin'),
                        distance:record.get('distance').low
                    })
                });
            })
            .catch((error) => {
                console.error(error);
            });
        await session.close();
        await driver.close();
    }

    render(){
        return(
            <div>
                <br/>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th className="text-center">Station de depart</th>
                        <th className="text-center">Chemin</th>
                        <th className="text-center">Station d'arrivee</th>
                        <th className="text-center">Distance</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{this.props.stationDepart}</td>
                        <td>{this.state.stationsTransit.map((st,index)=>{
                            return (<p key={index}>{index+1}-{st}</p>)
                        })
                        }
                        </td>
                        <td>{this.props.stationArrivee}</td>
                        <td>{this.state.distance}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
export default StationsTransitPreview
