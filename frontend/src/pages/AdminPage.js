import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import AdminTable from "../components/AdminTable/AdminTable";
import ProductCategoryManager from "../Managers/ProductCategoryManager"
import ProductManager from "../Managers/ProductManagers"



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
    const [productData, setProductData] = useState([]);

    const productCategoryManager = new ProductCategoryManager({
        apiManager: apiManager,
        tableData: productCategoryData,
        tableDataSetter: setProductCategoryData
    });

    const productManager = new ProductManager({
        apiManager: apiManager,
        tableData: productData,
        tableDataSetter: setProductData,
        productCategoriesData: productCategoryData
    });

    useEffect(() => {
        if(isLoggedIn)
        {
            productCategoryManager.Get();
            productManager.GetData();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
                    <AdminTable
                        Manager={productCategoryManager}
                        TableData={productCategoryData}
                        TableDataSetter={setProductCategoryData}

                    />
                    <AdminTable
                        Manager={productManager}
                        TableData={productData}
                        TableDataSetter={setProductData}
                    />
                </>
            )}
        </>
    );
}

export default AdminPage;