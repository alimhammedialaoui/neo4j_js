import React, {Component} from 'react';
import FormMoyenDeTransport from "./FormMoyenDeTransport";
import MoyenDeTransportPreview from "./MoyenDeTransportPreview";

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
                    formtransportHidden:!this.state.formtransportHidden
                })}>Add Transport</button>
                    <br/><br/>
            <MoyenDeTransportPreview/>
                <hr/>
                {this.state.formtransportHidden && <FormMoyenDeTransport/>}
            </div>
        );
    }
};

export default MoyenDeTransport;
