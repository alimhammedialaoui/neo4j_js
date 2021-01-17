import './App.css';
import Usager from './component/Usager';
import MoyenDeTransport from './component/MoyenDeTransport';
import {Component} from 'react'
// import Home from "./screens/Home";
class App extends Component {
  render(){return (
    <div className="container">
        <h3>Neo4j App</h3><hr/>
        <Usager/>
        
        <MoyenDeTransport/>
    </div>
    )
  }
}
export default App;
