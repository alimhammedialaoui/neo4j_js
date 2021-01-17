import {useState} from "react"
import UserPreview from "./UserPreview"
import FormUser from "./FormUser";

function Usager(props) {

    const [formusagerHidden,setFormUsagerHidden] = useState(true)

    return (
        <div className="container">
            <h4>Afficher usager</h4><hr/>
            <button className="btn btn-outline-info" style={{marginRight:15}} onClick={()=>setFormUsagerHidden(!formusagerHidden)}>Add Usager</button>
            <br/><br/>
            <UserPreview link={props.link} username={props.username} password={props.password}/>
            <hr/>
            {!formusagerHidden && <FormUser link={props.link} username={props.username} password={props.password}/>}

        </div>
    );
}

export default Usager;
