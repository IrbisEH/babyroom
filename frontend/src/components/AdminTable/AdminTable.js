import React, { useRef, useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Form from "../Form/Form"
import AdminProductModalCard from "../Cards/AdminProductModalCard";

import "./AdminTable.css"

const TableForm = ({ formConfig, formState, setFormState, addFilesState, setAddFilesState, isFormOpen, setIsFormOpen, handleSubmit }) => {
	const formRef = useRef(null);

	const handleKeyDown = (event) => {
		if(event.key === "Escape") {
			setIsFormOpen(false);
        }
	}

	useEffect(() => {
		const form = formRef.current;
		form && isFormOpen ? form.showModal() : form.close();
	}, [isFormOpen]);

	return (
		<dialog ref={formRef} onKeyDown={handleKeyDown}>
			<div className="table_form__wrapper">
				<IoClose className="table_form__close_icon" onClick={() => setIsFormOpen(false)} size={20}/>
				<Form
					formConfig={formConfig}
					formState={formState}
					setFormState={setFormState}
					addFilesState={addFilesState}
					setAddFilesState={setAddFilesState}
					handleSubmit={handleSubmit}
				/>
			</div>
		</dialog>
	);
}

const AdminTable = ({ Manager }) => {

	const [isFormOpen, setIsFormOpen] = useState(false);
	const [formState, setFormState] = useState(Manager.GetFormModel());
	const [addFilesState, setAddFilesState] = useState({});

	const [isProductCardOpen, setIsProductCardOpen] = useState(false);
	const [productCardModel, setProductCardModel] = useState({});

	Manager.handleEditBtnClick = (event, row) => {
		let model = Manager.GetFormModel(row);
		setFormState(model);
		setIsFormOpen(true);
	}

	if(Manager.hasOwnProperty("GetProductCardModel"))
	{
		Manager.handleProductCardOpen = (event, row) => {
			let model = Manager.GetModel(row);
			setProductCardModel(model);
			setIsProductCardOpen(true);
		}
	}

	Manager.handleDeleteBtnClick = (event, row) => {
		let model = Manager.GetModel(row);
		Manager.Delete(model);
	}

	const handleAddBtnClick = () => {
		let model = Manager.GetFormModel();
		setFormState(model)
		setIsFormOpen(true);
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		const model = Manager.GetModel(formState);
		const fileList = Object.values(addFilesState)
        const formData = new FormData();

		Object.keys(model).forEach(key => {
			formData.append(key, model[key]);
        });

		if(fileList.length)
			fileList.map(file => formData.append("files", file))

		Manager.Save(formData);

		setIsFormOpen(false);
		setFormState(Manager.GetFormModel());
		setAddFilesState({})
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
					formConfig={Manager.formConfig}
					formState={formState}
					setFormState={setFormState}
					addFilesState={addFilesState}
					setAddFilesState={setAddFilesState}
					isFormOpen={isFormOpen}
					setIsFormOpen={setIsFormOpen}
					handleSubmit={handleSubmit}
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