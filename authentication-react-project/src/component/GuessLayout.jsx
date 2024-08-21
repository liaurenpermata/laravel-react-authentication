import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function GuessLayout( ){
    const {token} = useStateContext()

    if(token) {
        return <Navigate to='/'/>
    }
    
    return(
        <div id="guessLayout">
            <Outlet/>
        </div>
    )
}