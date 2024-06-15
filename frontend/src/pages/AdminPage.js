import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminProductsTable from "../components/AdminProductsTable/AdminProductsTable";


const AdminPage = ({ apiManager, isLoggedIn, setIsLoggedIn }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoggedIn)
            navigate("/login");
    });

    const Logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        apiManager.RemoveToken();
        setIsLoggedIn(false);
    }

    return (
        <>
            {isLoggedIn && (
                <>
                    <header className="admin_header">
                        <h1>BABYROOM ADMIN</h1>
                        <div className="admin_header_toolbar">
                            <button onClick={Logout}>Выход</button>
                        </div>
                    </header>
                    <section className="products">
                        <AdminProductsTable apiManager={apiManager}/>
                    </section>
                </>
            )}
        </>
    );
}

export default AdminPage;