import {useState} from "react"
import UserPreview from "./UserPreview"
import FormUser from "./FormUser";
import FormMoyenDeTransport from "./FormMoyenDeTransport";

function Usager() {

    const [formusagerHidden,setFormUsagerHidden] = useState(true)
    const [formtransportHidden,setFormTransportHidden] = useState(true)


    return (
        <div>
            <button className="btn btn-outline-info" style={{marginRight:15}} onClick={()=>setFormUsagerHidden(!formusagerHidden)}>Add Usager</button>
            <br/><br/>
            <UserPreview/>
            <hr/>
            {!formusagerHidden && <FormUser/>}
            <hr/>
            {!formtransportHidden && <FormMoyenDeTransport/>}
        </div>
    );
}

export default Usager;
