import React from "react";
import Navbar from "../components/Navbar/Navbar";
import {useMediaQuery} from "react-responsive";

const Sales = () => {

    const isMobile = useMediaQuery({ maxWidth: "800px" });

    return (
        <>
            <Navbar isMobile={isMobile} />
            <h1 style={{textAlign: "center"}}>Sales page</h1>
        </>
    );
}

export default Sales;