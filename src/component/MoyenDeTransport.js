import React, {Component} from 'react';
import Api from "../api/call"

class MoyenDeTransport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: "",
            handicap: "false",
            fonction: ""
        }
    }

   

 
    
    render() {
        return (
            <div>
               <h3>Neo4j App</h3><hr/>
            </div>
        );
    }
};

export default MoyenDeTransport;
