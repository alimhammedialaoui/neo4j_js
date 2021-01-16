import './App.css';
import Usager from './component/Usager'
import {useState} from "react"
import moyenDeTransport from './component/MoyenDeTransport'
import MoyenDeTransport from "./component/MoyenDeTransport";
// import Home from "./screens/Home";
function App() {

    const [usagerHidden,setUsagerHidden] = useState(true)
    const [transportHidden,setTransportHidden] = useState(true)

  return (
    <div className="container">
        <h3>Neo4j App</h3><hr/>
        <button className="btn btn-outline-dark" onClick={()=>setUsagerHidden(!usagerHidden)}>Afficher Usager</button><br/><br/>
        {!usagerHidden && <Usager/>}
        <button className="btn btn-outline-dark" onClick={()=>setTransportHidden(!transportHidden)}>Afficher Transport</button><br/><br/>
        {!transportHidden && <MoyenDeTransport/>}
    </div>

    )
  }

export default App;
