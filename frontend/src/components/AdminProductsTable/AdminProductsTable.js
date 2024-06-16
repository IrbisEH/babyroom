import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { ProductCategoryFormModal, FormProductCategoryModel } from "../ProductCategoryFormModal/ProductCategoryFormModal"
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";

import "./AdminProductsTable.css";

const ProductCategoryModel = function(Params)
{
	let model = {};

	model.id = Params && Params.id ? Params.id : "";
	model.name = Params && Params.name ? Params.name : "";
	model.description = Params && Params.description ? Params.description : "";

	try
	{
		model.units = JSON.parse(Params.units);
	}
	catch(e)
	{
		model.units = "";
	}

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

const AdminProductsTable = ({ apiManager }) => {

	const [submitBtnName, setSubmitBtnName] = useState("Добавить");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formState, setFormState] = useState(FormProductCategoryModel());
	const [tableData, setTableData] = useState([]);

	const productCategoriesColumns = [
		{
			id: "id",
			name: "id",
			selector: row => row.id,
			width: "100px",
		},
		{
			id: "name",
			name: "Название",
			selector: row => row.name,
			width: "200px",
		},
		{
			id: "description",
			name: "Описание",
			selector: row => row.description,
		},
		{
			id: "units",
			name: "Размеры",
			selector: row => (
				<div>
					{row.units && row.units.length > 0 ? (
						row.units.map((item, i) => (
							<div key={`unit_${i}`}>{item}</div>
						))
					) : (
						<div>-</div>
					)}
				</div>
			),
		},
		{
			id: "edit",
			cell: row => (
				<div onClick={(event) => handleEditIconClick(event, row)}>
					<FaRegEdit size={16}/>
				</div>
			),
			button: "true",
			width: "50px",
		},
		{
			id: "trash",
			cell: row => (
				<div onClick={(event) => handleTrashIconClick(event, row)}>
					<FaRegTrashCan size={16}/>
				</div>
			),
			button: "true",
			width: "50px",
		}
	];

	const handleEditIconClick = (event, row) => {
		if(row && row.id)
		{
			setSubmitBtnName("Применить");
			setFormState(FormProductCategoryModel(row));
			setIsModalOpen(true);
		}
	}

	const handleTrashIconClick = (event, row) => {
		if(row && row.id)
		{
			apiManager.SendRequest({
				method: "DELETE",
				endpoint: "/product_category",
				data: {product_category_id: row.id}
			})
			.then(result => setTableData(prevState => prevState.filter(item => item.id !== row.id)))
			.catch(error => console.log(error))
		}
	}

	const handleOpenModal = () => {
		setSubmitBtnName("Добавить");
		setFormState(FormProductCategoryModel());
		setIsModalOpen(true);
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
	}

	useEffect(() => {
		apiManager.SendRequest({
			method: "GET",
			endpoint: "/product_category",
		})
		.then(response => {
			if(response.data)
			{
				let data = response.data.map(item => ProductCategoryModel(item));
                setTableData(prevData => data.concat(prevData));
			}
		})
		.catch(error => console.log(error));
	}, []);

    return (
		<>
			<div className="table_toolbar">
				<h1>категории товаров</h1>
				<IoMdAddCircleOutline onClick={handleOpenModal} size={20}/>
			</div>
			<DataTable
				columns={productCategoriesColumns}
				data={tableData}
				pagination
			/>
			<ProductCategoryFormModal
				apiManager={apiManager}
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				formState={formState}
				setFormState={setFormState}
				setTableData={setTableData}
				submitBtnName={submitBtnName}
			/>
		</>
	)
}

export default AdminProductsTable;