import './App.css';
import Usager from './component/Usager'
import {useState} from "react"
import MoyenDeTransport from "./component/MoyenDeTransport";
import ShortestPath from "./component/ShortestPath";
import StationsTransit from "./component/StationsTransit";
import TransportAdequat from "./component/TransportAdequat";
function App() {

    const link = "bolt://localhost:7687";
    const username = "neo4j";
    const password = "1234";

    const [usagerHidden,setUsagerHidden] = useState(true)
    const [transportHidden,setTransportHidden] = useState(true)
    const [shortestPathHidden,setShortestPathHidden] = useState(true)
    const [stationTransitHidden,setStationTransitHidden] = useState(true)
    const [transportAdequatHidden,setTransportAdequatHidden] = useState(true)

  return (
    <div className="container">
        <h3>Neo4j App</h3><hr/>
        <button className="btn btn-outline-dark col-md-2" onClick={()=>setUsagerHidden(!usagerHidden)}>Afficher Usager</button>
        <span className="col-md-1"></span>
        <button className="btn btn-outline-dark col-md-2" onClick={()=>setTransportHidden(!transportHidden)}>Afficher Transport</button>
        <span className="col-md-1"></span>
        <button className="btn btn-outline-dark col-md-2" onClick={()=>setShortestPathHidden(!shortestPathHidden)}>Cours chemin</button>
        <span className="col-md-1"></span>
        <button className="btn btn-outline-dark col-md-2" onClick={()=>setStationTransitHidden(!stationTransitHidden)}>Station de transit</button>
        <span className="col-md-1"></span>
        <button className="btn btn-outline-dark" onClick={()=>setTransportAdequatHidden(!transportAdequatHidden)}>Moyen de transport adequat</button><br/><hr/>
        {!usagerHidden && <Usager link={link} username={username} password={password}/>}
        {!transportHidden && <MoyenDeTransport link={link} username={username} password={password}/>}
        {!shortestPathHidden && <ShortestPath link={link} username={username} password={password}/>}
        {!stationTransitHidden && <StationsTransit link={link} username={username} password={password}/>}
        {!transportAdequatHidden && <TransportAdequat link={link} username={username} password={password}/>}
    </div>
    )
  }

export default App;
