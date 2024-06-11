import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminProductsTable from "../components/AdminProductsTable/AdminProductsTable";

const AdminPage = ({ Session }) => {

    const navigate = useNavigate();

    useEffect(() => {
        Session.CheckToken()
            .then(response => {
                if(!response)
                {
                    navigate("/login");
                }
            });
    });

    const Logout = () => {
        Session.Logout();
        navigate("/login")
    }

    return (
        <>
            <header className="admin_header">
                <h1>BABYROOM ADMIN</h1>
                <div className="admin_header_toolbar">
                    <button onClick={Logout}>Выход</button>
                </div>
            </header>
            <section className="products">
                <>
                    <AdminProductsTable />
                </>
            </section>
        </>
    );
}

export default AdminPage;