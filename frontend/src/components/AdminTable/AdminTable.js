import React, { useRef, useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";


import "./AdminTable.css"
import {FormProductCategoryModel} from "../ProductCategoryFormModal/ProductCategoryFormModal";


const FormSubmitBtnTypes = {
	add: {type:"add", btnText:"Добавить"},
	edit: {type:"edit", btnText:"Редактировать"}
}

const TableForm = ({ parentId, isFormOpen, setIsFormOpen, formConfig, formState, formType, handleApplyFormBtnClick }) => {
	const Id = formConfig && formConfig.Id ? parentId + formConfig.Id : parentId + "TableForm";
	const formRef = useRef(null);


	useEffect(() => {
		const form = formRef.current;
		form && isFormOpen ? form.showModal() : form.close();
	}, [isFormOpen]);

	return (
		<dialog ref={formRef} onKeyDown={() => console.log("key")}>
			<div className="table_form__wrapper">
				<IoClose className="table_form__close_icon" onClick={() => setIsFormOpen(false)} size={20}/>
				<form onSubmit={() => console.log("submit")}>
					{formConfig.map(item => (
						<div key={Id + item.id} className="table_form__row">
							<label htmlFor={item.id}>{item.label}</label>
							{
								<item.type
									id={item.id}
									name={item.label}
									value={formState[item.id]}
									onChange={(e) => (console.log(e))}
									required={item.required}
								/>
							}
						</div>
					))}
					<div className="form-row">
						<button type="submit" onClick={handleApplyFormBtnClick}>{formType.btnText}</button>
					</div>
				</form>
			</div>
		</dialog>
	);
}

const AdminTable = ({ model, tableData, tableDataSetter }) => {

	const Id = "AdminTable";

	const [isFormOpen, setIsFormOpen] = useState(false);
	const [formState, setFormState] = useState([]);
	const [formType, setFormType] = useState(FormSubmitBtnTypes.add);

	const handleAddBtnClick = (event) => {
		setIsFormOpen(true);
	}

	const handleApplyFormBtnClick = (event) => {
		if(formType.type === "add")
		{
			console.log("ApplyBtnClick Add")
		}
		else if(formType.type === "edit")
		{

		}
	}

	const handleEditBtnClick = (event, row) => {
		console.log("Edit")
	}

	const handleDeleteBtnClick = (event, row) => {
		console.log("Delete")
	}

	// const handleEditIconClick = (event, row) => {
	// 	if(row && row.id)
	// 	{
	// 		setSubmitBtnName("Применить");
	// 		setFormState(FormProductCategoryModel(row));
	// 		setIsFormOpen(true);
	// 	}
	// }
    //
	// const handleTrashIconClick = (event, row) => {
	// 	if(row && row.id)
	// 	{
	// 		apiManager.SendRequest({
	// 			method: "DELETE",
	// 			endpoint: "/product_category",
	// 			data: {product_category_id: row.id}
	// 		})
	// 		.then(result => setTableData(prevState => prevState.filter(item => item.id !== row.id)))
	// 		.catch(error => console.log(error))
	// 	}
	// }
    //
	// const handleOpenModal = () => {
	// 	setSubmitBtnName("Добавить");
	// 	setFormState(FormProductCategoryModel());
	// 	setIsModalOpen(true);
	// }
    //
	// const handleCloseModal = () => {
	// 	setIsModalOpen(false)
	// }

	model.columnsConfig.map(item => {
		if(item.type === "icon" && item.button)
		{
			switch(item.id)
			{
				case "edit":
					item.cell = row => (
						<div onClick={(event) => handleEditBtnClick(event, row)}>
							<FaRegEdit className="table__btn" size={16}/>
						</div>
					)
					break;
				case "trash":
					item.cell = row => (
						<div onClick={(event) => handleDeleteBtnClick(event, row)}>
							<FaRegTrashCan className="table__btn"  size={16}/>
						</div>
					)
					break;
			}
		}
	});

    return (
		<section className="table">
			<div className="table__toolbar">
				<h1>{model.tableName}</h1>
				{model.formConfig && <IoMdAddCircleOutline className="table__btn"  onClick={handleAddBtnClick} size={20}/>}
			</div>
			<DataTable
				columns={model.columnsConfig}
				data={tableData}
				pagination
			/>
			{model.formConfig && (
				<TableForm
					parentId={Id}
					isFormOpen={isFormOpen}
					setIsFormOpen={setIsFormOpen}
					formConfig={model.formConfig}
					formState={formState}
					formType={formType}
					handleApplyFormBtnClick={handleApplyFormBtnClick}
				/>
			)}
		</section>
	)
}

export default AdminTable;