import React, { useRef, useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";

import "./AdminTable.css"

const FormSubmitBtnTypes = {
	add: {type:"add", btnText:"Добавить"},
	edit: {type:"edit", btnText:"Редактировать"}
}

const TableForm = ({ Id, isFormOpen, setIsFormOpen, formConfig, formState, setFormState, formType, handleApplyFormBtnClick }) => {

	const formRef = useRef(null);

	const handleKeyDown = (event) => {
		if(event.key === "Escape") {
			setIsFormOpen(false);
        }
	}

	const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }

	useEffect(() => {
		const form = formRef.current;
		form && isFormOpen ? form.showModal() : form.close();
	}, [isFormOpen]);

	return (
		<dialog ref={formRef} onKeyDown={handleKeyDown}>
			<div className="table_form__wrapper">
				<IoClose className="table_form__close_icon" onClick={() => setIsFormOpen(false)} size={20}/>
				<form onSubmit={handleApplyFormBtnClick}>
					{formConfig.map(item => (
						<div key={Id + item.id} className="table_form__row">
							<label htmlFor={item.id}>{item.label}</label>
							{item.type === "select" ? (
								<select
									id={item.id}
									name={item.id}
									// value={item.default}
									onChange={handleInputChange}
									required={item.required}
								>
									{item.options.map((option) => (
										<option key={Id +  "Option" + option.id} value={option.id}>{option.name}</option>
									))}
								</select>
							) : (
								<item.type
									id={item.id}
									name={item.id}
									value={formState[item.id]}
									onChange={handleInputChange}
									required={item.required}
								/>
							)}
						</div>
					))}
					<div className="form-row">
						<button key={Id + "SubmitBtn"} type="submit">{formType && formType.btnText ? formType.btnText : ""}</button>
					</div>
				</form>
			</div>
		</dialog>
	);
}

const AdminTable = ({ Manager, TableData, TableDataSetter }) => {

	const Id = Manager.Id ? Manager.Id : "AdminTable";

	const [isFormOpen, setIsFormOpen] = useState(false);
	const [formState, setFormState] = useState(Manager.GetFormModel());
	const [formType, setFormType] = useState(null);

	const handleAddBtnClick = (event) => {
		setFormType(FormSubmitBtnTypes.add)
		setIsFormOpen(true);
	}

	const handleApplyFormBtnClick = (event) => {
		event.preventDefault();

		let model = Manager.GetModel(formState);
		Manager.Save(model)
		setIsFormOpen(false);
	}

	const handleEditBtnClick = (event, row) => {
		setFormState(Manager.GetFormModel(row));
		setFormType(FormSubmitBtnTypes.edit);
		setIsFormOpen(true);
	}

	const handleDeleteBtnClick = (event, row) => {
		let model = Manager.GetModel(row);
		Manager.Delete(model);
	}

	useEffect(() => {
		if(!isFormOpen)
			setFormState(Manager.GetFormModel());
	}, [isFormOpen, Manager]);

	const columns = Manager.columnsConfig.map(item => {
		if(item.type === "icon")
		{
			if(item.id === "edit")
			{
				item.cell = row => (
					<div onClick={(event) => handleEditBtnClick(event, row)}>
						<FaRegEdit className="table__btn" size={16}/>
					</div>
				)
			}

			if(item.id === "trash")
			{
				item.cell = row => (
					<div onClick={(event) => handleDeleteBtnClick(event, row)}>
						<FaRegTrashCan className="table__btn"  size={16}/>
					</div>
				)
			}
		}
		return item;
	});

    return (
		<section className="table">
			<div className="table__toolbar">
				<h1>{Manager.tableName}</h1>
				{Manager.formConfig && <IoMdAddCircleOutline className="table__btn"  onClick={handleAddBtnClick} size={20}/>}
			</div>
			<DataTable
				columns={columns}
				data={TableData}
				pagination
			/>
			{Manager.formConfig && (
				<TableForm
					Id={Id + "TableForm"}
					isFormOpen={isFormOpen}
					setIsFormOpen={setIsFormOpen}
					formConfig={Manager.formConfig}
					formState={formState}
					setFormState={setFormState}
					formType={formType}
					handleApplyFormBtnClick={handleApplyFormBtnClick}
				/>
			)}
		</section>
	)
}

export default AdminTable;