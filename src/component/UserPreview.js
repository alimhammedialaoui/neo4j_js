import React, {Component} from 'react';
import Api from "../api/call"

class UserPreview extends Component{

    state = {
        usagers:[]
    }
    render() {
        return(
            <div className="container">
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th>Nom complet</th>
                        <th>Handicap</th>
                        <th>Fonction</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.usagers.map(usager =>{
                        return (<tr>
                            <td className="align-middle">{usager.nomComplet}</td>
                            <td className="align-middle">{usager.handicap}</td>
                            <td className="align-middle">{usager.fonction}</td>
                            <td>
                                <button className="btn btn-info">Update</button>
                                |
                                <button className="btn btn-info">Delete</button>
                            </td>
                        </tr>)
                    })}

                    </tbody>
                </table>
            </div>
        )
    }

    componentDidMount(){
        var us = Api.getUsagers()
        console.log(us)
        this.setState({
            usagers: us
        })
    }
}
export default UserPreview
