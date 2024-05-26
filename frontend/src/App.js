import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import PromoSection from "./components/PromoSection";


const App = () => {
    return (
        <Router>
            <Navbar />
            <PromoSection />
        </Router>
    );
}

export default App;