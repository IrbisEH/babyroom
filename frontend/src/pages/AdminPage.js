import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import AdminTable from "../components/AdminTable/AdminTable";
import UnitsManager from "../Managers/UnitsManager";
import ProductRuleManager from "../Managers/ProductRuleManager";
import TagManager from "../Managers/TagManager";
import CategoryManager from "../Managers/CategoryManager"
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

    const [unitsData, setUnitsData] = useState([]);
    const [ruleData, setRuleData] = useState([]);
    const [tagData, setTagData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [productData, setProductData] = useState([]);

    const unitsManager = new UnitsManager({
        apiManager: apiManager,
        data: unitsData,
        dataSetter: setUnitsData
    });

    const productRuleManager = new ProductRuleManager({
        apiManager: apiManager,
        data: ruleData,
        dataSetter: setRuleData
    });

    const tagManager = new TagManager({
        apiManager: apiManager,
        data: tagData,
        dataSetter: setTagData
    });

    const categoryManager = new CategoryManager({
        apiManager: apiManager,
        data: categoryData,
        dataSetter: setCategoryData
    });

    const productManager = new ProductManager({
        apiManager: apiManager,
        data: productData,
        dataSetter: setProductData,
        unitsData: unitsData,
        ruleData: ruleData,
        tagData: tagData,
        categoryData: categoryData
    });

    useEffect(() => {
        if(isLoggedIn)
        {
            unitsManager.Get();
            productRuleManager.Get();
            tagManager.Get();
            categoryManager.Get();
            productManager.Get();
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
                        Manager={unitsManager}
                    />
                    <AdminTable
                        Manager={productRuleManager}
                    />
                    <AdminTable
                        Manager={tagManager}
                    />
                    <AdminTable
                        Manager={categoryManager}
                    />
                    <AdminTable
                        Manager={productManager}
                    />
                </>
            )}
        </>
    );
}

export default AdminPage;