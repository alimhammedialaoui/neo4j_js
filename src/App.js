import './App.css';
import {Component} from 'react'
import usager from './component/Usager';
import MoyenDeTransport from './component/MoyenDeTransport';
class App extends Component{
  render() {
    return(
    <div className="container">
      Adnane
      <MoyenDeTransport/>
       
       
        <usager/>
        
    </div>
    )
  }
}
export default App;
