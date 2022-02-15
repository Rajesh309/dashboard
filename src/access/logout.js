import React from "react";
import {Button} from "@mui/material";
export const Logout = (props) => {

    const handleSignOut = () => {
        localStorage.clear();
        window.history.back()
    }
    return <Button variant = "outlined" style ={{alignSelf:"flex-end",width:"10rem"}} size="medium" onClick={handleSignOut}>Sign Out</Button>
}