import React, { useRef, useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";

import "./AdminTable.css"


// const FormSubmitBtn = {
//     add: {id: "add", name: "Добавить"},
//     apply: {id: "apply", name: "Применить"}
// }

const TableForm = ({ isFormOpen, setIsFormOpen }) => {
	const formRef = useRef(null);

	useEffect(() => {
        const form = formRef.current;
		form && isFormOpen ? form.showModal() : form.close();
    }, [isFormOpen]);

	return (
      <dialog ref={formRef} onKeyDown={() => console.log("key")}>
          <div className="table_form__wrapper">
              <IoClose className="table_form__close_icon" onClick={()=>setIsFormOpen(false)} size={20} />
          </div>
      </dialog>
    );
}

const AdminTable = ({ tableName, columnsConfig , tableData}) => {

	// const [submitBtnName, setSubmitBtnName] = useState(FormSubmitBtn.add.name);
	const [isFormOpen, setIsFormOpen] = useState(false);
	// const [formState, setFormState] = useState([]);

	const handleAdd = (event) => {
		setIsFormOpen(true);
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

    return (
		<section className="table">
			<div className="table__toolbar">
				<h1>{tableName}</h1>
				<IoMdAddCircleOutline onClick={handleAdd} size={20}/>
			</div>
			<DataTable
				columns={columnsConfig}
				data={tableData}
				pagination
			/>
			<TableForm
				isFormOpen={isFormOpen}
				setIsFormOpen={setIsFormOpen}
			/>
		</section>
	)
}

export default AdminTable;