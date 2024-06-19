import React, {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Looks from "./pages/Looks";
import Sales from "./pages/Sales";
import Info from "./pages/Info";
import Cart from "./pages/Cart";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";

import ApiManager from "./Managers/ApiManager";

const App = () => {
    let apiManager = new ApiManager();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem("token");
        if(token)
        {
            apiManager.SetToken(token);

            apiManager.SendRequest({
                method: "GET",
                endpoint: "/check_jwt",
            })
            .then(result => {
                localStorage.setItem("username", result.data.username);
                setIsLoggedIn(true);
            })
            .catch(error => {
                apiManager.RemoveToken()
                localStorage.removeItem("token");
                localStorage.removeItem("username");
            })
        }
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/catalog"} element={<Catalog />} />
                <Route path={"/looks"} element={<Looks />} />
                <Route path={"/sales"} element={<Sales />} />
                <Route path={"/info"} element={<Info />} />
                <Route path={"/cart"} element={<Cart />} />
                <Route path={"/login"} element={<LoginPage apiManager={apiManager} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                <Route path={"/admin"} element={<AdminPage apiManager={apiManager} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;