import React, {Component} from 'react';
import Api from "../api/call"
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
                <p>Test</p>
                <button onClick={this.callApi} >Click</button><br/>
                <button onClick={this.getApi} >Get usagers</button>
            </div>
        );
    }
}

export default Home;
