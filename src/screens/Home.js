import React, {Component} from 'react';
import Api from "../api/call"
import FormUser from "../component/FormUser";
class Home extends Component {

    constructor(props) {
        super(props);
    }

    callApi = ()=>{
        return Api.call();
    }

    getApi = ()=>{
        return Api.getUsagers();
    }




    render() {
        return (
            <div>
                <FormUser/>

                <button onClick={this.getApi} >Get usagers</button>
            </div>
        );
    }
}

export default Home;
