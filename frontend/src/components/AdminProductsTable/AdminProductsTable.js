import React, { useState } from "react";
import DataTable from 'react-data-table-component';
import CreateProductCategoryFormModal from "../CreateProductCategoryModal/CreateProductCategoryFormModal"

const ProductCategoryModel = function(Params)
{
	let model = {};

	model.id = Params && Params.id ? Params.id : "";
	model.name = Params && Params.name ? Params.name : "";
	model.description = Params && Params.description ? Params.description : "";
	model.units = Params && Params.units ? Params.units : "";

	return model;
}

const ProductModel = function(Params)
{
    let model = {};

    model.id = Params && Params.id ? Params.id : "";
    model.category_id = Params && Params.category_id ? Params.category_id : "";
    model.enable = Params
    model.title = Params && Params.title ? Params.title : "";
    model.subtitle = Params && Params.subtitle ? Params.subtitle : "";
    model.description = Params && Params.description ? Params.description : "";
    model.img_path = Params && Params.img_path ? Params.img_path : "";
    model.price = Params && Params.price ? Params.price : "";
}

const ProductCategoryColumns = [
	{
		name: "Название",
		selector: row => row.name,
	},
	{
		name: "Описание",
		selector: row => row.description,
	},
	{
		name: "Размеры",
		selector: row => row.units,
	},

];

const data = [

]

const AdminProductsTable = ({ apiManager }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
	}

    return (
		<>
			<h1>категории товаров</h1>
			<div style={{display: "flex", gap: "1em"}}>
				<button onClick={handleOpenModal}>
					Добавить
				</button>
			</div>
			<DataTable
				columns={ProductCategoryColumns}
				data={data}
				pagination
			/>
			<CreateProductCategoryFormModal
				apiManager={apiManager}
				isOpen={isModalOpen}
				onClose={handleCloseModal}
			/>
		</>
	)
}

export default AdminProductsTable;