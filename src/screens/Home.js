import React, {Component} from 'react';
import Api from "../api/call"
class Home extends Component {

    constructor(props) {
        super(props);
    }

    callApi = ()=>{
        return Api.call();
    }


    render() {
        return (
            <div>
                <p>Test</p>
                <button onClick={this.callApi} >Click</button>
            </div>
        );
    }
}

export default Home;
