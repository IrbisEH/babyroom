import React from "react";
import Navbar from "../components/Navbar/Navbar";
import {useMediaQuery} from "react-responsive";

const Catalog = ({ isLoggedIn }) => {

    const isMobile = useMediaQuery({ maxWidth: "800px" });

    return (
        <main>
            <Navbar isMobile={isMobile} isLoggedIn={isLoggedIn} />
            <h1 style={{ textAlign: "center" }}>Catalog page</h1>
        </main>
    );
}

export default Catalog;