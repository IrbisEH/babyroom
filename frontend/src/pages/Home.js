import React from "react";
import Navbar from "../components/Navbar/Navbar";
import PromoSection from "../components/Promosection/PromoSection";
import {useMediaQuery} from "react-responsive";

const Home = () => {

    const isMobile = useMediaQuery({ maxWidth: "800px" });

    return (
        <>
            <Navbar isMobile={isMobile} />
            <PromoSection isMobile={isMobile} />
        </>
    );
}

export default Home;