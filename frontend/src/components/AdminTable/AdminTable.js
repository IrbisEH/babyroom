import React, { useRef, useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Form from "../Form/Form"
import AdminProductModalCard from "../Cards/AdminProductModalCard";

import "./AdminTable.css"

const TableForm = ({ isFormOpen, setIsFormOpen, formConfig, formInitialState, onSubmit }) => {
	const formRef = useRef(null);

	const handleKeyDown = (event) => {
		if(event.key === "Escape") {
			setIsFormOpen(false);
        }
	}

	useEffect(() => {
		const modal = formRef.current;
		modal && isFormOpen ? modal.showModal() : modal.close();
	}, [isFormOpen]);

	return (
		<dialog ref={formRef} onKeyDown={handleKeyDown}>
			<div className="table_form__wrapper">
				<IoClose className="table_form__close_icon" onClick={() => setIsFormOpen(false)} size={20}/>
				<Form
					formConfig={formConfig}
					formInitialState={formInitialState}
					onSubmit={onSubmit}
				/>
			</div>
		</dialog>
	);
}

const AdminTable = ({ Manager }) => {

	const [isFormOpen, setIsFormOpen] = useState(false);
	const [formState, setFormState] = useState(Manager.GetFormModel());

	const [isProductCardOpen, setIsProductCardOpen] = useState(false);
	const [productCardModel, setProductCardModel] = useState({});

	Manager.handleEditBtnClick = (event, row) => {
		setFormState(Manager.GetFormModel(row));
		setIsFormOpen(true);
	}

	Manager.handleDeleteBtnClick = (event, row) => {
		let model = Manager.GetModel(row);
		Manager.Delete(model);
	}

	if(Manager.hasOwnProperty("GetProductCardModel"))
	{
		Manager.handleProductCardOpen = (event, row) => {
			let model = Manager.GetModel(row);
			setProductCardModel(model);
			setIsProductCardOpen(true);
		}
	}

	const handleAddBtnClick = () => {
		let model = Manager.GetFormModel();
		setFormState(model)
		setIsFormOpen(true);
	}

	const handleFormData = (formData) => {

		for (const [key, value] of formData.entries()) {
			console.log(`${key}: ${value}`);
		}

		Manager.Save(formData);
		setIsFormOpen(false);
	}

    return (
		<section className="table">
			<div className="table__toolbar">
				<h1>{Manager.tableName}</h1>
				{Manager.formConfig &&
					<IoMdAddCircleOutline className="table__btn" onClick={handleAddBtnClick} size={20}/>}
			</div>
			<DataTable
				columns={Manager.columnsConfig}
				data={Manager.data}
				pagination
			/>
			{Manager.formConfig && (
				<TableForm
					isFormOpen={isFormOpen}
					setIsFormOpen={setIsFormOpen}
					formConfig={Manager.formConfig}
					formInitialState={formState}
					onSubmit={handleFormData}
				/>
			)}
			{Manager.hasOwnProperty("GetProductCardModel") && (
				<AdminProductModalCard
					isProductCardOpen={isProductCardOpen}
					setIsProductCardOpen={setIsProductCardOpen}
					productCardModel={productCardModel}
				/>
			)}
			<dialog>
				<div className="table_modal">
				</div>
			</dialog>
		</section>
	)
}

export default AdminTable;