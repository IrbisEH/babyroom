import React from "react";
import Navbar from "../components/Navbar/Navbar";
import {useMediaQuery} from "react-responsive";

const Info = () => {

    const isMobile = useMediaQuery({ maxWidth: "800px" });

    return (
        <>
            <Navbar isMobile={isMobile} />
            <h1 style={{ textAlign: "center" }}>Info page</h1>
        </>
    );
}

export default Info;