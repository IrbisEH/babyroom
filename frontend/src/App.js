import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Looks from "./pages/Looks";
import Sales from "./pages/Sales";
import Info from "./pages/Info";
import Cart from "./pages/Cart";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/catalog"} element={<Catalog />} />
                <Route path={"/looks"} element={<Looks />} />
                <Route path={"/sales"} element={<Sales />} />
                <Route path={"/info"} element={<Info />} />
                <Route path={"/cart"} element={<Cart />} />
                <Route path={"/login"} element={<LoginPage />} />
                <Route path={"/admin"} element={<AdminPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;