
class StationsTransit{


    render(){
        return (
            <div>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label htmlFor="inputState">Station de depart</label>
                        <select className="form-control" value={this.state.selectedMT} onChange={ e=> this.setState({selectedMT: e.target.value})}>
                            {this.state.moyenTransport.map(mt => {
                                return (
                                    <option key={mt.properties.no} value={mt.properties.no}>{mt.properties.type}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group col-md-1">
                        <label htmlFor="inputState">Station d'arrivee</label>
                    </div>
                </div>
                <button className="btn btn-primary col-md-2" onClick={this.postPreference}>Add preference</button>

            </div>
        )
    }
}
export default StationsTransit;
