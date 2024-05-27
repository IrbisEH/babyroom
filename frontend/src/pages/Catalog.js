import React from "react";
import Navbar from "../components/Navbar/Navbar";
import {useMediaQuery} from "react-responsive";

const Catalog = () => {

    const isMobile = useMediaQuery({ maxWidth: "800px" });

    return (
        <main>
            <Navbar isMobile={isMobile} />
            <h1 style={{ textAlign: "center" }}>Catalog page</h1>
        </main>
    );
}

export default Catalog;