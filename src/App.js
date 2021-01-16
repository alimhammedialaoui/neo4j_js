import './App.css';
import usager from './component/Usager'
import moyenDeTransport from './component/MoyenDeTransport'
function App() {
  return (
    <div className="container">
        <h3>Neo4j App</h3><hr/>
        <usager/>
        <moyenDeTransport/>
    </div>
  );
}

export default App;
