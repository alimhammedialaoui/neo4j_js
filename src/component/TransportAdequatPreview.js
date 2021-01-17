import React, {Component} from 'react';

class StationsTransitPreview extends Component{

    state={
        stationsTransit:[],
        duree: "",
        moyenTransport:{
            type:"",
            no:""
        }
    }

    componentDidMount() {
        this.getMoyenTransportAdeq()
    }

    getMoyenTransportAdeq=async ()=>{
        const neo4j = require('neo4j-driver');
        const driver = neo4j.driver(this.props.link, neo4j.auth.basic(this.props.username, this.props.password))
        const session = driver.session({database: "neo4j"});
        await session.run(
            `call{
                    match p=(BEGIN:Station)-[:FOLLOWED_BY*]->(END:Station)
                    where BEGIN.nom =$DEPART AND END.nom=$ARRIVEE
                    return BEGIN.nom +"\\n"+ END.nom as inputs,nodes(p) as chemin,reduce(duree=0, r in relationships(p)| duree+(r.duree)) as duree
                    order by duree
                    LIMIT 1
                    }
                    match p=(n1:MoyenTransport)-[:STOPS_AT*]->(n2:Station)
                    where n2 in chemin
                    return distinct inputs , n1 as moyen, [c in chemin|c.nom] as chemin, duree+" mn" as dur`,
            {
                DEPART:this.props.stationDepart,
                ARRIVEE:this.props.stationArrivee,
            })
            .then((result) => {
                result.records.forEach((record) => {
                    this.setState({
                        moyenTransport:{
                            type:record.get('moyen').properties.type,
                            no:record.get('moyen').properties.no
                        },
                        stationsTransit:record.get('chemin'),
                        duree:record.get('dur')
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
                        <th className="text-center">Moyen adequat</th>
                        <th className="text-center">Duree du trajet</th>
                        <th className="text-center">Station de depart</th>
                        <th className="text-center">Station d'arrivee</th>
                        <th className="text-center">Chemin</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{this.state.moyenTransport.no} -- {this.state.moyenTransport.type}</td>
                        <td>{this.state.duree}</td>
                        <td>{this.props.stationDepart}</td>
                        <td>{this.props.stationArrivee}</td>
                        <td>{this.state.stationsTransit.map((st,index)=>{
                            return (<p key={index}>{index+1}-{st}</p>)
                        })}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
export default StationsTransitPreview
