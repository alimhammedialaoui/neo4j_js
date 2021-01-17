import React, {Component} from 'react';
import FormMoyenDeTransport from "./FormMoyenDeTransport";
import MoyenDeTransportPreview from "./MoyenDeTransportPreview";
import FormUser from "./FormUser";

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
            <div className="container">
                <h4>Afficher transport</h4><hr/>
                <button className="btn btn-outline-info" onClick={()=>this.setState({
                    formtransportHidden:!this.state.formtransportHidden
                })}>Add Transport</button>
                    <br/><br/>
            <MoyenDeTransportPreview link={this.props.link} username={this.props.username} password={this.props.password}/>
                <hr/>
                {this.state.formtransportHidden && <FormMoyenDeTransport link={this.props.link} username={this.props.username} password={this.props.password}/>}
            </div>
        );
    }
};

export default MoyenDeTransport;
