import React, { useRef, useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Form from "../Form/Form"

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

	const handleInputChange = (id, value) => {
        setFormState((prevFormData) => ({
            ...prevFormData,
            [id]: value
        }));
    }

	const handleChecked = (id, checked) => {
        setFormState((prevFormData) => ({
            ...prevFormData,
            [id]: checked
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
				<Form Id={Id}
					  formConfig={formConfig}
					  formType={formType}
					  formState={formState}
					  handleInputChange={handleInputChange}
					  handleChecked={handleChecked}
					  handleApplyFormBtnClick={handleApplyFormBtnClick}  />
			</div>
		</dialog>
	);
}

const AdminTable = ({ Manager }) => {

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

		switch (formType.type)
		{
			case FormSubmitBtnTypes.edit.type:
				Manager.Update(model);
				break;
			case FormSubmitBtnTypes.add.type:
				Manager.Save(model);
				break;
			default:
				break;
		}
		setIsFormOpen(false);
		setFormState(Manager.GetFormModel());
	}

	Manager.handleEditBtnClick = (event, row) => {
		let model = Manager.GetFormModel(row);
		setFormState(model);
		setFormType(FormSubmitBtnTypes.edit);
		setIsFormOpen(true);
	}

	Manager.handleDeleteBtnClick = (event, row) => {
		let model = Manager.GetModel(row);
		Manager.Delete(model);
	}

	useEffect(() => {
		if(!isFormOpen)
		{
			setFormState(Manager.GetFormModel());
		}
	}, [isFormOpen, Manager]);

	useEffect(() => {
		console.log(formState)
	}, [formState])


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
			<dialog>
				<div className="table_modal">
				</div>
			</dialog>
		</section>
	)
}

export default AdminTable;