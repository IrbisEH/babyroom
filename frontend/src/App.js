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

import SessionManager from "./SessionManager";

const App = () => {

    debugger

    const Session = new SessionManager();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if(Session.token)
        {
            Session.SendRequest({
                method: "get",
                target: "check_jwt",
            }).then(result => {
                Session.Login(result.data.username, Session.token);
                setIsLoggedIn(true);
            }).catch(error => {
                Session.Logout()
            });
        }
    });

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/catalog"} element={<Catalog />} />
                <Route path={"/looks"} element={<Looks />} />
                <Route path={"/sales"} element={<Sales />} />
                <Route path={"/info"} element={<Info />} />
                <Route path={"/cart"} element={<Cart />} />
                <Route path={"/login"} element={<LoginPage Session={Session} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                <Route path={"/admin"} element={<AdminPage Session={Session} isLoggedIn={isLoggedIn} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;