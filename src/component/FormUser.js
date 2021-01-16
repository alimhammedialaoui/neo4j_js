import React, {Component} from 'react';

class FormUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: "",
            handicap: false,
            fonction: ""
        }
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div>
                <label>Age</label>
                <input
                    name="age"
                    value={this.age}
                    onChange={this.changeHandler}/><br/>
                <label>Handicap</label>
                <input
                    name="handicap"
                    value={this.handicap}
                    onChange={this.changeHandler}/><br/>
                <label>Fonction</label>
                <input
                    name="fonction"
                    value={this.fonction}
                    onChange={this.changeHandler}/><br/>
                <button onClick={() => console.log(this.state)}>Click</button>
            </div>
        );
    }
}

export default FormUser;
