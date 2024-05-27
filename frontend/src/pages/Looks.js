import React from "react";
import Navbar from "../components/Navbar/Navbar";
import {useMediaQuery} from "react-responsive";

const Looks = () => {

    const isMobile = useMediaQuery({ maxWidth: "800px" });

    return (
        <>
            <Navbar isMobile={isMobile} />
            <h1 style={{ textAlign: "center" }}>Looks page</h1>
        </>
    );
}

export default Looks;