import React, {Component} from 'react';
import Api from "../api/call"
import FormMoyenDeTransport from "./FormMoyenDeTransport";

class MoyenDeTransport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: "",
            handicap: "false",
            fonction: "",
            formtransportHidden:false
        }
    }





    render() {
        return (
            <div>
               <h3>Adnane M'barki is the best</h3><hr/>
                <button className="btn btn-outline-info" onClick={()=>this.setState({
                    formtransportHidden:true
                })}>Add Transport</button>
                <hr/>
                {!this.state.formtransportHidden && <FormMoyenDeTransport/>}
            </div>
        );
    }
};

export default MoyenDeTransport;
