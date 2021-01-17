import './App.css';
import Usager from './component/Usager'
import StationsTransit from './component/StationsTransit'
import MoyenDeTransport from './component/MoyenDeTransport';
import {useState} from "react"
import moyenDeTransport from './component/MoyenDeTransport'
import MoyenDeTransport from "./component/MoyenDeTransport";
import ShortestPath from "./component/ShortestPath";
// import Home from "./screens/Home";
function App() {

    const [usagerHidden,setUsagerHidden] = useState(true)
    const [transportHidden,setTransportHidden] = useState(true)
    const [shortestPathHidden,setShortestPathHidden] = useState(true)
    const [stationsTransitHidden,setStationsTransitHidden] = useState(true)

  return (
    <div className="container">
        <h3>Neo4j App</h3><hr/>
        <button className="btn btn-outline-dark" onClick={()=>setUsagerHidden(!usagerHidden)}>Afficher Usager</button><br/><br/>
        {!usagerHidden && <Usager/>}
        <button className="btn btn-outline-dark" onClick={()=>setTransportHidden(!transportHidden)}>Afficher Transport</button><br/><br/>
        {!transportHidden && <MoyenDeTransport/>}
        <button className="btn btn-outline-dark" onClick={()=>setShortestPathHidden(!shortestPathHidden)}>Cours chemin</button><br/><br/>
        {!shortestPathHidden && <ShortestPath/>}
        <button className="btn btn-outline-dark" onClick={()=>setStationsTransitHidden(!stationsTransitHidden)}>Afficher stations de transit</button><br/><br/>
        {!stationsTransitHidden && <StationsTransit/>}
    </div>

    )
  }

export default App;
