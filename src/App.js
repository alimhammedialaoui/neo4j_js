import './App.css';
//import MoyenDeTransport from './component/MoyenDeTransport';
import Usager from "./component/Usager";
// import Home from "./screens/Home";

function App() {
  return (
    <div className="container">
        <h3>Neo4j App</h3><hr/>
        <Usager/>
        {/*<MoyenDeTransport/>*/}
        {/*<Home/>*/}
    </div>
  );
}

export default App;
