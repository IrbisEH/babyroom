import React from "react";
import "./AdminProductsTable.css"

const ConvertPropsNameDic = {
    title: "Название",
    subtitle: "Мини описание",
    description: "Описание",
    price: "Цена"
}

const ProductModel = function(Params)
{
    let model = {};

    model.id = Params && Params.id ? Params.id : "";
    model.enable = Params
    model.title = Params && Params.title ? Params.title : "";
    model.subtitle = Params && Params.subtitle ? Params.subtitle : "";
    model.description = Params && Params.description ? Params.description : "";
    model.img_path = Params && Params.img_path ? Params.img_path : "";
    model.price = Params && Params.price ? Params.price : "";
}

const AdminProductsTable = () => {
    return (
        <div className="table_header">
            {Object.keys(ConvertPropsNameDic).map((key) => (
                <div key={key} id={key} className="header_cell">{ConvertPropsNameDic[key]}</div>
            ))}
        </div>
    )
}

export default AdminProductsTable;