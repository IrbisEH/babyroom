import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import AdminTable from "../components/AdminTable/AdminTable";
import ProductCategoryModel from "../Models/ProductCategoryModel"
import ProductModel from "../Models/ProductModel"



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

    const productCategoryModel = new ProductCategoryModel({
        apiManager: apiManager,
        tableData: productCategoryData,
        tableDataSetter: setProductCategoryData
    });

    const productModel = new ProductModel({
        apiManager: apiManager,
        tableData: productData,
        tableDataSetter: setProductData
    })

    useEffect(() => {
        if(isLoggedIn)
        {
            productCategoryModel.GetData();
            productModel.GetData();
        }
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
                    <AdminTable
                        tableName={productCategoryModel.tableName}
                        columnsConfig={productCategoryModel.columnsConfig}
                        tableData={productCategoryModel.tableData}

                    />
                    <AdminTable
                        tableName={productModel.tableName}
                        columnsConfig={productModel.columnsConfig}
                        tableData={productModel.tableData}
                    />
                </>
            )}
        </>
    );
}

export default AdminPage;