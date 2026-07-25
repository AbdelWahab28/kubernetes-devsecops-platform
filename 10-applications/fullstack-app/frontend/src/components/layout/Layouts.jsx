import React from "react";
import { Outlet } from "react-router-dom";
import MyNavBar from "../partials/MyNavBar";
function Layouts(){
    return(
        <React.StrictMode>
            < MyNavBar />
            <Outlet/>
        </React.StrictMode>
    )

}

export default Layouts;