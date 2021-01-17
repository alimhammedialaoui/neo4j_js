import {useState} from "react"
import UserPreview from "./UserPreview"
import FormUser from "./FormUser";

function Usager() {

    const [formusagerHidden,setFormUsagerHidden] = useState(true)

    return (
        <div>
            <button className="btn btn-outline-info" style={{marginRight:15}} onClick={()=>setFormUsagerHidden(!formusagerHidden)}>Add Usager</button>
            <br/><br/>
            <UserPreview/>
            <hr/>
            {!formusagerHidden && <FormUser/>}

        </div>
    );
}

export default Usager;
