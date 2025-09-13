import { useNavigate } from "react-router-dom";

function Button(){
    const navigate= useNavigate();
    return(
        
            <button className="butt" onClick={()=> navigate("/Card")}>HEHE</button>
        
    )
}
export default Button;