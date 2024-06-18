import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";

// const FormSubmitBtn = {
//     add: {id: "add", name: "Добавить"},
//     apply: {id: "apply", name: "Применить"}
// }

const AdminTable = ({ tableName, columnsConfig , tableData}) => {

	// const [submitBtnName, setSubmitBtnName] = useState(FormSubmitBtn.add.name);
	// const [isFormOpen, setIsFormOpen] = useState(false);
	// const [formState, setFormState] = useState([]);



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

    return (
		<>
			<div className="table_toolbar">
				<h1>{tableName}</h1>
				{/*<IoMdAddCircleOutline onClick={handleOpenModal} size={20}/>*/}
			</div>
			<DataTable
				columns={columnsConfig}
				data={tableData}
				pagination
			/>
			{/*<ProductCategoryFormModal*/}
			{/*	apiManager={apiManager}*/}
			{/*	isOpen={isModalOpen}*/}
			{/*	onClose={handleCloseModal}*/}
			{/*	formState={formState}*/}
			{/*	setFormState={setFormState}*/}
			{/*	setTableData={SetTableData}*/}
			{/*	submitBtnName={submitBtnName}*/}
			{/*/>*/}
		</>
	)
}

export default AdminTable;