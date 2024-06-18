import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import AdminTable from "../components/AdminTable/AdminTable";
import ProductCategoryModel from "../Models/ProductCategoryModel"



// const AdminTable = ({ apiManager, columnsConfig, tableData, setTableData, tableName }) => {

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

    const [productCategoryData, setProductCategoryData] = useState([]);

    const productCategory = new ProductCategoryModel({
        apiManager: apiManager,
        tableData: productCategoryData,
        tableDataSetter: setProductCategoryData
    });

    useEffect(() => {
        if(isLoggedIn)
            productCategory.GetData();
    }, []);

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
                    <section className="table">
                        <AdminTable
                            tableName={productCategory.tableName}
                            columnsConfig={productCategory.columnsConfig}
                            tableData={productCategory.tableData}

                        />
                    </section>
                </>
            )}
        </>
    );
}

export default AdminPage;