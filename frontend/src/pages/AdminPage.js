import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import AdminTable from "../components/AdminTable/AdminTable";
import CategoriesManager from "../Managers/CategoriesManager"
import ProductManager from "../Managers/ProductManagers"


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

    const [categoriesData, setCategoriesData] = useState([]);
    // const [productData, setProductData] = useState([]);

    const productCategoryManager = new CategoriesManager({
        apiManager: apiManager,
        data: categoriesData,
        dataSetter: setCategoriesData
    });

    // const productManager = new ProductManager({
    //     apiManager: apiManager,
    //     tableData: productData,
    //     tableDataSetter: setProductData,
    //     productCategoriesData: productCategoryData
    // });

    useEffect(() => {
        if(isLoggedIn)
        {
            productCategoryManager.Get();
            // productManager.GetData();
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
                    />
                    {/*<AdminTable*/}
                    {/*    Manager={productManager}*/}
                    {/*    TableData={productData}*/}
                    {/*    TableDataSetter={setProductData}*/}
                    {/*/>*/}
                </>
            )}
        </>
    );
}

export default AdminPage;